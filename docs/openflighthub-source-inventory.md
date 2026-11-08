# OpenFlightHub: Repository- und Lizenzinventar

**Prüfdatum:** 08.11.2026 · **Organisation:** https://github.com/OpenFlightHub · **16 Repositories**, alle zum Prüfzeitpunkt archiviert.

## Übernommen (ausdrückliche MIT-Lizenz)

| Projekt | Quelle | Dateien | Lizenz |
|---|---|---:|---|
| `api-client-sdk-typescript` | [Quell-Commit](https://github.com/OpenFlightHub/api-client-sdk-typescript/tree/edd06ac521555dcedef1ffe3080e65368f508641) | 34 | MIT im Quellverzeichnis |
| `beast-decoder` | [Quell-Commit](https://github.com/OpenFlightHub/beast-decoder/tree/2d0e8462b4adee4c4bffba40a45231c6776c09f6) | 23 | MIT im Quellverzeichnis |
| `mode-s-adsb-parser` | [Quell-Commit](https://github.com/OpenFlightHub/mode-s-adsb-parser/tree/4b425f58ab9aca9305415b86b61a9c259b2243c6) | 27 | MIT im Quellverzeichnis |
| `phstl` | [Quell-Commit](https://github.com/OpenFlightHub/phstl/tree/628d34fabf03c29d69ac50375456b3c45d54d6be) | 8 | MIT im Quellverzeichnis |
| `convert-dem-to-stl` | [Quell-Commit](https://github.com/OpenFlightHub/convert-dem-to-stl/tree/d1297550063c21a6bcb3249efc23db4ac161d981) | 10 | MIT im Quellverzeichnis |

## Nicht kopiert (keine identifizierte Wiederverwendungslizenz)

- [OpenFlightHub/api](https://github.com/OpenFlightHub/api): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/web-app](https://github.com/OpenFlightHub/web-app): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/database](https://github.com/OpenFlightHub/database): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/terrain](https://github.com/OpenFlightHub/terrain): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/streaming-server](https://github.com/OpenFlightHub/streaming-server): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/dji-docs-converter](https://github.com/OpenFlightHub/dji-docs-converter): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/definition-generator](https://github.com/OpenFlightHub/definition-generator): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/bucket](https://github.com/OpenFlightHub/bucket): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/mqtt-packet-analyzer](https://github.com/OpenFlightHub/mqtt-packet-analyzer): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/issues-inbox](https://github.com/OpenFlightHub/issues-inbox): **nur Quellreferenz**, kein Codeimport.
- [OpenFlightHub/.github](https://github.com/OpenFlightHub/.github): **nur Quellreferenz**, kein Codeimport.

**Rechtliche Grenze:** Öffentlich auf GitHub einsehbarer Quellcode ist nicht automatisch unter Open-Source-Bedingungen freigegeben. Eine vollständige Kopie der übrigen elf Projekte in ein anderes Repository setzt die Zustimmung der jeweiligen Rechteinhaber oder eine andere klare Nutzungsberechtigung voraus. Der GitHub-Fork-Mechanismus ist hiervon zu unterscheiden. Für den Import fremden Codes sind dessen Lizenzbedingungen einschließlich Drittanbieterkomponenten einzuhalten.

**Funktionale Grenze:** Derzeit existiert durch diesen Import **keine vollständige OpenFlightHub-Anwendung**, insbesondere kein DJI-Pilot-2-Cloud-Backend, keine Weboberfläche, keine Datenbank und kein Terrain-Service. Bibliotheken unter `vendor/` dürfen nicht mit einer getesteten Hardwareintegration verwechselt werden.
