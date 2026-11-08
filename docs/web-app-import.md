# Web-App-Import (OpenFlightHub)

Origin: user-provided web-app-master.zip
Upstream: https://github.com/OpenFlightHub/web-app
Pinned commit: 387926362b99d8d371a07a557407fd53543054b4
Verified source tree: 1ca45d31e8329e19b1eb2fa7d67abd57a57797fe
Scope: 302 files, 8670188 bytes, imported to apps/web-app.

## Legal and operational status

The supplied archive has no LICENSE file. There is no verified
permission to redistribute or modify this upstream web application.
Resolve the rights before merging or distributing the source.
The existing MIT-licensed vendor modules are unchanged.

This is a standalone Vue 3 / Vite / TypeScript frontend snapshot.
It requires OpenFlightHub-compatible backend and authentication services,
which have NOT been imported or connected. Live device integration and
read-only behavior are NOT verified. Do not deploy or use for flight control.

## Checks

From apps/web-app: npm ci, npm run type-check, npm run build-only.
The included lint command uses --fix and modifies source files;
do not run it on the unmodified snapshot without a separate worktree.
Review API URLs, CSP, authentication and dependencies before any deployment.
The nested apps/web-app/.github/workflows/deploy.yml file is inactive
as a repository-level workflow.
