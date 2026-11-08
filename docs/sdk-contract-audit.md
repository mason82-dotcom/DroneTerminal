# API-Client-SDK – REST-/WebSocket-Vertragsaudit

Stand: 08.11.2026 · DroneTerminal-Featurebranch

## Verifizierte Quellstände

- TypeScript SDK: 8.3.0, unter `vendor/openflighthub/api-client-sdk-typescript/`.
- OpenAPI: Version 0.22.0, unter `services/api/upstream/openapi_spec.yaml`.
- Web-App: `openflighthub-api-client-sdk: ^8.3.0` im Package-Manifest,
  durch `package-lock.json` auf 8.3.0 aufgelöst.
- WebSocket-Definitionsdateien:
  `services/api/upstream/src/live-websocket/definitions/` versus
  `vendor/openflighthub/api-client-sdk-typescript/src/generated/websocket-definitions/`.

## CI-Ergebnis

[GitHub Actions #42523758891](https://github.com/mason82-dotcom/DroneTerminal/actions/runs/42525139236):

| Prüfpunkt | Ergebnis |
|---|---|
| REST-Verträge inklusive HTTP-Methode und dynamischen URL-Parametern | 94/94 MATCH |
| Explizit mit `x-no-sdk: true` ausgeschlossene OpenAPI-Operationen | 12/12 ausgeschlossen |
| Multipart-Request-Encoding laut OpenAPI und generierten SDK-Funktionen | MATCH |
| OpenAPI-Version im SDK | 0.22.0 = 0.22.0 |
| Paketversion SDK und Web-App-Lockfile | 8.3.0 |
| WebSocket-Typen `client_to_server.ts` | Byteidentisch |
| WebSocket-Typen `server_to_client.ts` | Byteidentisch |
| Positive/negative Prüffälle für fehlende, zusätzliche und abweichende Operationen | 7/7 PASS |
| Unbeabsichtigte Änderungen an Quell-Snapshots | Keine |

Der Audit prüft ausschließlich statische Verträge. Es werden weder API-Server
noch Browser oder DJI-Hardware gestartet, und es erfolgen keine DB-Zugriffe.

## Zwei offene Laufzeitprobleme

### P1 – Lokales WebSocket-Ziel passt nicht zum Server-Port

Der originale SDK-Client nutzt für `document.location.hostname === 'localhost'`
standardmäßig `ws://localhost:9001/live`. Der mitgelieferte API-Launcher
lauscht hingegen auf `0.0.0.0:6001` und registriert die Route `/live`.
Eine Weiterleitung von Port 9001 nach 6001 ist im aktuellen Projekt nicht
nachgewiesen. Deshalb darf der erfolgreiche Typvergleich nicht als
funktionierende Echtzeitverbindung interpretiert werden.

Empfohlen: Eine DroneTerminal-eigene Entwicklungs-/Reverse-Proxy-Konfiguration
mit explizitem SDK-`liveWebsocketBaseUrl` definieren, und Verbindung,
Anmeldung, Reconnect, Timeout und Fehlerzustände in einem isolierten
Browser-Test nachweisen.

### P1 – Multipart-HTTP-Header bei FormData

Im ursprünglichen SDK `src/rest_api.ts` ist `Content-Type:
application/json` immer vorgegeben, selbst wenn `isFormData` aktiv ist.
Bei einer echten `FormData`-Anfrage muss der Browser dagegen den
`multipart/form-data; boundary=...`-Header selbst setzen. Der aktuelle
Code kann deshalb Multipart-Uploads fehlerhaft übertragen.

Empfohlen: Den Header nur für JSON-Bodys setzen bzw. für `FormData`
entfernen. Erst in einem kontrollierten, berechtigten lokalen Adapter
implementieren und dann mit einer Mock-HTTP-Request/Multipart-Parser-Prüfung
verifizieren. Nicht den unveränderten importierten Upstream-Snapshot
stillschweigend modifizieren.

## Weitere Sicherheits- und Integrationsgrenzen

- REST-Endpunkte und WebSocket-Typen sind **nur statisch** verglichen.
  Antwortverhalten, Login-Cookies, WebSocket-Handshake, Auth-/RBAC-Regeln,
  Dateiuploads sowie MQTT-Publishing sind nicht durch diesen Test bestätigt.
- Der ursprüngliche SDK-Transport versucht das Lesen von
  `response.headers['set-cookie']`; Browser erlauben kein freies Lesen
  von Set-Cookie-Headern. Das Sitzungskonzept benötigt eine separate
  Browser-E2E-Prüfung.
- In `services/api/upstream/src/routes/live.ts` wird der WebSocket-Handshake
  zunächst angenommen und die Authentifizierung danach geprüft.
  Die sichere Zugriffssperre sollte vor dem Upgrade erfolgen.
- Das ursprüngliche SDK versendet und empfängt weitere WebSocket-Nachrichten;
  eine byteidentische Typdeklaration ersetzt keinen Schutz gegen unbeschränkte
  ausstehende Nachrichten oder unkontrollierten Reconnect.
- Die ungeklärten Wiederverwendungsrechte an Web-App/API und anderen
  OpenFlightHub-Originalkomponenten bestehen fort. Ein Draft-PR ist öffentlich.

## Reproduzierbarkeit

Ohne zusätzliche Node-Pakete:

```bash
node --test scripts/tests/sdk-contracts.test.cjs
node scripts/check-sdk-contracts.cjs --report /tmp/dt-sdk-contract-audit.json
```

Der Audit ist zusätzlich als blockierender GitHub-Actions-Check unter
`.github/workflows/audit-sdk-contracts.yml` eingebunden und erstellt einen
14 Tage verfügbaren JSON-Bericht mit Hashes, Counts und Warnungen.
Die Quelle wird nicht geändert. Neue REST-/WebSocket-Vertragsabweichungen
oder Paketversionskonflikte führen zu einem Fehlerstatus.

## Nächste priorisierte Aufgabe

Isolierter Browser- und REST-/WS-Smoke-Test mit Test-Accounts und
Mock-Server, expliziter URL-Konfiguration sowie Multipart-Test.
Dabei müssen die oben genannten Laufzeitprobleme behoben bzw.
durch einen separaten Adapter kontrolliert werden. Erst danach
Backend-/PostGIS-/MinIO-End-to-End und anschließend ein
hardwarefreier DJI-MQTT-Replay-Test.

## Zusätzliche CI-Härtung (08.11.2026)

Drei negative Regressionstests ergänzen den vorhandenen REST- und WebSocket-
Vertragsaudit: doppelte SDK-Operationen, doppelte OpenAPI-Operationen und
eine unerwartet leere/verkürzte SDK-Generierung führen nun explizit zum
Fehlerstatus. Der erweiterte bestehende Checker wurde unter
`scripts/check-sdk-contracts.cjs` beibehalten; ein zwischenzeitlich
hinzugefügter paralleler Checker wurde zur Vermeidung doppelter Pflege
wieder entfernt. Der bestehende GitHub-Workflow ist weiterhin die
kanonische CI-Prüfung. Alle sieben Regressionstests bestanden im
[Actions-Lauf #42525139236](https://github.com/mason82-dotcom/DroneTerminal/actions/runs/42525139236).
