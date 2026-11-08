# OpenFlightHub-Entwicklerwerkzeuge – Importbericht

Prüftag: 08.11.2026. Die vier ZIPs wurden vom Nutzer bereitgestellt und gegen
die folgenden festgelegten öffentlichen Upstream-Commits und Git-Trees geprüft.

| Archiv | Upstream-Commit | Original Git-Tree | Dateien | Bytes |
|---|---|---|---:|---:|
| api-client-sdk-typescript-master.zip | `edd06ac521555dcedef1ffe3080e65368f508641` | `8c2d51d530a828ae8501745b55c861186ff51605` | 38 | 154284 |
| dji-docs-converter-master.zip | `9d4a740f8efa673c941bad8f074c35c3a95fcf88` | `ed60b76cf92965082b0ec8de82ee92d7b73867b1` | 83 | 146900 |
| definition-generator-main.zip | `9f5f6c6b4959270a5ba3512ba2f14c100a3d2743` | `65fc29e0ecd8166e074b67af0bb1b36feee9f58e` | 22 | 61629 |
| mqtt-packet-analyzer-master.zip | `e50fbf3828b060193bdb113b27d00c92534520ba` | `fdec896628f0a2c830d4c47fd7ccf01555ace2dc` | 9 | 13525 |

## Ablage und tatsächliche Integration

- `vendor/openflighthub/api-client-sdk-typescript/`: bereits 34 geprüfte
  Dateien, ergänzt um genau vier fehlende VS-Code-Konfigurationen.
  Bestehende Inhalte unverändert. In der vollständigen Kopie ist
  `dev/build.sh` bereits vorher ausführbar markiert (100755 statt original
  100644); deshalb weicht der Git-*Tree* bei unveränderten Dateiinhalten ab.
  SDK-Version: 8.3.0, MIT-Lizenz vorhanden.
- `tools/openflighthub/dji-docs-converter/`: vollständiger und unveränderter
  XML-/Schema-Generator. Enthält vor allem RC Pro Enterprise und
  Mavic 3 Enterprise-Protokolldokumente, auch DOWN-Kommandos.
- `tools/openflighthub/definition-generator/`: vollständiger Quellsnapshot
  zur Generierung von API-/Datenbank-Typen aus OpenAPI/DBML.
- `tools/openflighthub/mqtt-packet-analyzer/`: vollständiger Quellsnapshot
  zur Analyse von Offline-MQTT-Protokolldateien.

Die drei neuen Tool-Verzeichnisse sind exakt identisch mit dem Upstream-
Git-Tree und werden nicht durch den Server oder die Web-App importiert.
Kein Tool wird automatisch ausgeführt.

## Prüf- und Sicherheitsgrenzen

1. Die drei neuen Tools haben keine LICENSE-Datei im ZIP. Die Weitergabe
   in einem **öffentlichen** GitHub-Repository benötigt eine gesonderte
   Rechteprüfung. Für die kopierten DJI-XML-Dokumente sind auch mögliche
   Drittanbieterrechte zu klären. Nur das SDK hat eine bestätigte MIT-Lizenz.
2. `definition-generator` besitzt schreibende Codepfade zu generierten
   `api/src/generated-definitions`-Dateien und nutzt `deasync`
   (native Node-Erweiterung). Niemals gegen laufende Deployments oder ohne
   temporäre Worktrees/Backup ausführen.
3. `mqtt-packet-analyzer` liest `../api/connector_logs`, erzeugt
   `output.ts` und enthält im Original zwei fest hinterlegte
   Beispiel-Seriennummern. Echte Logs können Seriennummern, Tokens,
   Standortdaten und andere vertrauliche Informationen enthalten.
   Diese Daten niemals ohne Entfernung identifizierender Werte einchecken.
4. `dji-docs-converter` schreibt eine lokale `output.ts` und wertet
   ältere XML-Referenzen aus. Sein Vorhandensein belegt **keinen** Abgleich
   mit der aktuellen DJI Cloud API.
5. Der bestehende Web-App-Paketstand bindet `openflighthub-api-client-sdk`
   über npm ein und verwendet den lokal vorhandenen SDK-Quellcode
   nicht automatisch. API, Terrain und Datenbank bleiben weiterhin
   ohne Laufzeit-End-to-End-Nachweis.
6. Keine Änderung von DJI-Geräten, keine MQTT-Netzwerkverbindung,
   keine DB-Migration und kein Pi-/BRIX-Rollout.

## Technische Prüfung

`.github/workflows/verify-developer-tools.yml` prüft Quellinventar,
bekannte Trees, SDK-Lizenz und die reinen TypeScript-Typprüfungen.
Die CI führt **keinen** Generator, Paketanalysator oder API-Dienst aus.
Die geprüften Originalarchive sind nur ein Quellstand; produktive
Verwendung setzt Lizenzklärung, sichere Offline-Adapter und zusätzliche
Integrationstests voraus.

## Empfohlene nächste Schritte

P0: Quellenrechte klären und echte Logs/Serials vor Speicherung redigieren.
P1: Generatoren auf temporäre Input-/Output-Verzeichnisse begrenzen und
erzeugte Typen gegen den aktuellen API/DB-Quellstand vergleichen.
P2: SDK-8.3.0-Vertragsabgleich und Hardware-freie MQTT-Replay-Tests.

## CI-Besonderheit: definition-generator

Beim ersten strengen TypeScript-Lauf wurde ausschließlich ein Fehler in der
Drittanbieter-Typdeklaration von `@dbml/parse` festgestellt: das optionale
`monaco-editor-core` ist nicht installiert (TS2307). Die CI führt daher
**nur für diesen Generator** einen `tsc --noEmit --skipLibCheck`-Lauf aus,
um die projektspezifischen TypeScript-Dateien zu prüfen, ohne fremde
Typdeklarationen zu validieren. Die zwei anderen Werkzeuge werden weiterhin
ohne `skipLibCheck` geprüft. Dies ist kein produktiver Laufzeitnachweis.
