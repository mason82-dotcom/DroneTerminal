# DroneTerminal

Eigenständiges Entwicklungsrepository für eine DJI-nahe Drohnen-Bodenstation und die strukturierte Auswertung des archivierten Projekts [OpenFlightHub](https://github.com/OpenFlightHub).

> **Wichtig:** Der ausdrücklich angeforderte Web-App-Snapshot liegt unter apps/web-app/. Das Archiv enthält keine Wiederverwendungslizenz. Die Weitergabe und der Merge in main erfordern eine Rechteprüfung. Das zugehörige Backend fehlt; dies ist keine einsatzfähige Bodenstation.

## Inhalt

- apps/web-app/: unveränderter Vue-/TypeScript-Web-App-Quellsnapshot aus der ZIP; siehe docs/web-app-import.md.

- `vendor/openflighthub/`: originalgetreue, **MIT-lizenzierte** Quellmodule mit beibehaltenen Lizenzdateien (siehe Importprotokoll); große binäre Demos/Testfixtures werden ausgelassen.
- `docs/openflighthub-source-inventory.md`: Inventar aller 16 Original-Repositories und Übernahmegrenzen.
- `docs/import-manifest.md`: Quellstände, ausgelassene Dateien und Provenienz.
- `docs/architecture.md`: eigenständiger Architekturentwurf für DroneTerminal.
- `docs/security.md`: vor Produktiveinsatz zu schließende Sicherheitslücken.

## Regeln

Keine verdeckte Lizenzannahme. Für die auf ausdrücklichen Wunsch importierte Web-App sind die Rechte weiterhin ungeklärt; keine DJI-Lizenzumgehung, keine automatisch aktivierte Fernsteuerung oder Flugmission. Produktiver Einsatz erfordert gesonderte Tests, sichere Konfiguration und ausdrückliche Freigabe.

Die MIT-Lizenzen der übernommenen Module bleiben im jeweiligen Modulverzeichnis erhalten. Die Originalautoren sind in den Importdokumenten angegeben.

## Nächste Schritte

1. Vor Merge und Weitergabe die Rechte an apps/web-app/ klären oder die UI eigenständig neu entwickeln.
2. Importierte Bibliotheken isoliert bauen und testen; sie sind noch nicht in eine neue Anwendung integriert.
3. DJI-Funktionsumfang anhand der offiziellen Cloud-API-Dokumentation und echter Hardware verifizieren.
