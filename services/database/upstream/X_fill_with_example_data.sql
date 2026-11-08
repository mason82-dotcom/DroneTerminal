
-- users #0 (the system user)
INSERT INTO users (id, created_by_user_id, name, email, email_hash) VALUES (0, 0, 'system', '', '');

-- users #1 (for example usage) password = 1234
INSERT INTO users (id, created_by_user_id, name, email, email_hash, password) VALUES (1, 0, 'test', 'test@openflighthub.org', '', '64$65536$8$1$o01tZR9QKBZbfXHtgCsHjSJfWHZwitNYhuYKGYO8RVQ=$55PAX9JDYsNPGNFXOOgdCNeZ7A/tPYD5jHvFoMbqw7BlJN+HY3g1cO9X/Nt5uHevNBidUBQOKDSWlCNbVPBDKg==');

-- users #2 (for api tests) password = CorrectBatteryHorseStaple
INSERT INTO users (id, created_by_user_id, name, email, email_hash, password, session_token) VALUES (2, 0, 'test_api_1', 'test_api_1@openflighthub.org', '', '64$65536$8$1$Gd6jprqm68qOQeRotxmLCZYGLZRMjdbZNluI4CsqEA4=$0auLNnLn1/q/fSdI96LuhyP4shW77BrWRoA1h0JS+hpP1YTCEJ0uQa71vikAn8a2ozN25qpuKtpzZ5FHsj60+A==', 'session_2');

-- users #3 (for api tests) password = CorrectBatteryHorseStaple
INSERT INTO users (id, created_by_user_id, name, email, email_hash, password, login_token) VALUES (3, 0, 'test_api_2', 'test_api_2@openflighthub.org', '', '64$65536$8$1$Gd6jprqm68qOQeRotxmLCZYGLZRMjdbZNluI4CsqEA4=$0auLNnLn1/q/fSdI96LuhyP4shW77BrWRoA1h0JS+hpP1YTCEJ0uQa71vikAn8a2ozN25qpuKtpzZ5FHsj60+A==', '39s7h17sd76g1sd');

-- users #4 dev account password = ofh
INSERT INTO users (id, created_by_user_id, name, email, email_hash, password) VALUES (4, 0, 'Dev', 'mail@openflighthub.org', '', '64$65536$8$1$lk/s/aij4pLpEFK7eF2iIkFD1vxNYpipvVz9uTBqJUI=$ouhy3I2GXduGM8m8HY1/XszNonxy7oYJYnv9lx6BcfUH2AKUxgfeM9qnAVuSs9cYjaFDuN0Awt8RHjBOkgnhLg==');

-- users #5 (for example usage) password = CorrectBatteryHorseStaple
INSERT INTO users (id, created_by_user_id, name, email, email_hash, password) VALUES (5, 0, 'edp', 'edp@openflighthub.org', '', '64$65536$8$1$Gd6jprqm68qOQeRotxmLCZYGLZRMjdbZNluI4CsqEA4=$0auLNnLn1/q/fSdI96LuhyP4shW77BrWRoA1h0JS+hpP1YTCEJ0uQa71vikAn8a2ozN25qpuKtpzZ5FHsj60+A==');


-- organisations #0
INSERT INTO organisations (id, name, owner_user_id) VALUES (0, 'system', 0);

-- organisations #1
INSERT INTO organisations (id, name, owner_user_id) VALUES (1, 'edp', 5);


-- workspaces #0 system (backup workspace in case drone connection has no current connection (should never happen))
INSERT INTO workspaces (id, name, longitude, latitude, created_by, owner_organisation_id) VALUES (0, 'System', 10, 47, 0, 0);
-- workspaces #1
INSERT INTO workspaces (id, name, longitude, latitude, created_by, owner_organisation_id) VALUES (1, 'Test Usage Example', 10.270800, 47.563710, 0, 0);

-- files #1
INSERT INTO files (id, workspace_id, name, ext, created_by) VALUES (1, 1, 'DJI_20230608135046_0004_T.JPG', 'JPG', 1);
INSERT INTO files (id, workspace_id, name, ext, created_by) VALUES (2, 1, 'DJI_20230608135032_0003_W.JPG', 'JPG', 1);
INSERT INTO files (id, workspace_id, name, ext, created_by) VALUES (3, 0, 'logo_small.png', 'png', 0);

UPDATE organisations SET logo_file_id = 3 WHERE id = 0;

-- teams #0
INSERT INTO teams (id, name, owner_user_id, organisation_id) VALUES (0, 'system', 0, 0);
UPDATE users set team_id = 0 WHERE id = 0;

-- teams #1
INSERT INTO teams (id, name, owner_user_id, organisation_id) VALUES (1, 'test', 1, 0);
UPDATE users set team_id = 1 WHERE id = 1;

-- teams #2
INSERT INTO teams (id, name, owner_user_id, organisation_id) VALUES (2, 'test_api_1', 2, 0);
UPDATE users set team_id = 2 WHERE id = 2;

-- teams #3
INSERT INTO teams (id, name, owner_user_id, organisation_id) VALUES (3, 'test_api_2', 3, 0);
UPDATE users set team_id = 3 WHERE id = 4;

-- teams #4
INSERT INTO teams (id, name, owner_user_id, organisation_id) VALUES (4, 'dev', 4, 0);
UPDATE users set team_id = 4 WHERE id = 4;

-- teams #5
INSERT INTO teams (id, name, owner_user_id, organisation_id) VALUES (5, 'edp', 5, 1);
UPDATE users set team_id = 5 WHERE id = 5;

-- grant permissions for team 0
INSERT INTO workspace_permissions (workspace_id, team_id) VALUES (0, 0);
-- grant permissions for team 1
INSERT INTO workspace_permissions (workspace_id, team_id) VALUES (1, 1);
-- grant permissions for team 4
INSERT INTO workspace_permissions (workspace_id, team_id) VALUES (1, 4);
-- grant permissions for team 5
INSERT INTO workspace_permissions (workspace_id, team_id) VALUES (1, 5);


-- remote_controllers #1
INSERT INTO remote_controllers (id, serial_number) VALUES (1, 'RC_FAKE');

-- drones #1
INSERT INTO drones (id, serial_number, name) VALUES (1, 'DRONE_FAKE', 'Fake Mavic 3');

-- flights #1
INSERT INTO flights (id, drone_id, workspace_id) VALUES (1, 1, 1);

UPDATE drones SET current_flight_id = 1 WHERE id = 1;

-- connections #1
INSERT INTO connections (id, secret, name, workspace_id, last_drone_id, remote_controller_id, workspace_uuid) VALUES (1, 'fake', 'con1', 1, 1, 1, 'a1491fa4-1afc-4f4b-8705-32ee5d28cc7d');

UPDATE drones SET last_connection_id = 1 WHERE id = 1;

-- remote_controller_data #1
INSERT INTO remote_controller_data (id, remote_controller_id, type, data) VALUES (1, 1, 0, '{"height": 1051.7, "latitude": 47.53882, "longitude": 10.32101}'::json);



-- workspaces #2
INSERT INTO workspaces (id, name, longitude, latitude, created_by, owner_organisation_id) VALUES (2, 'Some Workspace', 10.294488, 47.629693, 0, 0);
-- grant permissions for team 4
INSERT INTO workspace_permissions (workspace_id, team_id) VALUES (2, 4);


-- remote_controllers #2
INSERT INTO remote_controllers (id, serial_number) VALUES (2, 'RC_EXAMPLE');

-- drones #2
INSERT INTO drones (id, serial_number, name) VALUES (2, 'DRONE_EXAMPLE', 'Example Mavic 3');

-- flights #2
INSERT INTO flights (id, drone_id, workspace_id) VALUES (2, 2, 1);

UPDATE drones SET current_flight_id = 2 WHERE id = 2;

-- connections #2
INSERT INTO connections (id, secret, name, workspace_id, last_drone_id, remote_controller_id, workspace_uuid) VALUES (2, 'access', 'con2', 2, 2, 2, '65fefa14-0fcb-4166-93db-583ef9fd6811');

UPDATE drones SET last_connection_id = 2 WHERE id = 2;

-- remote_controller_data #2
INSERT INTO remote_controller_data (id, remote_controller_id, type, data) VALUES (2, 2, 0, '{"height": 738.1, "latitude": 47.558801, "longitude": 10.285472}'::json);

-- drone_data #1
INSERT INTO drone_data (id, drone_id, flight_id, type, data) VALUES (1, 2, 2, 0, '{"height": 802.2, "latitude": 47.558801, "longitude": 10.283472}'::json);
-- drone_data #2
INSERT INTO drone_data (id, drone_id, flight_id, type, data) VALUES (2, 2, 2, 1, '{"capacity_percent_left": 2}'::json);


-- drone_media #1
INSERT INTO drone_media (id, drone_id, flight_id, type, file_id, fingerprint, tiny_fingerprint, meta, camera_location, camera_angles) VALUES (1, 1, 1, 1, 1, 'example_fingerprint', 'example_tiny_fingerprint', '{"ext":{"drone_model_key":"0-77-1","file_group_id":"","is_original":true,"line_name":"","payload_model_key":"1-67-0","shoot_position":0,"sn":"1581F5FJC246300E82TU","task_name":"","tinny_fingerprint":"38d9729c9c99ca866cb5e2a0937bce55_2025_4_8_23_19_16"},"metadata":{"absolute_altitude":1799.156,"created_time":"2025-04-08T23:19:17+08:00","gimbal_yaw_degree":136.4,"photoed_position":{"lat":0,"lng":0},"relative_altitude":0,"shoot_position":{"lat":47.53088863888889,"lng":10.18527063888889}}}'::json, '{"position":{"longitude": 10.18527063888889, "latitude": 47.53088863888889}, "height": 1799}'::json, '{"heading": 136.6, "pitch": -15.8, "roll": 0}'::json);

-- drone_media #2
INSERT INTO drone_media (id, drone_id, flight_id, type, file_id, fingerprint, tiny_fingerprint, meta, camera_location, camera_angles) VALUES (2, 1, 1, 1, 2, 'example_fingerprint', 'example_tiny_fingerprint', '{"ext":{"drone_model_key":"0-77-1","file_group_id":"","is_original":true,"line_name":"","payload_model_key":"1-67-0","shoot_position":0,"sn":"1581F5FJC246300E82TU","task_name":"","tinny_fingerprint":"6e7156ee371bfea974d78fcc551cb4d2_2025_4_8_23_19_16"},"metadata":{"absolute_altitude":1799.357,"created_time":"2025-04-08T23:19:17+08:00","gimbal_yaw_degree":136.6,"photoed_position":{"lat":0,"lng":0},"relative_altitude":0,"shoot_position":{"lat":47.53088863888889 ,"lng":10.18527063888889}}}'::json, '{"position":{"longitude": 10.18527063888889, "latitude": 47.53088863888889}, "height": 1799}'::json, '{"heading": 136.6, "pitch": -15.8, "roll": 0}'::json);

-- units

-- geo_objects #1
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (1, 1, 'Unit 1', 2, 0, '{"longitude": 10.22, "latitude": 47.56, "symbol": "/images/geo_objects/units/0.png", "height": 890, "heading": 45, "speed": 35}'::json, 'SRID=4979;POINT(10.22 47.56 0)'::geometry);
-- geo_objects #2
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (2, 1, 'Unit 2', 2, 1, '{"longitude": 10.23, "latitude": 47.56, "symbol": "/images/geo_objects/units/1.png", "height": 820, "heading": 78, "speed": 15}'::json, 'SRID=4979;POINT(10.23 47.56 0)'::geometry);
-- geo_objects #3
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (3, 1, 'Unit 3', 2, 2, '{"longitude": 10.24, "latitude": 47.56, "symbol": "/images/geo_objects/units/2.png", "height": 780, "heading": 95, "speed": 5}'::json, 'SRID=4979;POINT(10.24 47.56 0)'::geometry);
-- geo_objects #4
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (4, 1, 'Unit 4', 2, 3, '{"longitude": 10.25, "latitude": 47.56, "symbol": "/images/geo_objects/units/3.png", "height": 760, "heading": 10, "speed": 0}'::json, 'SRID=4979;POINT(10.25 47.56 0)'::geometry);
-- geo_objects #5
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (5, 1, 'Unit 5', 2, 4, '{"longitude": 10.26, "latitude": 47.56, "symbol": "/images/geo_objects/units/4.png", "height": 0, "heading": 270, "speed": 50}'::json, 'SRID=4979;POINT(10.26 47.56 0)'::geometry);
-- geo_objects #6
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (6, 1, 'Unit 6', 2, 5, '{"longitude": 10.27, "latitude": 47.56, "symbol": "/images/geo_objects/units/5.png", "height": 0, "heading": 170, "speed": 50}'::json, 'SRID=4979;POINT(10.27 47.56 0)'::geometry);
-- geo_objects #7
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (7, 1, 'Unit 7', 2, 6, '{"longitude": 10.28, "latitude": 47.56, "symbol": "/images/geo_objects/units/6.png", "height": 0, "heading": 290, "speed": 0}'::json, 'SRID=4979;POINT(10.28 47.56 0)'::geometry);

-- traffic

-- geo_objects #8
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (8, 1, 'Traffic 1', 1, 0, '{"longitude": 10.22, "latitude": 47.54, "height": 1001, "heading": 160, "speed": 135}'::json, 'SRID=4979;POINT(10.22 47.54 0)'::geometry);

-- markings

-- geo_objects #9
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (9, 1, 'Marking Point', 0, 0, '{"color":"#B620E0","point":[10.240340541717766,47.55910974300143,776.9844360351562]}'::json, 'SRID=4979;POINT(10.240340541717766 47.55910974300143 776.9844360351562)'::geometry);

-- geo_objects #10
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (10, 1, 'Marking Line', 0, 1, '{"color":"#ff0000","line":[[10.24,47.56, 1000],[10.23,47.5, 1500]]}'::json, 'SRID=4979;LINESTRING(10.24 47.56 1000,10.23 47.5 1500)'::geometry);

-- geo_objects #11
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (11, 1, 'Marking Polygon', 0, 2, '{"color":"#00ffff","polygon":[[10.239104579702712,47.55901996532299, 0],[10.23927194960865,47.55947464433558, 0],[10.238535951472102,47.55912132724589, 0]]}'::json, 'SRID=4979;LINESTRING(10.239104579702712 47.55901996532299 0,10.23927194960865 47.55947464433558 0,10.238535951472102 47.55912132724589 0,10.239104579702712 47.55901996532299 0)'::geometry);

-- geo_objects #12
INSERT INTO geo_objects (id, workspace_id, name, type, sub_type, config, geom) VALUES (12, 1, 'Marking Circle', 0, 3, '{"color":"#ffff00","center":[10.239104579702712,47.55901996532299, 900], "radius": 300}'::json, 'SRID=4979;POINT(10.239104579702712 47.55901996532299 900)'::geometry);

-- missions
INSERT INTO missions (workspace_id, created_by, updated_by, state, name, description) VALUES (1, 0, 0, 0, 'Mission Planned', 'This is the first mission');
INSERT INTO missions (workspace_id, created_by, updated_by, state, name, assigned_to_team_id) VALUES (1, 0, 0, 1, 'Mission Accepted', 1);
INSERT INTO missions (workspace_id, created_by, updated_by, state, name, assigned_to_team_id) VALUES (1, 0, 0, 2, 'Mission In Progress', 1);
INSERT INTO missions (workspace_id, created_by, updated_by, state, name, assigned_to_team_id) VALUES (1, 0, 0, 3, 'Mission Done', 1);
INSERT INTO missions (workspace_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 4, 'Mission Rejected');
INSERT INTO missions (workspace_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 5, 'Mission Failed');
INSERT INTO missions (workspace_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 6, 'Mission Canceled');

INSERT INTO tasks (mission_id, created_by, updated_by, state, name, description) VALUES (1, 0, 0, 0, 'Task Planned', 'This is the first task');
INSERT INTO tasks (mission_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 1, 'Task Accepted');
INSERT INTO tasks (mission_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 2, 'Task In Progress');
INSERT INTO tasks (mission_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 3, 'Task Done');
INSERT INTO tasks (mission_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 4, 'Task Rejected');
INSERT INTO tasks (mission_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 5, 'Task Failed');
INSERT INTO tasks (mission_id, created_by, updated_by, state, name) VALUES (1, 0, 0, 6, 'Task Canceled');

INSERT INTO task_geo_objects (task_id, geo_object_id) VALUES (1, 9);
INSERT INTO task_geo_objects (task_id, geo_object_id) VALUES (1, 10);

-- FIX all id sequences
SELECT setval('users_id_seq', 5, true);
SELECT setval('workspaces_id_seq', 2, true);
SELECT setval('remote_controllers_id_seq', 2, true);
SELECT setval('drones_id_seq', 2, true);
SELECT setval('flights_id_seq', 2, true);
SELECT setval('connections_id_seq', 2, true);
SELECT setval('remote_controller_data_id_seq', 2, true);
SELECT setval('drone_data_id_seq', 2, true);
SELECT setval('files_id_seq', 3, true);
SELECT setval('drone_media_id_seq', 2, true);
SELECT setval('geo_objects_id_seq', 12, true);
SELECT setval('teams_id_seq', 5, true);
SELECT setval('organisations_id_seq', 1, true);


