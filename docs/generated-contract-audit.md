# Isolierter Typgenerator-Vertragsabgleich

Stand: 08.11.2026. Die Quell-Snapshots unter `tools/openflighthub/`
werden nicht verändert.

## Zweck

`scripts/check-generated-contracts.cjs` verwendet den importierten
`definition-generator` in einem **temporären Arbeitsverzeichnis**.
Die API-OpenAPI-Spezifikation und das DBML-Schema werden vorher als
Kopien dorthin übergeben; die Original-Skripte sehen dadurch ihre
erwartete Verzeichnisstruktur `../api` und `../database`.

Es erzeugt vier Typ-/Hilfsdateien außerhalb des Repositories:

- `api/ApiTypes.ts`
- `api/ApiSchemas.ts`
- `db/DBTypes.ts`
- `db/DBHelpers.ts`

Diese Dateien werden byteweise gegen
`services/api/upstream/src/generated-definitions/` verglichen.
Der Bericht enthält SHA-256-Hashes, Größen und die Kategorien
`MATCH` oder `DRIFT`, nicht den vollständigen Dateidiff.
Die temporären Dateien werden nach dem Durchlauf gelöscht.

## Aufruf

Voraussetzung: Node.js 22 und die festgeschriebenen
`definition-generator`-Abhängigkeiten.

```bash
cd tools/openflighthub/definition-generator
npm ci --ignore-scripts --no-audit --no-fund
cd ../../..
node scripts/check-generated-contracts.cjs --report /tmp/droneterminal-contract-audit.json
```

Ein `DRIFT` bedeutet zunächst nur, dass die aktuell im Repository
vorhandenen generierten Typen nicht identisch mit dem
neu generierten Resultat sind. Der Report-Modus beendet den Lauf bei
Drift **nicht** mit einem Fehler. Erst nach einer fachlichen Prüfung
der Änderungen ist der strengere Aufruf sinnvoll:

```bash
node scripts/check-generated-contracts.cjs --fail-on-drift
```

Die Option `--report` verlangt eine nicht existierende Zieldatei;
bestehende Reports werden nicht überschrieben.

## Sicherheitsgrenzen

- Kein Start des ursprünglichen `src/app.ts`, das `deasync`
  aufruft und ohne Staging live in die Backend-Struktur schreiben würde.
- Stattdessen direkter Import der zwei asynchronen Generator-Funktionen;
  natives `deasync` ist nicht erforderlich.
- Eingaben sind ausschließlich zwei lokale, reguläre Dateien.
  Externe OpenAPI-`$ref`-URLs werden abgewiesen.
- Node-HTTP(S), TCP-Verbindungsaufbau und `fetch` werden während
  der Generierung aktiv blockiert. Es findet kein DJI-MQTT-Verkehr statt.
- Das GitHub-Actions-Job hat nur Leseberechtigungen und startet keine
  Datenbank, keinen Server und keine DJI-Geräteverbindung.
- Vorhandene Definitionen werden **nie** überschrieben; ein CI-Schritt
  kontrolliert zusätzlich den unveränderten Git-Arbeitsbaum.
- Der Audit-Report wird 14 Tage als CI-Artefakt gespeichert.
- Dies ist eine begrenzte Code-Isolation, **keine** Garantie
  vollständiger Betriebssystem-Sandboxing gegen bewusst bösartigen
  Drittanbieter-Code.

## Interpretation

Die ursprünglichen API- und DBML-Dateien sowie der Generator haben
unabhängige Versionsstände. Abweichungen müssen fachlich auf
API-/Datenmodellkompatibilität geprüft werden; ein automatisches
`git add`, Merge oder Update wird nicht ausgeführt. Die bestehende
Web-App bezieht das SDK bisher via npm und wird durch diesen Check
nicht automatisch auf ein anderes SDK umgestellt.

## Nächste Schritte

1. Generierten Report auswerten und Änderungen auf API-Drift,
   Typ-Kompatibilität und unerwartete Feldverluste untersuchen.
2. Falls notwendig, geprüfte Generator-Korrekturen in einen
   separaten Adapter integrieren – niemals den Upstream-Snapshot
   ungeprüft überschreiben.
3. Anschließend Offline-SDK-Vertragstests hinzufügen, die Web-App,
   OpenAPI und generierte DTOs abgleichen.
4. Weiterhin keine produktiven Deployments, Datenbankmigrationen
   oder DJI-Schreiboperationen aus diesem Check auslösen.

## Erster verifizierter Lauf und aktivierte CI-Grenze

GitHub Actions Run [42522861675](https://github.com/mason82-dotcom/DroneTerminal/actions/runs/42522861675) hat das Originalschema und die OpenAPI in einem temporären Arbeitsverzeichnis verarbeitet. Ergebnis:

- `ApiTypes.ts`: MATCH
- `ApiSchemas.ts`: MATCH
- `DBTypes.ts`: MATCH
- `DBHelpers.ts`: MATCH

Damit waren **4/4 Ausgaben byteidentisch (SHA-256)** und das Repository blieb unverändert. Seit diesem Nachweis nutzt die CI standardmäßig `--fail-on-drift`; neue Abweichungen führen künftig zum Fehlerstatus. Das HTML-/Laufzeitverhalten der API oder die Berechtigung zu einer Weiterverbreitung wird hiermit nicht geprüft.
