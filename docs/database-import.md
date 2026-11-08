# Datenbank-Import: OpenFlightHub zu DroneTerminal

## Reproduzierbarkeit

- Nutzereingabe: database-master.zip
- Upstream: https://github.com/OpenFlightHub/database
- Fixierter Commit: 727f1f74ab553c65311f5727e9d304be0c975ad5
- Original-Git-Tree: 111486dd0fe0e3f7e127b9d44eba48951a4ad318
- Import: services/database/upstream
- Inventar: 17 Dateien, 8.061.861 Byte (davon drei Beispielbilder)
- Abgleich: Inhalte, Unterverzeichnisse und Dateimodi im Git-Tree identisch
- Der vorhandene Vendor-Bestand und die Web-App wurden nicht verändert.

## Technischer Umfang

PostgreSQL/PostGIS-Schema mit 23 Fach-Tabellen:
Benutzer, Teams, Organisationen, Workspaces, Geräte/Controller, Verbindungen,
Flüge/Telemetrie, Medien, Geometrie, Missionen, Aufgaben und Sharing.
schema.dbml dokumentiert die Entitäten; 3_setup_triggers.sql ist leer.

## Sicherheitsbefunde

- Kein LICENSE-File: Keine Wiederverwendungsrechte am Gesamtprojekt verifiziert.
  Nur wait-for.sh trägt einen eingebetteten MIT-Lizenzhinweis für dieses Skript.
- build_and_run_docker.sh und die ursprünglichen verschachtelten GitHub
  Workflows enthalten destruktive Befehle (Container/Volumes/Dateien löschen).
  Diese dürfen weder automatisch noch auf Produktivhosts ausgeführt werden.
- 2_init_users_and_permissions.sql enthält ein festes API-Rollenpasswort;
  X_fill_with_example_data.sql enthält voreingestellte Demo-Accounts,
  Session- und Verbindungstokens. Nicht für produktive Deployments nutzen.
- SQL-Dateien bilden einen Initial-Snapshot, kein inkrementelles
  Migrationssystem. Bestehende Datenbanken niemals direkt initialisieren.
- Kein Backend/DB-Adapter und keine Authentifizierungsintegration vorhanden.
  DJI-Hardware wurde nicht getestet; es gibt keine Flugsteuerungsfreigabe.

## Sicheres, optionales Schema-Labor

services/database/compose.lab.yml startet einen getrennten PostGIS-Container
mit eigenem benannten Volume, ohne veröffentlichte Host-Ports. Automatisch
werden NUR 0_init_database.sql und 1_init_tables.sql in ein neu angelegtes
Testvolume eingespielt; kein Demo-Seed, keine API-Rolle und kein Übernehmen
oder Löschen einer bestehenden produktiven Datenbank. Die GitHub-CI prüft
das Laborschema in einem isolierten Runner und entfernt nur dessen
temporäres Volume.

Vor produktiver Nutzung erforderlich: Lizenzstatus, Migrationen/Backups,
Rollen/Secrets, Mandantentrennung, API-Verträge und Systemtests.
