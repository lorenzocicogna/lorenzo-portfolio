"""Offline-only tests for the public Job Pilot feed (no personal data)."""
from pathlib import Path
import datetime as dt
import json
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
sys.path.insert(0, str(SRC))
import scout
import watchlist


class PublicFeedTests(unittest.TestCase):
    def test_configuration_has_no_personal_data(self):
        profile = json.loads((SRC / "search_profile.json").read_text("utf-8"))
        self.assertEqual(
            set(profile),
            {"version", "role_terms", "strong_title_terms",
             "supported_geographies", "blocked_geographies"})
        self.assertTrue(scout.relevant("Operations Intern", "Dublin, Ireland"))
        self.assertTrue(scout.relevant("Business Analyst", "Oslo, Norway"))
        self.assertFalse(scout.relevant("Senior Business Analyst", "New York, USA"))

    def test_public_greenhouse_normalization(self):
        def fake_getter(url):
            return {"jobs": [{
                "id": 123, "title": "Business Analyst Intern",
                "location": {"name": "Amsterdam, Netherlands"},
                "absolute_url": "https://job-boards.greenhouse.io/example/jobs/123",
                "content": "<p>Excel + KPIs</p>",
            }]}
        data = scout.collect(
            {"greenhouse": [{"name": "Example", "token": "example"}]},
            getter=fake_getter, cooldown=0)
        self.assertEqual(data["sources_ok"], 1)
        self.assertEqual(len(data["jobs"]), 1)
        job = data["jobs"][0]
        self.assertEqual(job["status"], "salvata")
        self.assertFalse(job.get("notes"))
        self.assertEqual(job["match_priority"], "alta")

    def test_programmes_separate_from_real_time_jobs(self):
        raw = json.loads((SRC / "programmes-watchlist.source.json").read_text("utf-8"))
        result = watchlist.compile_watchlist(raw, today=dt.date(2026, 10, 20))
        self.assertEqual(result["format"], "jobpilot-lc")
        self.assertEqual(result["sources_ok"], 0)
        self.assertEqual(len(result["jobs"]), len(raw["programmes"]))
        self.assertTrue(all(row["watchlist"] is True for row in result["jobs"]))
        self.assertEqual(
            next(j for j in result["jobs"]
                 if j["id"] == "watch-ec-bluebook-admin-ug-oct2027")["watchlist_state"],
            "apertura_futura",
        )

    def test_seed_files_are_public_offers_only(self):
        for filename in ("latest-jobs.json", "programmes-watchlist.json"):
            feed = json.loads((ROOT / filename).read_text("utf-8"))
            self.assertEqual(feed["format"], "jobpilot-lc")
            self.assertGreater(len(feed["jobs"]), 0)
            self.assertTrue(all(
                isinstance(j.get("title"), str)
                and isinstance(j.get("url"), str)
                and j.get("status") == "salvata"
                and not j.get("applied_date")
                and not j.get("outcome_date")
                and not j.get("notes")
                for j in feed["jobs"]
            ))


if __name__ == "__main__":
    unittest.main()
