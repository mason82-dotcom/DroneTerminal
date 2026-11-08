-- Privileges explained: https://www.postgresql.org/docs/9.0/sql-grant.html

DROP ROLE IF EXISTS api;
CREATE ROLE api WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD '0198s88hh277s72';-- TODO change

GRANT USAGE ON SCHEMA public TO api;

GRANT SELECT, INSERT, UPDATE ON TABLE public.users TO api;
GRANT USAGE ON SEQUENCE public.users_id_seq TO api;

GRANT SELECT, INSERT, UPDATE ON TABLE public.teams TO api;
GRANT USAGE ON SEQUENCE public.teams_id_seq TO api;

GRANT SELECT, INSERT, UPDATE ON TABLE public.organisations TO api;
GRANT USAGE ON SEQUENCE public.organisations_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.files TO api;
GRANT USAGE ON SEQUENCE public.files_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.workspaces TO api;
GRANT USAGE ON SEQUENCE public.workspaces_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.workspace_permissions TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.connections TO api;
GRANT USAGE ON SEQUENCE public.connections_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.drones TO api;
GRANT USAGE ON SEQUENCE public.drones_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.remote_controllers TO api;
GRANT USAGE ON SEQUENCE public.remote_controllers_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.drone_data TO api;
GRANT USAGE ON SEQUENCE public.drone_data_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.remote_controller_data TO api;
GRANT USAGE ON SEQUENCE public.remote_controller_data_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.drone_media TO api;
GRANT USAGE ON SEQUENCE public.drone_media_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.geo_objects TO api;
GRANT USAGE ON SEQUENCE public.geo_objects_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.flights TO api;
GRANT USAGE ON SEQUENCE public.flights_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.flight_users TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.flight_data TO api;
GRANT USAGE ON SEQUENCE public.flight_data_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.api_endpoint_performances TO api;
GRANT USAGE ON SEQUENCE public.api_endpoint_performances_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.missions TO api;
GRANT USAGE ON SEQUENCE public.missions_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.tasks TO api;
GRANT USAGE ON SEQUENCE public.tasks_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.task_geo_objects TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.collision_object_coverage_areas TO api;
GRANT USAGE ON SEQUENCE public.collision_object_coverage_areas_id_seq TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.collision_object_geo_objects TO api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.live_share_keys TO api;
GRANT USAGE ON SEQUENCE public.live_share_keys_id_seq TO api;
