"""Tests for tools/check.py on small throwaway sites. python3 -m unittest discover -s tests"""
import os, sys, tempfile, unittest
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "tools"))
import check

CSP = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'"


def page(head="", body="<h1>Hi</h1>", csp=CSP):
    meta = f'<meta http-equiv="Content-Security-Policy" content="{csp}">' if csp is not None else ""
    return f'<!doctype html><html lang="en"><head>{meta}<title>T</title>{head}</head><body>{body}</body></html>'


class Check(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.saved = check.SITE
        check.SITE = Path(self.tmp.name)
        (check.SITE / "assets").mkdir()
        (check.SITE / "assets" / "site.css").write_text("body{}")

    def tearDown(self):
        check.SITE = self.saved
        self.tmp.cleanup()

    def problems(self, html):
        p = check.SITE / "index.html"
        p.write_text(html)
        return [e.split(": ", 1)[1] for e in check.check(p)]

    def test_clean_page(self):
        self.assertEqual(self.problems(page('<link rel="stylesheet" href="/assets/site.css">', '<h1 id="a">x</h1><a href="#a">a</a><a href="https://example.com">out</a>')), [])

    def test_outside_loads_but_not_outside_links(self):
        self.assertEqual(self.problems(page('<link rel="stylesheet" href="https://cdn.example.com/x.css">')), ["outside request: <link> https://cdn.example.com/x.css"])
        self.assertEqual(self.problems(page("", '<h1>x</h1><img alt="" src="//cdn.example.com/a.png">')), ["outside request: <img> //cdn.example.com/a.png"])

    def test_missing_files_and_anchors(self):
        self.assertEqual(self.problems(page('<link rel="stylesheet" href="/assets/nope.css">')), ["missing file: /assets/nope.css"])
        self.assertEqual(self.problems(page("", '<h1>x</h1><a href="#gone">a</a>')), ["missing anchor: #gone"])

    def test_page_basics(self):
        self.assertIn("no lang on <html>", self.problems(page().replace(' lang="en"', "")))
        self.assertIn("2 <h1> elements, want 1", self.problems(page("", "<h1>a</h1><h1>b</h1>")))
        self.assertIn("duplicate ids: a", self.problems(page("", '<h1 id="a">x</h1><p id="a"></p>')))
        self.assertIn("1 <img> without alt", self.problems(page("", '<h1>x</h1><img src="/assets/site.css">')))

    def test_csp_and_inline_scripts(self):
        self.assertIn("no Content-Security-Policy meta", self.problems(page(csp=None)))
        for loose in (CSP + "; connect-src https://api.example.com", "default-src *", "script-src 'self' 'unsafe-inline'", "script-src https:"):
            self.assertIn("CSP lets in another site, a wildcard, or inline/eval code", self.problems(page(csp=loose)), loose)
        self.assertIn("inline <script> (put it in assets/)", self.problems(page("<script>1</script>")))
        self.assertEqual(self.problems(page('<script src="/assets/site.css"></script>')), [])

    def test_the_real_site_passes(self):
        check.SITE = self.saved
        self.assertEqual([e for p in sorted(self.saved.rglob("*.html")) for e in check.check(p)], [])


if __name__ == "__main__":
    unittest.main()
