# DroneTerminal

Eigenständiges Entwicklungsrepository für eine DJI-nahe Drohnen-Bodenstation und die strukturierte Auswertung des archivierten Projekts [OpenFlightHub](https://github.com/OpenFlightHub).

> **Wichtig:** Dies ist **keine** vollständige Kopie des OpenFlightHub-Systems und derzeit **keine lauffähige Bodenstation**. Die zentralen Original-Repositories `api`, `web-app`, `database`, `terrain` u. a. tragen keine erkennbare Wiederverwendungslizenz. Sie werden daher **nicht** in dieses Repository kopiert.

## Inhalt

- `vendor/openflighthub/`: originalgetreue, **MIT-lizenzierte** Quellmodule mit beibehaltenen Lizenzdateien (siehe Importprotokoll); große binäre Demos/Testfixtures werden ausgelassen.
- `docs/openflighthub-source-inventory.md`: Inventar aller 16 Original-Repositories und Übernahmegrenzen.
- `docs/import-manifest.md`: Quellstände, ausgelassene Dateien und Provenienz.
- `docs/architecture.md`: eigenständiger Architekturentwurf für DroneTerminal.
- `docs/security.md`: vor Produktiveinsatz zu schließende Sicherheitslücken.

## Regeln

Keine verdeckte Lizenzannahme. Keine Übernahme fremder nicht lizenzierter Quellen, keine DJI-Lizenzumgehung, keine automatisch aktivierte Fernsteuerung oder Flugmission. Produktiver Einsatz erfordert gesonderte Tests, sichere Konfiguration und ausdrückliche Freigabe.

Die MIT-Lizenzen der übernommenen Module bleiben im jeweiligen Modulverzeichnis erhalten. Die Originalautoren sind in den Importdokumenten angegeben.

## Nächste Schritte

1. Erlaubnis der Rechteinhaber für zentrale OpenFlightHub-Komponenten einholen **oder** fehlende Funktionen unabhängig neu entwickeln.
2. Importierte Bibliotheken isoliert bauen und testen; sie sind noch nicht in eine neue Anwendung integriert.
3. DJI-Funktionsumfang anhand der offiziellen Cloud-API-Dokumentation und echter Hardware verifizieren.
