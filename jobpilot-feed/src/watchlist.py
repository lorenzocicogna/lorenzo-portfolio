#!/usr/bin/env python3
"""Convert a verified, manually maintained official-programme watchlist.

No scraping or network access. Deadline hints are inferred from the
locally curated dates, not from the live status of an external application.
Output is JobPilot LC import-compatible but kept separate from ATS scans
because some programmes are not yet open.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
KINDS = {"specific_listing", "upcoming_intake", "recurring_programme", "official_portal"}


def classify(item, today):
    deadline = item.get("application_deadline")
    opening = item.get("application_opens")
    if deadline and today > dt.date.fromisoformat(deadline):
        return "deadline_passata"
    if opening and today < dt.date.fromisoformat(opening):
        return "apertura_futura"
    if opening and deadline and dt.date.fromisoformat(opening) <= today <= dt.date.fromisoformat(deadline):
        return "finestra_prevista_verificare"
    if item["kind"] == "specific_listing" and deadline:
        return "prima_della_scadenza_verificare"
    return "bando_da_verificare"


def compile_watchlist(source, today=None):
    today = today or dt.date.today()
    if not isinstance(source.get("programmes"), list):
        raise ValueError("Malformed programme watchlist")
    raw_jobs = []
    excluded = 0
    for item in source["programmes"]:
        if item.get("kind") not in KINDS:
            raise ValueError(f"Unsupported programme category: {item.get('id')}")
        url = str(item.get("url", ""))
        if not url.startswith("https://"):
            raise ValueError(f"Unsafe/invalid URL: {item.get('id')}")
        state = classify(item, today)
        if state == "deadline_passata":
            excluded += 1
            continue
        headline = {
            "apertura_futura": "PROSSIMA APERTURA",
            "finestra_prevista_verificare": "FINESTRA CANDIDATURE: RICONTROLLA",
            "prima_della_scadenza_verificare": "ANNUNCIO DA RICONTROLLARE",
            "bando_da_verificare": "PORTALE/BANDO DA MONITORARE",
        }[state]
        deadline = item.get("application_deadline")
        opening = item.get("application_opens")
        dates = " | ".join(x for x in [
            f"Apertura prevista: {opening}" if opening else "",
            f"Scadenza indicata: {deadline}" if deadline else "",
        ] if x)
        description = f"[{headline}] {item.get('description', '')} {dates} "
        description += f"Fonte ufficiale consultata il {source.get('verified_as_of', 'data non nota')}. "
        description += "Stato reale e requisiti da verificare sul sito prima della candidatura."
        raw_jobs.append({
            "id": f"watch-{item['id']}",
            "company": item["company"],
            "title": item["title"],
            "location": item.get("location", ""),
            "url": url,
            "source": item.get("source", "Official programme watchlist"),
            "description": description,
            "family": item.get("family", "auto"),
            "status": "salvata",
            "created_at": today.isoformat(),
            "notes": f"PROGRAMMA DA VERIFICARE; {state}. "
                     "Non indicare come candidatura effettuata automaticamente.",
            "watchlist": True,
            "watchlist_kind": item["kind"],
            "watchlist_state": state,
            "application_opens": opening,
            "application_deadline": deadline,
            "match_priority": item.get("priority", "da_valutare"),
            "match_checks": ["Requisiti universitari, lingue e condizioni di accesso da verificare"],
        })
    return {
        "format": "jobpilot-lc",
        "version": 1,
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        "description": "Curated programmes and official portals, NOT live vacancies. "
                       "Always verify dates and requirements with source.",
        "sources_configured": 0,
        "sources_ok": 0,
        "errors": [],
        "watchlist_total": len(source["programmes"]),
        "expired_omitted": excluded,
        "jobs": raw_jobs,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", type=Path, default=ROOT / "programmes-watchlist.json")
    ap.add_argument("--output", type=Path, default=ROOT / "data/programmes-watchlist.json")
    args = ap.parse_args()
    data = json.loads(args.input.read_text(encoding="utf-8"))
    result = compile_watchlist(data)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n",
                           encoding="utf-8")
    print(f"Official watchlist: {len(result['jobs'])} leads; "
          f"{result['expired_omitted']} with past deadline hidden.")
    for job in result["jobs"]:
        if job["application_deadline"]:
            print(f"  {job['company']}: {job['watchlist_state']} — "
                  f"deadline {job['application_deadline']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
