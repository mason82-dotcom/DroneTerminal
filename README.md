# DroneTerminal

Eigenständiges Entwicklungsrepository für eine DJI-nahe Drohnen-Bodenstation und die strukturierte Auswertung des archivierten Projekts [OpenFlightHub](https://github.com/OpenFlightHub).

> **Wichtig:** Die vom Nutzer bereitgestellten OpenFlightHub-Snapshots für Web-App, Datenbank, API und Terrain liegen unter apps/web-app/, services/database/upstream/, services/api/upstream/ und services/terrain/upstream/. Für diese vier Archive ist keine umfassende Wiederverwendungslizenz nachgewiesen. Weitergabe und Merge in main erfordern eine Rechteprüfung. Die Komponenten sind noch nicht als sicherer, lauffähiger Gesamtdienst integriert; dies ist keine einsatzfähige Bodenstation.

## Inhalt

- apps/web-app/: unveränderter Vue-/TypeScript-Web-App-Quellsnapshot aus der ZIP; siehe docs/web-app-import.md.
- services/database/upstream/: byteidentisches OpenFlightHub-Datenbankarchiv aus der ZIP. Dienste und Original-Skripte werden nicht ausgeführt; siehe docs/database-import.md. Optionales isoliertes PostGIS-Labor unter services/database/compose.lab.yml.
- services/api/upstream/: unveränderter Express-/TypeScript-API-Quellsnapshot aus der ZIP; keine automatische Ausführung von MQTT, aktiven DJI-Operationen, Datenbankwrites oder Deploy-Skripten; siehe docs/api-import.md.\n- services/terrain/upstream/: unveränderter Gelände-/Höhen-/Sichtlinien-Quellsnapshot aus der ZIP; keine automatischen Dienststarts oder Verbindung zur API. Siehe docs/terrain-import.md.

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
