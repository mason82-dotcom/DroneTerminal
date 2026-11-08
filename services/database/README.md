# DroneTerminal – Datenbank (Import und isoliertes Labor)

Die Dateien unter `upstream/` sind eine **byteidentische Kopie** der vom Nutzer
bereitgestellten `database-master.zip` aus `OpenFlightHub/database`. Sie sind
kein freigegebenes Produktivschema. Provenienz und Risiken:
[docs/database-import.md](../../docs/database-import.md).

## Inhalt

- `upstream/0_init_database.sql`: PostgreSQL-Erweiterungen (`uuid-ossp`, PostGIS).
- `upstream/1_init_tables.sql`: 23 Tabellen für Benutzer/Teams, Workspaces,
  Drohnen, RC, Flüge, Telemetrie, Medien, Geometrie und Missionen.
- `upstream/2_init_users_and_permissions.sql`: **UNSICHER** – erzeugt eine
  API-Rolle mit fest eingetragenem Passwort; kein automatischer Einsatz.
- `upstream/X_fill_with_example_data.sql`: **NUR TESTDATEN** – beinhaltet
  feste Zugangsdaten, Session-Tokens und fiktive Geräte.
- `upstream/build_and_run_docker.sh` und die verschachtelten
  `upstream/.github/workflows/`: **DESTRUKTIV** – können Container,
  Volumes oder Dateien löschen. Nicht ausführen.
- `upstream/schema.dbml`: Entity-Relationship-Entwurf, Referenzstand.
- `compose.lab.yml`: isolierte Laborinstanz; nur das Basis-Schema wird
  bei erstmaligem Start auf einem leeren Volume geladen.

## Isolierte Schema-Prüfung (optional)

Die folgenden Befehle starten **einen eigenen Docker-Container** und erzeugen
ein neues benanntes Docker-Volume. Sie verändern keine vorhandene
DroneTerminal-, SkyHub-Next- oder Pi-/BRIX-Datenbank.

```bash
export DRONETERMINAL_DB_ADMIN_PASSWORD="$(openssl rand -hex 24)"
docker compose -f services/database/compose.lab.yml up -d --wait
docker compose -f services/database/compose.lab.yml exec db \
  psql -U droneterminal -d droneterminal -c \
  "SELECT extname FROM pg_extension WHERE extname IN ('postgis', 'uuid-ossp');"
docker compose -f services/database/compose.lab.yml exec db \
  psql -U droneterminal -d droneterminal -c \
  "SELECT to_regclass('public.missions'), to_regclass('public.drone_media');"
```

**Kein Host-Port** wird veröffentlicht; Zugriff nur aus dem isolierten
Compose-Netz oder per `docker compose exec`. Keine API-Rolle und keine
Demobenutzer werden angelegt. Andere Komponenten können sich damit
**noch nicht** automatisch verbinden. Stoppen mit `docker compose -f
services/database/compose.lab.yml down` erhält das Volume; `down -v`
würde ausdrücklich die isolierten Labordaten löschen.

## Noch erforderlich

1. Nutzungsrechte am Original klären (es liegt keine Projekt-Lizenzdatei vor).
2. Eigenes versioniertes Migrationssystem und rollenbasierte DB-Rechte
   ohne eingebettete Geheimnisse implementieren.
3. API-/Web-App-Datenmodelle, Authentifizierung und Migrationsstand abgleichen.
4. PostgreSQL-/PostGIS-Versionen, Restore/Backup und Isolation testen.
5. Livegeräte und Telemetrie weiterhin read-only; keine Freigabe von
   Steuer- oder DJI-Kommandos durch diesen Import.
