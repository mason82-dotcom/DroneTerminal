# [8.3.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/8.2.0...8.3.0) (27. Sept 2026)
* add live share keys endpoint

# [8.2.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/8.1.0...8.2.0) (26. Sept 2026)
* add note field to mission and task

# [8.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/8.0.0...8.1.0) (15. Jun 2026)
* add geobject type collision

# [8.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/7.0.0...8.0.0) (03. Jun 2026)
* change geo object "traffic" sub types

# [7.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/6.1.0...7.0.0) (31. May 2026)
* change geoobject not requiring workspace_id (for global geoobjects like traffic)
* adjust geoobject listening (removed coordinates and range, this data now depends on the workspace)

# [6.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/6.0.0...6.1.0) (29. May 2026)
* add workspace permissions and kick team endpoints
* fix form posts

# [6.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/5.2.0...6.0.0) (12. May 2026)
* change workspace geo-objects endpoints
* add link/unlink geo-objects
* change geoobject tasks to be an array of ids

# [5.2.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/5.1.0...5.2.0) (11. May 2026)
* add admin system database endpoint

# [5.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/5.0.0...5.1.0) (11. May 2026)
* add workspace missions
* add all-teams endpoint
* fix mission and task state types

# [5.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/4.1.1...5.0.0) (10. May 2026)
* add missions and tasks
* manual flight editing
* change connection create endpoint location
* change admin users and organisations endpoint locations
* add invite and remove team member
* add team workspaces endpoint

# [4.1.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/4.1.0...4.1.1) (06. May 2026)
* fix filtering live events default filter
* fix some types

# [4.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/4.0.0...4.1.0) (30. Apr 2026)

* geo objects include id
* time property in flights data is now required

# [4.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.1.5...4.0.0) (23. Apr 2026)

* Rework the parameters of endpoint functions (this is breaking existing code, but can be migrated fairly simple)
* supports API version 0.17.0

# [3.1.5](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.1.4...3.1.5) (19. Dez 2025)

* add stream_is_alive on connection

# [3.1.4](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.1.3...3.1.4) (19. Dez 2025)

* add workspace_id field to connection endpoint

# [3.1.3](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.1.2...3.1.3) (17. Dez 2025)

* improve api types and schemas for arrays with specific size

# [3.1.2](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.1.1...3.1.2) (17. Dez 2025)

* improve api types and schemas for arrays with specific size and for geoobject types

# [3.1.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.1.0...3.1.1) (16. Dez 2025)

* adjust under the hood geo object events sensing area

# [3.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/3.0.0...3.1.0) (16. Dez 2025)

* remove traffic apis

# [3.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.18.0...3.0.0) (16. Dez 2025)

* BREAKING: use new geo objects endpoint and events (old: map elements and traffic)
* adjust some type names

# [2.18.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.17.1...2.18.0) (15. Oct 2025)

* BREAKING: adjust format for map_elements event

# [2.17.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.17.0...2.17.1) (15. Oct 2025)

* fix typescript types for map_elements field "type"

# [2.17.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.16.2...2.17.0) (15. Oct 2025)

* add circle map element

# [2.16.2](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.16.1...2.16.2) (15. Oct 2025)

* improve types for map elements

# [2.16.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.16.0...2.16.1) (15. Oct 2025)

* fix api return types for map elements

# [2.16.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.15.1...2.16.0) (15. Oct 2025)

* add map-element api

# [2.15.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.15.0...2.15.1) (15. Oct 2025)

* add field "name" to traffic event data

# [2.15.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.14.0...2.15.0) (14. Oct 2025)

* add map_element event

# [2.14.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.13.0...2.14.0) (25. Apr 2025)

* BREAKING: refactor media created_at to received_at and captured_at
* add workspace location
* add media camera meta

# [2.13.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.12.0...2.13.0) (22. Apr 2025)

* add flight_id to media events

# [2.12.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.11.0...2.12.0) (22. Apr 2025)

* add flight_id to media objects

# [2.11.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.10.1...2.11.0) (22. Apr 2025)

* add /flight/media endpoint
* change /workspace/files endpoint so it returns full file data (like /file)

# [2.10.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.10.0...2.10.1) (18. Apr 2025)

* fix return type of /drone/current-flight

# [2.10.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.9.0...2.10.0) (18. Apr 2025)

* add /file/get-multiple
* add endpoints for flights
* add /media/ground-coverage

# [2.9.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.8.0...2.9.0) (15. Apr 2025)

* add file_id and drone_serial_number to drone media events

# [2.8.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.7.0...2.8.0) (14. Apr 2025)

* add has_thumbail to file
* add helpers for file and thumbnail url


# [2.7.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.6.0...2.7.0) (13. Apr 2025)

* add file_name and drone_id to media object

# [2.6.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.5.0...2.6.0) (13. Apr 2025)

* add media endpoint

# [2.5.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.4.0...2.5.0) (13. Apr 2025)

* add events drone_media and workspace_drones_media


# [2.4.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.3.0...2.4.0) (11. Apr 2025)

* add property name to workspace connection
* change reference system for connections and drones (drones have a last_connection_id property)


# [2.3.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.2.1...2.3.0) (04. Apr 2025)

* add workspace_drone_positions event
* add serial_number property to drone position


# [2.2.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.2.0...2.2.1) (02. Apr 2025)

* change rest api timeout
* add ws_url for for dji pilot sdk config

# [2.2.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.1.0...2.2.0) (27. Feb 2025)

* add property workspace_uuid for /connection-link/config response data

# [2.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/2.0.0...2.1.0) (27. Feb 2025)

* add /connection-link/reset-workspace-uuid endpoint

# [2.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.2.0...2.0.0) (20. Feb 2025)

* revert the live part of the sdk to version 1.2.0 (which removes the changes to the filter system) and implement new braking changes for events. Also marked version 1.3.0 and 1.4.0 as BREAKING (they should have been a major version).

# [1.4.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.4.0...1.4.1) (20. Feb 2025)

* fix ts type Message_Type_Event_Object_Data_Drone_Telemetry

# [1.4.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.3.1...1.4.0) (20. Feb 2025)

BREAKING CHANGE
* implement filter separators

# [1.3.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.3.0...1.3.1) (20. Feb 2025)

* fix ts type in subscribeToRemoteController()

# [1.3.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.2.0...1.3.0) (20. Feb 2025)

BREAKING CHANGE
* add live remote_controller and drone telemetry and position

# [1.2.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.1.0...1.2.0) (20. Feb 2025)

* add new endpoints for files and media

# [1.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.0.2...1.1.0) (27. Jan 2025)

* add traffic event

# [1.0.2](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.0.1...1.0.2) (26. Jan 2025)

* fix client sdk version property
* **BREAKING** implement live api user friendly
* update usage example

# [1.0.1](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/1.0.0...1.0.1) (26. Jan 2025)

* fix this binding in LiveWebsocket.handleMessage()

# [1.0.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/compare/0.1.0...1.0.0) (26. Jan 2025)

* Reimplemented live websocket

# [0.1.0](https://github.com/OpenFlightHub/api-client-sdk-typescript/commit/e62b161864d728eca5580aa7682fe14bbd43ecc8) (26. Jan 2025)

* Initial version
