# Sicherheitsvorgaben für künftige DroneTerminal-Dienste

- **MQTT:** Client-Authentifizierung, getrennte Device-/Workspace-Topic-ACLs (Publish und Subscribe), TLS in nicht vertrauenswürdigen Netzen.
- **WebSocket:** Autorisierung pro Ereignistyp, Filter und Abonnement; Rechteprüfung bei jedem Mandantenkontext.
- **HTTP:** Cookie Secure/HttpOnly/SameSite, CSRF-Schutz, restriktives CORS und Input-Validierung.
- **S3/Medien:** Zugriff nur nach Workspace-/Object-Permissions, limitierte STS-Session, serverseitige Objektprüfung.
- **Streaming:** Webhook-Secret ausschließlich über Secret-Verwaltung; keine fest eingebetteten Schlüssel; strikte Publish-/Playback-Rechte.
- **Telemetrie:** OSD/State-Evidenz mit `reported_at`, `received_at`, `device_sn`, `source`, `age`, `parse_status`; ungültige oder überholte Werte nicht als frisch anzeigen.
- **Fernsteuerung:** rein lesend als Voreinstellung; mögliche DRC-/Missionsbefehle ausschließlich mit Pilotenfreigabe, sichtbarer Sicherheitssteuerung, vollständigem Audit und separater Hardware-Abnahme.
- **CI:** Prüfungen für Lizenzherkunft, Imports, Secret-Scanning, Typecheck, Unit-Tests, SCA und reproduzierbare Releases.

Keine der aufgeführten Sicherheitsmaßnahmen ist durch das bloße Kopieren der MIT-Bibliotheken als produktiv umgesetzt oder getestet anzusehen.
