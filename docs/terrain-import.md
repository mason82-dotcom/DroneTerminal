# OpenFlightHub Terrain-Import in DroneTerminal

## Herkunft und Integritätsprüfung

- Benutzerarchiv: terrain-master.zip
- Upstream: https://github.com/OpenFlightHub/terrain
- Fixierter Quell-Commit: ff824d2f6f6cd5db1a5908942187407c60c70067
- Original-Tree-SHA: b07968e12dfb1030c3167e41f1cca860a2c2fe2d
- Quellstand: 15.10.2025
- Ziel: services/terrain/upstream/
- Umfang: 31 Dateien, 8.949.770 Bytes, darunter ein grosses Beispiel-JPEG
- Der gesamte Git-Baum inklusive Dateinamen, Modus und Daten ist identisch
  mit dem Benutzerarchiv. Web-App, API, Datenbank und Vendor bleiben unveraendert.

## Modul und Schnittstellen

- TypeScript / Express-Dienst mit POST /elevation:
  Anforderung {longitude, latitude}, Antwort {elevation}.
- POST /camera-ground-coverage: Koordinaten, Hoehe, Blickrichtung,
  Kameraneigung und horizontales/vertikales FoV; liefert {coverage}.
- Sichtlinien-/Terrain-Sampling-Utilities und OpenAPI 3.0.3-Spezifikation.
- Verwendung der node-hgt TileSet-Bibliothek; Daten unter dem relativen
  Verzeichnis terrain_tiles/ (in .gitignore, nicht im Archiv).
- Das importierte API-Backend dokumentiert die Konfigurationsoption
  terrain_service_adress (Original-Schreibweise, mit einem d).
- Die Web-App hat eine eigene Cesium-basierte Terrainabfrage; kein
  automatischer Austausch des Terrain-Providers durch diesen Import.

## Sicherheits- und Reifegradgrenzen

- Keine LICENSE-Datei im Terrain-Archiv; Weitergaberechte nicht verifiziert.
  Vor Merge/Redistribution und Modifikation zusaetzlich klaeren.
- Original src/launch.ts bindet Port 6007 an 0.0.0.0.
  Es wird hier kein Dienst gestartet, kein Port geoeffnet und keine
  Verbindung zur Produktiv-API oder zu DJI-Hardware hergestellt.
- Original-Upstream-Deploy-Workflow enthaelt rm -rf, stop/rm/start
  von Containern und Secrets-Handling. Der Workflow befindet sich
  ausschliesslich verschachtelt in services/terrain/upstream/.github/
  und wird NICHT von GitHub Actions im Zielrepo ausgefuehrt.
- Keine HGT/SRTM-Tiles enthalten: echte Hoehenwerte,
  Sichtlinien und Bodenkontur sind NICHT end-to-end verifiziert.
- Eingaben werden derzeit vor allem mit isNaN validiert;
  Wertebereiche fuer Longitude/Latitude/FoV, maximale Komplexitaet
  und Fehler/Timeouts sind noch zu haerten. POST-/camera-ground-coverage
  kann bei grossem FoV aufwendig sein; vor Exposition Limits und Auth
  einfuehren.
- Hoehenreferenzen (Ellipsoid, Geoid, MSL, AGL) und Datenqualitaet
  muessen fuer missionskritische Darstellung vereinheitlicht werden.
- Keine Drohnensteuerung, kein DJI-Livebetrieb und keine produktive
  Geodaten-Genauigkeitsfreigabe durch diesen Import.

## Technische Checks

.github/workflows/verify-terrain.yml validiert die exakte Quellkopie,
die Schnittstellendateien und den nicht startenden TypeScript-Build.
Eine begrenzte Route-Validierung und reine Sichtlinien-Unit-Tests
koennen ohne Geländekacheln durchgefuehrt werden; echte 200-Antworten
mit Geländehöhen verlangen nachvollziehbare lokale Kacheln.

## Nächste Schritte

1. Lizenzrechte fuer alle importierten OpenFlightHub-Komponenten klaeren.
2. Isolierten Terrain-Testdienst nur auf Loopback/privatem Testnetz
   mit kontrollierten HGT-Testkacheln bereitstellen (kein Auto-Deploy).
3. API-Terrain-Client, Fehlerbilder und Wertebereiche ueberpruefen,
   sowie Höhenreferenz und Datenherkunft pro Ergebnis ausweisen.
4. Web-App- und API-Vertraege sowie den SRTM/HGT-Cache testen.
5. Vor Einsatz an echten Missionsdaten Genauigkeit, NoData,
   Kontur-, FoV- und Grenzfalltests ausfuehren.
