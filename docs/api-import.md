# API-Import: OpenFlightHub zu DroneTerminal

## Herkunft und Prüfnachweis

- Nutzerarchiv: api-master.zip
- Upstream: https://github.com/OpenFlightHub/api
- Fixierter Commit: 903019755143799cfe528eeb1960a1f52776cb27
- Git-Tree: 9239f39b6b54cba8da14ad717e3c6fb2ae5d1158
- Verzeichnis: services/api/upstream/
- Dateien: 155, einschließlich fünf großer Test-/Beispielbilder
- Umfang: 31.191.444 Byte
- Validierung: Git-Tree byteidentisch mit Nutzerarchiv; inklusive Dateinamen, Dateimodi und Originalbaum.

## Module

Express/TypeScript-REST-API, WebSocket, MongoDB-unabhängiges
PostgreSQL/pg-promise-ORM, DJI-Pilot-2-MQTT-Connector, Flug-/Geräte-/Medien-/
Missionstypen, Authentifizierung, MinIO/S3, Geodaten- und Luftlageintegration.
Die vorhandene Web-App referenziert den OpenFlightHub TypeScript-API-Client
unter vendor/openflighthub/api-client-sdk-typescript; die API definiert die
OpenAPI-Spezifikation unter openapi_spec.yaml. Die DB-Entitäten wurden
separat unter services/database/upstream/schema.dbml importiert.

## Sicherheits- und Betriebsgrenzen

- Keine LICENSE-Datei im Originalarchiv. Wiederverwendungsrechte am
  Gesamtprojekt sind ungeklärt; vor Merge/Weitergabe klären.
- Das originale README zeigt Beispielpasswörter und API-/Cloud-Schlüssel.
  NICHT unverändert verwenden. secrets.json darf nicht eingecheckt werden.
- Originale Docker-/Deployment-Skripte können Container ersetzen, Dateien
  entfernen und aktiv Ports veröffentlichen. Sie liegen nur als
  unveränderter Quell-Snapshot unter services/api/upstream.
  Der verschachtelte GitHub-Workflow wird nicht ausgeführt.
- Ein Start von src/launch.ts öffnet HTTP- und MQTT-Listener und aktiviert
  den DJI-Connector. Dies wird bewusst nicht automatisiert und ist
  nicht als read-only nachgewiesen. Keine Live-Geräte verbinden.
- Der ursprüngliche API-Server benötigt eine schreibfähige DB-Rolle,
  separate Auth-/Mail-/MinIO-/Terrain-Konfiguration und Dienste.
  Die isolierte DB-Laborinstanz enthält bewusst KEINEN solchen Account.
- Kein produktiver Test, kein Datenbank-Upgrade, kein DJI-Hardwaretest und
  keine Erlaubnis zur Flugsteuerung. Der Snapshot belegt nur den Quellimport.

## Prüfung

Die GitHub-Action verify-api.yml prüft Git-Tree/Kopierintegrität und
TypeScript-Build ohne Start des Servers, Container-Deployment, Secrets oder
aktive Netzwerkkontakte zu DJI/Endgeräten. Die bestehende Web-App/DB
wurde durch diesen Import nicht verändert.

## Nächste Umsetzung

1. Rechte für Web-App, Datenbank und API verbindlich klären.
2. Authentifizierungs-/RBAC- und API-Datenmodelle gegeneinander prüfen.
3. Eigenen, standardmäßig inaktiven API-Adapter für das lokale DB-Labor
   und Web-App-Konfiguration mit explizitem Offline-/Read-only-Modus bauen.
4. DB-Migrationen, Isolation, Secret-Management, Replay- und Geräte-Testfälle
   nachweisbar verifizieren.
5. Aktive DJI-MQTT-Befehle, Schreib- und DRC-Operationen standardmäßig
   sperren, bevor eine Verbindung zur realen Hardware erlaubt wird.
