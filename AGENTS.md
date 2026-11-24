# Rules for coding agents

These rules are for AI coding agents (Claude Code, Codex, Copilot, opencode, ...) working on mortar.ch.
Humans: the same rules apply to you in spirit. `CLAUDE.md` imports this file.

This repo follows the [BitsAndBricks handbook](https://github.com/bitsandbricks-ch/handbook),
profile **static-site** (see `.mason.toml`). Read its core chapters and the blocks this profile
lists. The rules below are only what is specific to this repo.

## What this is

The landing page for mortar.ch, the tools that hold the bricks together (for now: mason). Static, on GitHub Pages. The [README](README.md) says where things are and how to run it.

## Before you push

Run what CI runs (`.github/workflows/check.yml`) and make it pass:

- `python3 -m unittest discover -s tests` (tests for the site check)
- `python3 tools/check.py` (links, assets, anchors, no outside requests, CSP, no inline scripts)
- `python3 -m http.server -d site`, then open http://localhost:8000 and look at the page

## Differs from the handbook

- **No pre-commit hooks yet**: there is no `.pre-commit-config.yaml` ([decision 0010](https://github.com/bitsandbricks-ch/handbook/blob/main/decisions/0010-pre-commit.md)), so skip `pre-commit run --all-files` until it lands.
- **Plain HTML, not Astro.** The static-site profile names Astro. This site is one hand-written
  page in `site/` with no build step, so Astro would only add a build and dependencies.

## Repo-specific rules

- Work from an issue: open one if there is none, comment when you start and when blocked, link it from the PR.
- Commits and PR titles follow Conventional Commits, with these scopes: `site`, `tools`, `ci`.
- **Publishing:** every merge to `main` that touches `site/` deploys the page. Nothing goes live except through a merged pull request.
- **No releases:** the page has no version and no changelog
  ([decision 0012](https://github.com/bitsandbricks-ch/handbook/blob/main/decisions/0012-no-changelog-without-releases.md)).
- **No cookies, no tracking, no outside requests.** No inline scripts (the CSP forbids them).
- To add a tool, add a row to the table in `site/index.html` and a detail box under it.
- Stay inside the repository. Ask before deleting files you didn't create.
