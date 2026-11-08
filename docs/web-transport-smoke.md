# DroneTerminal-Webtransport: REST, WebSocket und Workspace-Dateiupload

Stand: 08.11.2026. Umsetzung nur im Entwicklungsbranch
`feat/import-openflighthub-web-app-20261108`. Der ursprüngliche
OpenFlightHub-SDK-Quellbestand und das API-/Datenbank-/Terrain-Backend
wurden für diese Anpassung **nicht verändert**.

## Was sich geändert hat

Die Web-App erhält in `apps/web-app/src/api/index.ts` jetzt explizite
Transport-URLs aus `transport-compat.ts`. Dadurch nutzen lokale REST-
und WebSocket-Verbindungen den tatsächlichen API-Listener (6001), statt
unterschiedliche Ports aus den Original-SDK-Defaults zu verwenden.

| Browser-Standort | REST-URL | WebSocket-URL |
|---|---|---|
| `http://localhost:5173` | `http://localhost:6001` | `ws://localhost:6001/live` |
| `http://127.0.0.1:5173` | `http://127.0.0.1:6001` | `ws://127.0.0.1:6001/live` |
| `https://ground.example` (Beispiel) | `https://ground.example/api` | `wss://ground.example/api/live` |

Für eine Bereitstellung ist ein korrekt konfigurierter
Same-Origin-Reverse-Proxy für `/api` sowie das WebSocket-Upgrade
**Voraussetzung**. Er wird hier noch nicht erstellt oder gestartet.
`localhost` ist die jeweilige **Browser-Maschine**, nicht automatisch
der Raspberry Pi oder BRIX. Die Original-API startet weiterhin auf
`0.0.0.0:6001`; dies ist noch keine Freigabe zur Netzexposition.

## Multipart-Fix für die tatsächlich generierte Upload-Methode

Der originale npm-SDK-Transport setzt selbst beim Senden von `FormData`
den Header `Content-Type: application/json`. Er hat nur eine
generierte Multipart-Operation:

`POST /workspace/{workspaceId}/file`.

Die DroneTerminal-Web-App ersetzt **nur diese eine Instanzmethode**:

`api.rest.workspace.file.post`

durch `makeWorkspaceFileUpload()` aus `workspace-upload.ts`.
Diese nutzt `postDroneTerminalMultipart()` aus
`transport-compat.ts`: Sie übergibt ein natives Browser-`FormData`,
**ohne** den `Content-Type`-Header manuell zu setzen. Dadurch
erstellt der Browser den Multipart-`boundary` korrekt. Die Felder
`file` und `filename` sowie die Antwort-Promise-Signatur bleiben
für die Web-App erhalten. Es werden keine eigenen Cookies oder Tokens
aus der HTTP-Antwort ausgelesen. HTTP-Fehler werden ohne potenziell
sensible Antwortkörper weitergegeben.

Alle übrigen 93 generierten SDK-REST-Operationen sowie die
WebSocket-Implementierung bleiben original.

## Reproduzierbare Offline-Tests

```bash
node --experimental-strip-types --import ./scripts/tests/register-ts-resolution.mjs \
  --test scripts/tests/web-transport-smoke.test.mjs
```

CI: `.github/workflows/verify-web-transport.yml`.

Das Testprogramm nutzt Node.js 24, native `fetch`, `FormData`,
`http.createServer` und `WebSocket`. Es startet **nur** einen
ephemeren Mock-HTTP-Server auf `127.0.0.1` mit dem vom Betriebssystem
zugewiesenen Port. Es prüft echte HTTP-Requests, Multipart-Boundaries,
einen tatsächlichen WebSocket-Upgrade-Handshake und die Integration
der Workspace-Upload-Route. Keine Datenbank, kein MQTT und keine
DJI-Geräte werden verbunden.

Zusätzliche negative Tests prüfen ungültige Uploadpfade,
Workspace-IDs, Uploadinhalte und HTTP-Fehler; ein falscher
Header darf nicht unbemerkt wieder eingeführt werden.

## Grenzen – noch kein produktiver E2E-Nachweis

- Der HTTP-/WebSocket-Testserver ist eine **synthetische Mock-Instanz**.
  Die echten API-Routen und deren Authentifizierung laufen hierbei nicht.
- Die Web-App erhält nun die geänderten Transport-URLs, aber ihr
  ursprüngliches Quellarchiv ist damit **nicht mehr als ganzer
  Working Tree byteidentisch**. Der gepinnte Import bleibt im Git-Verlauf
  erhalten. Der SDK-Originalcode wurde nicht verändert.
- Kein erfolgreicher Login, keine Cookie-RBAC-Prüfung, kein
  End-to-End-Dateiupload in MinIO oder PostgreSQL nachgewiesen.
- Die bisherige WebSocket-Authentifizierung findet erst nach dem
  Verbindungs-Upgrade statt; das muss vor dem Livebetrieb gehärtet werden.
- Das Backend enthält weiterhin künstliche Live-Daten und zu offene
  MQTT-/Rollenberechtigungen; **keine DJI-Hardware anschließen**.
- Fehlende Weitergaberechte an der OpenFlightHub-Web-App und weiteren
  Snapshots bleiben ungeklärt. Der Draft-PR im öffentlichen GitHub
  ist selbst ebenfalls öffentlich.

## Nächster sicherer Schritt

Isolierte Browser- und API-Testumgebung mit einem geeigneten
Same-Origin-Proxy, kontrollierten Testkonten, Cookies und Mock-Daten.
Danach sichere RBAC-/MQTT-ACL-Reparaturen und erst dann ein
hardwarefreies DJI-Protokoll-Replay.
