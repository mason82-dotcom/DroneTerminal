\set ON_ERROR_STOP on
BEGIN;

-- CI fixtures only. All identifiers are synthetic and refer to no real user/device.
INSERT INTO public.users
  (id, name, email, email_hash, password, state, locale, created_by_user_id)
VALUES
  (7001, 'Synthetic Lab Pilot', 'lab-pilot@example.invalid', 'lab-hash-7001', NULL, 1, 'en-US', 7001),
  (7002, 'Synthetic Other User', 'other-user@example.invalid', 'lab-hash-7002', NULL, 1, 'en-US', 7002);

INSERT INTO public.teams (id, name, owner_user_id, state)
VALUES
  (7301, 'Lab Team A', 7001, 1),
  (7302, 'Lab Team B', 7002, 1);

UPDATE public.users SET team_id = 7301 WHERE id = 7001;
UPDATE public.users SET team_id = 7302 WHERE id = 7002;

INSERT INTO public.workspaces
  (id, name, longitude, latitude, owner_team_id, created_by)
VALUES
  (7401, 'Visible Synthetic Workspace', 8.4, 49.1, 7301, 7001),
  (7402, 'Hidden Synthetic Workspace', 8.5, 49.2, 7302, 7002);

INSERT INTO public.workspace_permissions (team_id, workspace_id)
VALUES (7301, 7401), (7302, 7402);

COMMIT;

-- Read-only API account. Its password is generated per CI run.
SELECT format('CREATE ROLE dt_lab_reader LOGIN PASSWORD %L', :'reader_password') \gexec
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO dt_lab_reader;
GRANT SELECT ON public.users, public.workspaces, public.workspace_permissions TO dt_lab_reader;
ALTER ROLE dt_lab_reader SET default_transaction_read_only = on;
