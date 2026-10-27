# BR Stockholm Bil — Headless Website & Inventory Automation

**A dealership website connecting vehicle listings, technical SEO and a repeatable publishing workflow.**

Public showcase by **Ismail Bellakhel**. Selected code and an interactive example are included; the complete application and its Git history remain private.

![Interactive inventory safeguard preview](preview.png)

## Start here — a two-minute review

1. Visit the [dealership website](https://www.brstockholmbil.se/) to inspect the customer experience.
2. Run the local preview below. Change the inventory from 20 → 19, then 20 → 10, to see the safety decision.
3. Read [sample.mjs](sample.mjs) for selected inventory safeguards and [ARCHITECTURE.md](ARCHITECTURE.md) for the broader system.

## Problem and contribution

Keeping vehicle information in multiple places creates repetitive work and a risk of inconsistent listings. I built a headless dealership website and worked on the integration and publishing workflow so the catalogue can reuse an existing vehicle source.

The implementation connects a Next.js frontend to WordPress content and inventory data. Vehicle pages expose specifications, pricing and contact paths. The private sync workflow validates the source, normalises records, compares snapshots and checks proposed removals before applying changes. GitHub Actions supports repeatable deployment and inventory workflows.

## Selected engineering decision

**Treat an unexpected inventory drop as a review event.** An incomplete upstream response should not silently archive a large portion of the visible catalogue. The sample contains the original pure snapshot guard and canonical JSON helper. The preview uses synthetic counts and an assumed overlap of vehicle IDs; it is not the full reconciliation algorithm.

| Included here | Kept in the private application |
| --- | --- |
| Canonical payload comparison helper | Full vehicle mapping and source access |
| Snapshot removal/drop safeguards | WordPress write adapters and sync orchestration |
| Interactive dry-run example and tests | Deployment configuration and credentials |
| Architecture and scope notes | Full frontend and historical commits |

## Run the preview

Requires Python 3 for serving files and Node.js 18+ for tests. No package installation or credentials are needed.

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open **http://127.0.0.1:8080**. In a second terminal:

```sh
npm test
```

The preview only evaluates synthetic input locally. It never reads or updates live listings. Passing this guard alone does not mean a source snapshot is valid or that a write should occur.

## Outcome and limits

The public site demonstrates the delivered customer journey. This repository demonstrates selected integration behavior. Revenue lift, conversion improvement and time savings are not quantified here because verified measurements are not included.

**Skills demonstrated:** marketing technology integration, headless delivery, technical SEO, inventory data quality, automation and operational safeguards.

## Code provenance

`sample.mjs` contains selected pure functions from `scripts/sync/inventoryCore.mjs` in my private project, inspected at commit `0db86df`. `index.html` and the synthetic tests were prepared specifically for this public excerpt. No private repository history is included.

See [SCOPE.md](SCOPE.md) for publication boundaries. This showcase is not distributed under an open-source license.
