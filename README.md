# DroneTerminal

Eigenständiges Entwicklungsrepository für eine DJI-nahe Drohnen-Bodenstation und die strukturierte Auswertung des archivierten Projekts [OpenFlightHub](https://github.com/OpenFlightHub).

> **Wichtig:** Die vom Nutzer bereitgestellten OpenFlightHub-Snapshots für Web-App, Datenbank, API und Terrain liegen unter apps/web-app/, services/database/upstream/, services/api/upstream/ und services/terrain/upstream/. Für diese vier Archive ist keine umfassende Wiederverwendungslizenz nachgewiesen. Weitergabe und Merge in main erfordern eine Rechteprüfung. Die Komponenten sind noch nicht als sicherer, lauffähiger Gesamtdienst integriert; dies ist keine einsatzfähige Bodenstation.

## Inhalt

- apps/web-app/: unveränderter Vue-/TypeScript-Web-App-Quellsnapshot aus der ZIP; siehe docs/web-app-import.md.
- services/database/upstream/: byteidentisches OpenFlightHub-Datenbankarchiv aus der ZIP. Dienste und Original-Skripte werden nicht ausgeführt; siehe docs/database-import.md. Optionales isoliertes PostGIS-Labor unter services/database/compose.lab.yml.
- services/api/upstream/: unveränderter Express-/TypeScript-API-Quellsnapshot aus der ZIP; keine automatische Ausführung von MQTT, aktiven DJI-Operationen, Datenbankwrites oder Deploy-Skripten; siehe docs/api-import.md.
- services/terrain/upstream/: unveränderter Gelände-/Höhen-/Sichtlinien-Quellsnapshot aus der ZIP; keine automatischen Dienststarts oder Verbindung zur API. Siehe docs/terrain-import.md.

- `vendor/openflighthub/`: originalgetreue, **MIT-lizenzierte** Quellmodule mit beibehaltenen Lizenzdateien (siehe Importprotokoll); große binäre Demos/Testfixtures werden ausgelassen.
- `docs/openflighthub-source-inventory.md`: Inventar aller 16 Original-Repositories und Übernahmegrenzen.
- `docs/import-manifest.md`: Quellstände, ausgelassene Dateien und Provenienz.
- `docs/architecture.md`: eigenständiger Architekturentwurf für DroneTerminal.
- `docs/security.md`: vor Produktiveinsatz zu schließende Sicherheitslücken.

## Regeln

Keine verdeckte Lizenzannahme. Für die auf ausdrücklichen Wunsch importierten Web-App-, Datenbank-, API- und Terrain-Snapshots sind die Rechte weiterhin ungeklärt; keine DJI-Lizenzumgehung, keine automatisch aktivierte Fernsteuerung oder Flugmission. Produktiver Einsatz erfordert gesonderte Tests, sichere Konfiguration und ausdrückliche Freigabe.

Die MIT-Lizenzen der übernommenen Module bleiben im jeweiligen Modulverzeichnis erhalten. Die Originalautoren sind in den Importdokumenten angegeben.

## Nächste Schritte

1. Vor Merge und Weitergabe Rechte an apps/web-app/, services/database/upstream/, services/api/upstream/ und services/terrain/upstream/ klären oder die fehlenden Komponenten eigenständig neu entwickeln.
2. Importierte Bibliotheken isoliert bauen und testen; sie sind noch nicht in eine neue Anwendung integriert.
3. DJI-Funktionsumfang anhand der offiziellen Cloud-API-Dokumentation und echter Hardware verifizieren.

## Weitere Entwicklerwerkzeuge (Archivimport 08.11.2026)

- `vendor/openflighthub/api-client-sdk-typescript/`: auf den vollständigen 38-Dateien-Quellstand ergänzt; SDK 8.3.0 (MIT), vier VS-Code-Dateien nachgeladen.
- `tools/openflighthub/dji-docs-converter/`: 83 Dateien XML-/DJI-Typgenerator; keine Live-Ausführung.
- `tools/openflighthub/definition-generator/`: 22 Dateien Schema-/API-Typgenerator; kann Dateien überschreiben, daher nicht automatisiert.
- `tools/openflighthub/mqtt-packet-analyzer/`: 9 Dateien Offline-MQTT-Loganalyse; Schutz von Gerätekennungen und Tokens erforderlich.

**Wichtig:** Die drei neuen Tools besitzen in den ZIPs keine LICENSE-Datei. Ihre Weitergaberechte sind nicht nachgewiesen. Sie sind weder mit dem produktiven Backend verbunden noch auf dem Pi oder BRIX bereitgestellt. Details: [Importbericht](docs/developer-tools-import.md).

## Generator-Kompatibilität (Offline)

Der neue, isolierte Generator-Check `scripts/check-generated-contracts.cjs` führt die API- und Datenbanktyp-Erzeugung in einem temporären Verzeichnis aus und vergleicht vier Ergebnisse mit den eingecheckten Typen. Ausgangsnachweis: **4/4 MATCH, null Drift**, ohne Originaldateien zu verändern. In GitHub Actions ist die Prüfung als blockierender CI-Gate aktiviert (siehe [Audit-Anleitung](docs/generated-contract-audit.md)). Keine API-, DB-, MQTT- oder DJI-Laufzeit wird gestartet.

## SDK-8.3.0-Vertragsprüfung (REST + WebSocket)

Die eigene, nur lesende CI-Prüfung `scripts/check-sdk-contracts.cjs` gleicht den importierten SDK-Quellstand mit der OpenAPI und den WebSocket-Typdefinitionen des API-Backends ab. **94/94 REST-Operationen stimmen überein**, 12 interne Endpunkte bleiben wie vorgesehen aus dem Client ausgeschlossen, beide WebSocket-Typdateien sind byteidentisch und die Paket-/Lockfile-Versionen passen. Der Check wird durch vier Regressionstests abgesichert. Zwei offene Laufzeitprobleme (lokaler WS-Port und Multipart-Header) sowie die Browser-/E2E-Grenzen sind unter [SDK-Vertragsaudit](docs/sdk-contract-audit.md) dokumentiert. Es wurde kein Server gestartet.

## Web-App-Transportintegration (isoliertes Labor)

Das Frontend ist gegenüber dem ursprünglichen ZIP-Snapshot gezielt
angepasst: Es konfiguriert lokale REST-/WebSocket-Endpunkte gemeinsam
auf `:6001` und nutzt für die einzige generierte Multipart-Methode
`workspace.file.post` einen separaten Browsertransport, der den
`multipart/form-data`-Boundary korrekt setzt. Der importierte
OpenFlightHub-SDK-Quellbestand bleibt unverändert. Ein eigener CI-Test
verifiziert echte Requests und einen WebSocket-Handshake ausschließlich
auf einem ephemeren Mock-Server an `127.0.0.1`.

[Technik, Testergebnisse und Grenzen](docs/web-transport-smoke.md).
Es existiert noch kein nachgewiesener vollständiger Live-/Hardwarebetrieb,
kein sicher gehärteter API-/MQTT-/RBAC-Stack und keine Freigabe zum
produktiven Einsatz.

## Isolierter PostGIS- und Authentifizierungs-Integrationstest

Unter `services/integration-lab/` befindet sich ein eigener,
**nicht produktiver** CI-Laboradapter für die PostGIS-Datenbank und die
wichtigsten Frontend-kompatiblen REST-/WebSocket-Routen. Er nutzt zwei
synthetische Nutzer und zwei berechtigungsgetrennte Workspaces,
eine ausschließliche SELECT-Datenbankrolle und ein internes Docker-Netz
**ohne veröffentlichte Ports**. Getestet werden Login-/Cookie-Lebenszyklus,
`/user/self`, `/workspace/my-workspaces`, abgewiesene DB-Schreibzugriffe,
mandantenbezogene Datenfilterung und WebSocket-Authentifizierung vor
dem Upgrade. Der initiale erfolgreiche CI-Beleg:
[GitHub Actions #42531544810](https://github.com/mason82-dotcom/DroneTerminal/actions/runs/42531544810).

**Grenze:** Der Original-Express-Launcher wird bewusst nicht gestartet,
weil er zusätzliche Simulations- und MQTT-Funktionen aktiviert.
Das Vue-Frontend wurde noch nicht im Browser gegen die Labor-API getestet.
Diese Tests belegen keine Betriebs- oder DJI-Hardwarefreigabe.
Details unter [docs/integration-lab.md](docs/integration-lab.md).
