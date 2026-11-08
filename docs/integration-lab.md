# Isolierter PostGIS-/API-Integrationstest (synthetisch)

Stand: 08.11.2026 · Projekt: `DroneTerminal`

## Ziel und Sicherheitsmodell

Die Original-OpenFlightHub-API darf derzeit **nicht** unverändert
gestartet werden: Ihr `src/app.ts` initialisiert bereits simulierte
Drohnen/Medien, `src/launch.ts` startet einen MQTT-Listener und es fehlen
nachgewiesene sichere Rollen, MQTT-ACLs und produktive Geheimnisverwaltung.

Darum verwendet der Integrationstest absichtlich **nicht** den
Original-Launcher. Die neue API unter
`services/integration-lab/server.cjs` ist ein separat implementierter,
stark begrenzter **Laboradapter**; sie ist **kein Ersatz** für die
vollständige OpenFlightHub-Express-API.

Die Laborumgebung unter `services/integration-lab/compose.yml`:

- Startet **echtes PostGIS 16-3.4** mit den importierten Original-Schema-
  und Extension-Init-Dateien.
- Erstellt in `seed.sql` exakt zwei **synthetische** Nutzer, zwei Teams
  und zwei Workspaces mit getrennter Berechtigungszuordnung.
- Legt eine eigene PostgreSQL-Rolle `dt_lab_reader` an:
  ausschließlich `SELECT` auf `users`, `workspaces`,
  `workspace_permissions`; keine Schreibrechte;
  `default_transaction_read_only = on`.
- Die API nutzt diese Rolle ausschließlich über das bereits festgeschriebene
  PostgreSQL-Modul aus der Original-API-Abhängigkeitsliste.
- Verwendet ein **internes Docker-Netz ohne externe Verbindung**,
  **keine veröffentlichten Hostports**, **kein Volume der bestehenden
  DB-Labor- oder Produktionsstacks**, keinen DJI-Broker und keinen
  API-/DJI-/Medien-Container.
- Generiert alle drei Kennwörter im GitHub-Runner für genau diesen Lauf;
  keine Accounts oder Tokens im Repository/PR.
- CI räumt Projektcontainer und ausschließlich das neu angelegte
  CI-Volume auch bei Fehlern mit `down -v` wieder ab.

**Nicht auf BRIX oder Pi ausrollen.** Der Workflow ist für temporäre
GitHub-Runner gedacht. Er ist keine Produktionskonfiguration.

## API-Oberfläche des begrenzten Laboradapters

| Route | Funktion |
|---|---|
| `GET /health` | Echter DB-SELECT, nur Laborstatus |
| `POST /auth/login` | Synthetische CI-Identität, sichere Zufallssession in RAM |
| `GET /auth/check` | Prüfung des `HttpOnly`, `SameSite=Strict`-Cookies |
| `GET /user/self` | Nutzerstammdaten aus PostgreSQL |
| `GET /workspace/my-workspaces` | Auf das Team eingeschränkte DB-Abfrage |
| `POST /auth/logout` | Invalidierung der Laborsession in RAM |
| `WS /live` | Cookieprüfung **vor** Upgrade, nur Test-Subscription-ACK |

Nicht implementierte Routen liefern 404. Insbesondere werden keine
Missions-, Flugsteuerungs-, DJI-, Upload-, Benutzerverwaltungs-
oder DB-Schreibaktionen aktiviert.

Die Laboranmeldung verifiziert ein nur im CI-Lauf gesetztes Kennwort
und einen Nutzer in PostGIS; sie verwendet **nicht** den produktiven
OpenFlightHub-Scrypt-Login. Dieser muss später eigenständig getestet
und gehärtet werden. Der WebSocket-Test darf ausschließlich
`workspace_drones_position` abonnieren und liefert nur ACK/NACK,
**keine künstlichen Flugpositionen**.

## Ausgeführte/erwartete Tests

`smoke.test.cjs` prüft (CI-Nachweis siehe Actions-Lauf):

1. DB-gebundenen HTTP-Healthcheck gegen echtes PostGIS.
2. Den reinen SELECT-Zugriff; eine SQL-UPDATE-Anfrage muss abgewiesen
   werden und die Daten müssen unverändert bleiben.
3. HTTP 401 für nicht authentifizierte Benutzerendpunkte.
4. Ablehnung eines WebSocket-Upgrades **vor** HTTP 101 ohne Session.
5. Login mit ungültigen und gültigen synthetischen Kennwörtern.
6. `/auth/check`, `/user/self` und genau einen sichtbaren Workspace.
7. Den Ausschluss des Workspaces eines anderen Teams.
8. Ablehnung schreibender HTTP-Routen.
9. WebSocket-Subscription: eigenes Workspace-ACK; fremde Workspace-
   ID und nicht erlaubte Steuerereignisse werden abgelehnt.
10. Logout invalidiert das Session-Cookie.

## Grenze der Nachweise

Dies ist ein **reales PostgreSQL-/HTTP-/WebSocket-Integrationstestlabor**,
aber **noch kein echtes Web-App-zu-Original-Backend-E2E**:

- Die Web-App wurde nicht im Browser gegen diese API gestartet.
- Der Laboradapter ersetzt die produktive Authentifizierung nicht.
- Keine echte API-Berechtigungslogik, Datei-/MinIO-Uploads, Session-
  Persistenz oder DJI-Kommandos getestet.
- Kein Hardwarekontakt, kein Tailscale-Zugriff und kein Deployment.
- Die Rechte an den importierten OpenFlightHub-Quellen sind unverändert
  ungeklärt, und der Draft-PR bleibt öffentlich.

## Nächste Aufgaben

Zuerst RBAC, Cookie-Handling, WebSocket-Handshake vor Upgrade,
MQTT-Topic-ACLs sowie die bereits berichtete Live-Datensimulation
im echten API-Code korrigieren. Danach einen kontrolliert startbaren
Original-Backend-Testmodus ohne FakeDrone, MQTT und Medienjobs
einführen und das reale Vue-Frontend in einem privaten Browser-E2E
gegen einen sicheren Adapter testen. Keine Abnahme ohne Belege.

## Erster erfolgreicher CI-Nachweis

[GitHub Actions #42531544810](https://github.com/mason82-dotcom/DroneTerminal/actions/runs/42531544810)
hat den kompletten isolierten Docker-Stack gestartet und wieder
entfernt: **3/3 Testgruppen PASS**. Nachgewiesen wurden
PostgreSQL-`default_transaction_read_only=on`, blockiertes SQL-`UPDATE`,
eine Datenbankabfrage im HTTP-Healthcheck, 401 ohne Sitzung,
synthetischer Login, `HttpOnly`-/`SameSite=Strict`-Cookie,
User- und Workspace-SELECT, die versteckte zweite
Workspace-Zuordnung, 401 beim WebSocket-Handshake **vor** Upgrade,
erlaubte/verbotene WS-Abonnements und Session-Invalidierung nach
Logout.

Der Workflow hat zusätzlich `persist-credentials: false` für
`actions/checkout` gesetzt, um keinen GitHub-Token im von
den Docker-Containern gemounteten Repository zu hinterlassen.
Die realen OpenFlightHub-Backends wurden nicht ausgeführt.
