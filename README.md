# mortar.ch

[![Pages](https://github.com/mortar-ch/mortar.ch/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/mortar-ch/mortar.ch/actions/workflows/pages.yml?query=branch%3Amain) [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-bitsandbricks-ffdd00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/bitsandbricks)

The landing page for [mortar.ch](https://mortar.ch): the tools that hold the bricks together.
For now it lists one tool, [mason](https://github.com/bitsandbricks-ch/mason-cli), whose web app runs at
[mason.mortar.ch](https://mason.mortar.ch).

`site/` is static and goes to GitHub Pages on every push to `main` that touches it
(`.github/workflows/pages.yml`). In the repository settings, set Pages > Source to "GitHub Actions".
The custom domain comes from `site/CNAME`.

The look follows mason's web app (prompt bar and status line; `t` switches light and dark) in the colours and fonts of [bitsandbricks.ch](https://bitsandbricks.ch).
No cookies, no tracking, no outside requests. Fonts: Archivo and IBM Plex Mono (SIL OFL 1.1), licences in
`site/assets/fonts/`.

To add a tool, add a row to the table in `site/index.html` and a detail box under it.

To look at it locally: `python3 -m http.server -d site` and open http://localhost:8000.
