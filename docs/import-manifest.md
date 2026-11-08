# Importprotokoll: OpenFlightHub → DroneTerminal

**Erstellt:** 2026-11-08 · **Ziel:** `vendor/openflighthub/` · **Originale:** archivierte öffentliche Repositories von OpenFlightHub.

| Originalrepository | Fixierter Commit | Importiert | Ausgelassen |
|---|---|---:|---:|
| [api-client-sdk-typescript](https://github.com/OpenFlightHub/api-client-sdk-typescript) | `edd06ac521555dcedef1ffe3080e65368f508641` | 34 | 4 |
| [beast-decoder](https://github.com/OpenFlightHub/beast-decoder) | `2d0e8462b4adee4c4bffba40a45231c6776c09f6` | 23 | 4 |
| [mode-s-adsb-parser](https://github.com/OpenFlightHub/mode-s-adsb-parser) | `4b425f58ab9aca9305415b86b61a9c259b2243c6` | 27 | 4 |
| [phstl](https://github.com/OpenFlightHub/phstl) | `628d34fabf03c29d69ac50375456b3c45d54d6be` | 8 | 27 |
| [convert-dem-to-stl](https://github.com/OpenFlightHub/convert-dem-to-stl) | `d1297550063c21a6bcb3249efc23db4ac161d981` | 10 | 0 |

**Summe:** 102 byte-identische Git-Blobs aus 5 MIT-lizenzierten Quellprojekten. Prüfung: Git-Blob-SHA jedes übernommenen Textfiles mit dem entsprechenden Originalblob verglichen; **102/102 identisch**, null abweichende Inhalte. Dateimodus `.sh` wurde bei der Übernahme ausführbar markiert; das verändert keinen Dateiinhalt.

**Nicht übernommen:** 39 Dateien. Im Detail:

- 10 IDE-/Editor-Einstellungsdateien (`.vscode/`).
- `beast-decoder/src/example_lines.ts` (~7,6 MB), großes Beispielmaterial.
- `mode-s-adsb-parser/tests/example_messages_base64.txt` (~0,5 MB), Testnachrichten.
- 27 grafische/binäre DEM-, STL-, TIF- und Screenshot-Demodateien aus `phstl/demo/` (z. B. große STL-Geometriemodelle).

**Lizenz:** Alle fünf Original-`LICENSE`-Dateien wurden übernommen. Beim `phstl`-Fork bleiben Jim DeVona (2015) und OpenFlightHub (2026) ausdrücklich genannt. Keine globale MIT-Lizenz für die übrigen elf Projekte daraus ableiten.

**Tests:** Der Git-Inhaltsvergleich ist erfolgreich. Kein `npm install`, TypeScript-Build, Python-Lauf, Funktionstest oder echte DJI-Hardwareabnahme ausgeführt. Weil zwei große Testfixtures fehlen, können einzelne Upstream-Testläufe ohne deren Wiederbeschaffung fehlschlagen.

**Quellhistorie:** Originaldateien wurden unter fixierten Quell-Commits eingefügt; die vollständige Git-Historie der Original-Repositories wurde nicht übernommen.

## Nachimport des API-Client-SDKs (08.11.2026)

Das Archiv `api-client-sdk-typescript-master.zip` enthält 38 Dateien, der anfängliche kuratierte Vendor-Import 34. Vier ausgelassene `.vscode`-Dateien wurden jetzt byteidentisch ergänzt, ohne bestehende Dateien zu überschreiben. SDK-Version: 8.3.0 (MIT). Die ursprüngliche Liste mit insgesamt 102 Dateien dokumentiert den damaligen Import; nun sind es 106 kuratierte MIT-Vendor-Dateien. Das bereits zuvor als ausführbar markierte `dev/build.sh` behält seinen Modus 100755, weshalb der Gesamt-SDK-Tree vom Originaltree abweicht, obwohl alle 38 Dateiinhalte übereinstimmen.

Die drei zusätzlich übernommenen, nicht lizenzierten Entwicklerwerkzeuge sind **nicht** Bestandteil dieser MIT-Inventarliste. Siehe [developer-tools-import.md](developer-tools-import.md).
