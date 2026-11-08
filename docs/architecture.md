# DroneTerminal: Architekturentwurf (eigenständig)

Die Architekturplanung ist ein eigenständiger Entwurf. Separat importierte Quell-Snapshots (Web-App, Datenbank und API) sind **nicht** als freigegebene, produktiv verwendbare Komponenten zu verstehen; ihre Wiederverwendungsrechte sind ungeklärt.

## Vorgesehene Komponenten

1. **Frontend:** responsive Bodenstationsoberfläche mit Kartenansicht, Geräte-/Quellenstatus, Telemetrie, Flight Replay, Mediathek und klarer Kennzeichnung von Simulation/Live.
2. **Backend:** REST- und WebSocket-API mit rollen- und workspacegebundenen Zugriffsregeln, Ereignisprotokoll und Versionierung.
3. **DJI-Adapter:** Geräteidentität und MQTT-Topologie, ausschließlich lesend als Standard; frische OSD-/State-Daten mit getrennten Zeitstempeln und fail-closed Parsern.
4. **Geodienst:** Höhenmodelle, Sichtlinien, Kamera-Footprints, sichere Geometrietransformationen und messbare Performance-Budgets.
5. **Luftlage:** optionaler ADS-B-/Mode-S-Eigenempfang über MIT-Decoder; unabhängige Quellen, Frischeanzeige und Quellnachweise.
6. **Mediendienst:** MinIO/S3, standardmäßig read-only, temporäre scoped Upload-Rechte nur nach eigener Freigabe.
7. **Simulations-/Testlabor:** synthetische Nachrichten, Fehler-/Reconnect-Tests, Gerätefähigkeitsmatrix und nachprüfbare Testprotokolle.

## Technische Reihenfolge

- P0: Lizenzstatus und reproduzierbare Importprüfung dokumentiert.
- P1: Originale DJI-Cloud-API-Dokumentation und Hardwarekompatibilität als separate Matrix erfassen.
- P2: Minimales eigenständiges Backend und UI erstellen (ohne unlizenzierte Quellcodeübernahme).
- P3: Gelände-/Sichtlinien-Funktion mit Geoid-/AGL-/MSL-Höhenreferenzen und Regressionstests implementieren.
- P4: MQTT-Hardwaretests, Reconnect, Rollen-ACL, Protokoll-Audit; DRC/Flugsteuerung standardmäßig gesperrt.

## Betrieb

Der vorliegende Repo-Stand ist **ein Quellarchiv mit Web-App/API, ein isoliertes Datenbank-Testlabor und ein Entwurf** und darf nicht als einsatzfähiges Drohnensteuerungssystem behandelt werden. Keine aktiven DJI-Kommandos, keine Cloud-Zugangsdaten und kein automatischer Deploymentpfad.
