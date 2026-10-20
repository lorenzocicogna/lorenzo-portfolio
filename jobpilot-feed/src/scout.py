#!/usr/bin/env python3
"""Job Pilot: automated search of PUBLIC Greenhouse/Lever boards.

Only GET requests to two official job-boards APIs. No login, scraping of
LinkedIn, CV upload, applications, or processing of personal application data.
Python standard library only.
"""
from __future__ import annotations

import argparse
import datetime as dt
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import time
import urllib.error
import urllib.request
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
TOKEN = re.compile(r"^[A-Za-z0-9_-]{1,90}$")
# All search parameters are editable here without changing the Python code.
# No applicant histories, CV, response emails or rejection outcomes are stored.
PROFILE = json.loads((ROOT / "search_profile.json").read_text(encoding="utf-8"))


def terms_regex(terms):
    """Whole-word / whole-phrase terms; prevents intern matching internal."""
    escaped = [re.escape(str(value)) for value in terms if value]
    if not escaped:
        raise ValueError("Search profile must contain at least one keyword")
    return re.compile(r"(?<!\w)(?:" + "|".join(sorted(escaped, key=len, reverse=True))
                      + r")(?!\w)", re.IGNORECASE)


ROLE = terms_regex(PROFILE["role_terms"])
GEO = terms_regex(PROFILE["supported_geographies"])
EXCLUDED = terms_regex(PROFILE["blocked_geographies"])
STRONG = terms_regex(PROFILE["strong_title_terms"])
SENIOR = re.compile(r"\bsenior\b|\bprincipal\b|\bdirector\b|"
                    r"\bhead of\b|\blead\b|\bmanager\b", re.I)
ENTRY = re.compile(r"intern|internship|traineeship|\bstage\b|tirocin|"
                   r"\bjunior\b|\bgraduate\b|trainee", re.I)

class PlainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.excluded_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.excluded_depth += 1
        elif tag in ("p", "li", "br", "div", "h2", "h3"):
            self.parts.append(" ")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.excluded_depth = max(0, self.excluded_depth - 1)
        elif tag in ("p", "li", "div"):
            self.parts.append(" ")

    def handle_data(self, data):
        if not self.excluded_depth:
            self.parts.append(data)


def plain(raw):
    parser = PlainText()
    parser.feed(str(raw or ""))
    return re.sub(r"\s+", " ", html.unescape("".join(parser.parts))).strip()


def relevant(title, location, all_locations=False):
    if not ROLE.search(title or ""):
        return False
    if SENIOR.search(title or "") and not ENTRY.search(title or ""):
        return False
    if not all_locations and (
        EXCLUDED.search(location or "") or not GEO.search(location or "")
    ):
        return False
    return True


def family(title):
    value = title.lower()
    if re.search(r"airport|airline|aviation|aeroport", value):
        return "airport"
    if re.search(r"analy|analisi|reporting|intelligence|finance|"
                 r"financial|controlling|econom|insights|data officer", value):
        return "analysis"
    if re.search(r"operation|logistic|coordinat|planning|project|pmo", value):
        return "operations"
    if re.search(r"sales|business development|partnership|commercial", value):
        return "sales"
    if re.search(r"hospitality|tourism|customer|guest", value):
        return "hospitality"
    return "auto"


def public_url(value):
    """Avoid importing unsafe / invalid job links into the dashboard."""
    try:
        url = urlparse(value)
        return value if url.scheme == "https" and url.hostname else ""
    except ValueError:
        return ""


def request_json(url):
    request = urllib.request.Request(
        url, headers={
            "User-Agent": "JobPilot/1.0 (public job boards; personal discovery)",
            "Accept": "application/json",
        })
    with urllib.request.urlopen(request, timeout=20) as resp:
        data = resp.read(8_000_001)
    if len(data) > 8_000_000:
        raise ValueError("Response too large (> 8MB)")
    return json.loads(data)


def greenhouse(board, getter=request_json):
    token = board["token"]
    if not TOKEN.fullmatch(token):
        raise ValueError("Invalid Greenhouse board token")
    raw = getter(
        f"https://boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true")
    if not isinstance(raw, dict) or not isinstance(raw.get("jobs"), list):
        raise ValueError("Unexpected Greenhouse response")
    items = []
    for job in raw["jobs"]:
        loc = job.get("location") or {}
        loc = loc.get("name", "") if isinstance(loc, dict) else ""
        url = public_url(str(job.get("absolute_url") or ""))
        if not url:
            continue
        title = str(job.get("title") or "")
        items.append({
            "id": f"gh-{token}-{job.get('id', '')}",
            "company": board["name"],
            "title": title,
            "location": str(loc),
            "url": url,
            "source": "Greenhouse",
            "description": plain(job.get("content") or "")[:5000],
            "family": family(title),
            "status": "salvata",
            "created_at": dt.date.today().isoformat(),
            "notes": "",
        })
    return items


def lever(board, getter=request_json):
    site = board["site"]
    if not TOKEN.fullmatch(site):
        raise ValueError("Invalid Lever site token")
    region = board.get("region", "global")
    if region not in ("eu", "global"):
        raise ValueError("Invalid Lever region")
    host = "api.eu.lever.co" if region == "eu" else "api.lever.co"
    items = []
    for offset in (0, 100, 200):
        raw = getter(
            f"https://{host}/v0/postings/{site}?mode=json&limit=100&skip={offset}")
        if not isinstance(raw, list):
            raise ValueError("Unexpected Lever response")
        for job in raw:
            categories = job.get("categories") or {}
            loc = categories.get("location") or ""
            all_locs = categories.get("allLocations") or []
            if len(all_locs) > 1:
                loc = "; ".join(map(str, all_locs))[:200]
            url = public_url(str(
                job.get("hostedUrl") or job.get("applyUrl") or ""))
            if not url:
                continue
            title = str(job.get("text") or "")
            desc = job.get("descriptionPlain") or job.get("description") or ""
            for section in (job.get("lists") or [])[:10]:
                desc += " " + plain(section.get("content") or "")
            items.append({
                "id": f"lever-{site}-{job.get('id', '')}",
                "company": board["name"],
                "title": title,
                "location": str(loc),
                "url": url,
                "source": "Lever",
                "description": plain(desc)[:5000],
                "family": family(title),
                "status": "salvata",
                "created_at": dt.date.today().isoformat(),
                "notes": "",
            })
        if len(raw) < 100:
            break
    return items


def annotate_match(job):
    """Transparent editorial priority, not a probability of hiring."""
    title = job.get("title", "")
    description = job.get("description", "")
    high = bool(STRONG.search(title))
    checks = []
    if re.search(r"currently enrolled|currently pursuing|student status|"
                 r"internship agreement|university agreement", description, re.I):
        checks.append("Controllare requisiti di iscrizione/accordo stage")
    if re.search(r"\b(?:minimum |at least )?[2-9]\+?\s+(?:years|yrs)\b",
                 description, re.I):
        checks.append("Controllare anni di esperienza richiesti")
    if re.search(r"\bSQL\b|Power BI|Tableau|\bETL\b|"
                 r"advanced Python", description, re.I):
        checks.append("Verificare livello richiesto di strumenti dati/BI")
    job["match_priority"] = "alta" if high else "da_valutare"
    job["match_checks"] = checks
    return job


def collect(config, getter=request_json, all_locations=False, cooldown=0.5):
    collected, errors = [], []
    boards = [("Greenhouse", x) for x in config.get("greenhouse", [])]
    boards += [("Lever", x) for x in config.get("lever", [])]
    if not boards:
        raise ValueError("No configured boards")
    success = 0
    for kind, board in boards:
        name = board.get("name", "Unknown")
        try:
            raw = (greenhouse(board, getter) if kind == "Greenhouse"
                   else lever(board, getter))
            matches = [annotate_match(j) for j in raw if relevant(
                j["title"], j["location"], all_locations)]
            collected.extend(matches)
            success += 1
            print(f"{name}: {len(matches)} matches / {len(raw)} postings")
        except (ValueError, KeyError, TypeError, urllib.error.URLError,
                TimeoutError, json.JSONDecodeError) as exc:
            errors.append(f"{name}: {exc}")
            print(f"WARNING {name}: {exc}", file=sys.stderr)
        if cooldown:
            time.sleep(cooldown)
    seen, unique = set(), []
    for item in collected:
        key = item["url"]
        if key not in seen:
            seen.add(key)
            unique.append(item)
    unique.sort(key=lambda x: (x["match_priority"] != "alta",
                               x["company"].lower(), x["title"].lower()))
    return {
        "format": "jobpilot-lc", "version": 1,
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        "description": "Public ATS leads; verify each job before applying.",
        "sources_configured": len(boards), "sources_ok": success,
        "errors": errors, "jobs": unique,
    }


def main():
    p = argparse.ArgumentParser(description="Collect public early-career job postings")
    p.add_argument("--boards", type=Path, default=ROOT / "boards.json")
    p.add_argument("--output", type=Path, default=ROOT / "data/latest-jobs.json")
    p.add_argument("--all-locations", action="store_true")
    args = p.parse_args()
    config = json.loads(args.boards.read_text(encoding="utf-8"))
    result = collect(config, all_locations=args.all_locations)
    if not result["sources_ok"]:
        print("ERROR: no sources available; previous results remain untouched",
              file=sys.stderr)
        return 2
    if not result["jobs"]:
        print("ERROR: no matching postings; refusing to overwrite existing dataset",
              file=sys.stderr)
        return 3
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n",
                           encoding="utf-8")
    print(f"Updated {args.output}: {len(result['jobs'])} postings")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
