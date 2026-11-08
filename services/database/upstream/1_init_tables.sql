CREATE TABLE "users" (
  "id" serial PRIMARY KEY NOT NULL,
  "team_id" integer,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "email_hash" text NOT NULL,
  "password" text,
  "login_token" text,
  "session_token" text,
  "stream_token" text,
  "reset_code" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "state" integer NOT NULL DEFAULT 0,
  "locale" text NOT NULL DEFAULT 'en-US',
  "created_by_user_id" integer NOT NULL
);

CREATE TABLE "teams" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "owner_user_id" integer NOT NULL,
  "organisation_id" integer,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "state" integer NOT NULL DEFAULT 0,
  "logo_file_id" integer
);

CREATE TABLE "organisations" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "owner_user_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "state" integer NOT NULL DEFAULT 0,
  "logo_file_id" integer
);

CREATE TABLE "files" (
  "id" serial PRIMARY KEY NOT NULL,
  "workspace_id" integer,
  "ext" text NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "created_by" integer NOT NULL,
  "thumbnail_format" text,
  "thumbnail_generation_has_failed" boolean NOT NULL DEFAULT false,
  "exif_data" text,
  "exif_data_generation_has_failed" boolean NOT NULL DEFAULT false
);

CREATE TABLE "workspaces" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "longitude" float8 NOT NULL,
  "latitude" float8 NOT NULL,
  "owner_team_id" integer,
  "owner_organisation_id" integer,
  "created_by" integer NOT NULL
);

CREATE TABLE "workspace_permissions" (
  "team_id" integer NOT NULL,
  "workspace_id" integer NOT NULL,
  PRIMARY KEY ("team_id", "workspace_id")
);

CREATE TABLE "connections" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "secret" text NOT NULL,
  "session_token" text,
  "workspace_id" integer NOT NULL,
  "workspace_uuid" text UNIQUE NOT NULL,
  "remote_controller_id" integer,
  "last_drone_id" integer,
  "stream_is_alive" boolean NOT NULL DEFAULT false
);

CREATE TABLE "remote_controllers" (
  "id" serial PRIMARY KEY NOT NULL,
  "serial_number" text UNIQUE NOT NULL,
  "type" integer NOT NULL DEFAULT 0
);

CREATE TABLE "drones" (
  "id" serial PRIMARY KEY NOT NULL,
  "serial_number" text UNIQUE NOT NULL,
  "name" text NOT NULL,
  "type" integer NOT NULL DEFAULT 0,
  "last_connection_id" integer,
  "current_flight_id" integer,
  "in_flight" boolean NOT NULL DEFAULT false
);

CREATE TABLE "flights" (
  "id" serial PRIMARY KEY NOT NULL,
  "drone_id" integer NOT NULL,
  "workspace_id" integer NOT NULL,
  "started_at" timestamptz NOT NULL DEFAULT (now()),
  "landed_at" timestamptz,
  "ended_at" timestamptz,
  "is_created_manually" boolean NOT NULL DEFAULT false,
  "is_changed_manually" boolean NOT NULL DEFAULT false,
  "updated_by" integer
);

CREATE TABLE "flight_users" (
  "flight_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "type" integer NOT NULL,
  "created_by" integer NOT NULL,
  PRIMARY KEY ("flight_id", "user_id")
);

CREATE TABLE "flight_data" (
  "id" serial PRIMARY KEY NOT NULL,
  "flight_id" integer NOT NULL,
  "received_at" timestamptz NOT NULL DEFAULT (now()),
  "created_at" timestamptz NOT NULL,
  "type" integer NOT NULL,
  "data" jsonb NOT NULL
);

CREATE TABLE "remote_controller_data" (
  "id" serial PRIMARY KEY NOT NULL,
  "remote_controller_id" integer NOT NULL,
  "type" integer NOT NULL DEFAULT 0,
  "data" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "drone_data" (
  "id" serial PRIMARY KEY NOT NULL,
  "drone_id" integer NOT NULL,
  "flight_id" integer NOT NULL,
  "type" integer NOT NULL DEFAULT 0,
  "data" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "drone_media" (
  "id" serial PRIMARY KEY NOT NULL,
  "drone_id" integer NOT NULL,
  "flight_id" integer NOT NULL,
  "type" integer NOT NULL,
  "file_id" integer NOT NULL,
  "fingerprint" text NOT NULL,
  "tiny_fingerprint" text NOT NULL,
  "meta" text,
  "captured_at" timestamptz,
  "received_at" timestamptz NOT NULL DEFAULT (now()),
  "coverage" text,
  "coverage_generated_at" timestamptz NOT NULL DEFAULT (now()),
  "camera_location" text,
  "camera_angles" text
);

CREATE TABLE "geo_objects" (
  "id" serial PRIMARY KEY NOT NULL,
  "uuid" text UNIQUE NOT NULL DEFAULT (uuid_generate_v4()),
  "workspace_id" integer,
  "name" text NOT NULL,
  "type" integer NOT NULL,
  "sub_type" integer NOT NULL,
  "config" json NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "geom" geometry,
  "is_synced_with_dji" boolean NOT NULL DEFAULT false
);

CREATE TABLE "missions" (
  "id" serial PRIMARY KEY NOT NULL,
  "workspace_id" integer NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "notes" text,
  "created_by" integer NOT NULL,
  "updated_by" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "assigned_to_team_id" integer,
  "state" integer NOT NULL DEFAULT 0
);

CREATE TABLE "tasks" (
  "id" serial PRIMARY KEY NOT NULL,
  "mission_id" integer NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "notes" text,
  "created_by" integer NOT NULL,
  "updated_by" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "state" integer NOT NULL DEFAULT 0
);

CREATE TABLE "task_geo_objects" (
  "geo_object_id" integer NOT NULL,
  "task_id" integer NOT NULL,
  PRIMARY KEY ("geo_object_id", "task_id")
);

CREATE TABLE "collision_object_coverage_areas" (
  "id" serial PRIMARY KEY NOT NULL,
  "geom" geometry NOT NULL,
  "radius" float8 NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "collision_object_geo_objects" (
  "geo_object_id" integer NOT NULL,
  "coverage_area_id" integer NOT NULL
);

CREATE TABLE "live_share_keys" (
  "id" serial PRIMARY KEY NOT NULL,
  "key" text NOT NULL,
  "name" text,
  "connection_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "created_by" integer NOT NULL,
  "valid_until" timestamptz NOT NULL DEFAULT (now() + interval '1 day')
);

CREATE TABLE "api_endpoint_performances" (
  "id" serial PRIMARY KEY NOT NULL,
  "url_with_id_params" text NOT NULL,
  "endpoint" text NOT NULL,
  "http_method" text NOT NULL,
  "query" text,
  "run_time" numeric NOT NULL,
  "work_time" numeric NOT NULL,
  "started_at" timestamptz NOT NULL,
  "logged_at" timestamptz NOT NULL DEFAULT (now()),
  "status_code" integer NOT NULL,
  "content_length" integer NOT NULL
);

COMMENT ON COLUMN "users"."state" IS '0 = invited, 1 = live, 2 = locked, 3 = deleted';

COMMENT ON COLUMN "teams"."state" IS '0 = invited, 1 = live, 2 = locked, 3 = deleted';

COMMENT ON COLUMN "organisations"."state" IS '0 = invited, 1 = live, 2 = locked, 3 = deleted';

COMMENT ON TABLE "workspaces" IS '[TypescriptType]=

export type DBType_Workspace = DBType_Workspace_ForOrganisation | DBType_Workspace_ForTeam

export type DBType_Workspace_ForOrganisation = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    owner_organisation_id: number;
    created_by: number;
}

export type DBType_Workspace_ForTeam = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    owner_team_id: number;
    created_by: number;
}
';

COMMENT ON COLUMN "remote_controllers"."type" IS '0 = unknown, 1 = dji rc plus, 2 = dji rc pro enterprise, 3 = dji rc plus 2, 4 = dji smart controller';

COMMENT ON COLUMN "drones"."type" IS '0 = unknown, 1 = dji matrice 300, 2 = dji matrice 30, 3 = dji matrice 350, 4 = dji mavic 3';

COMMENT ON COLUMN "flight_users"."type" IS '0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring';

COMMENT ON COLUMN "flight_data"."type" IS '0 = position';

COMMENT ON COLUMN "remote_controller_data"."type" IS '0 = position';

COMMENT ON COLUMN "drone_data"."type" IS '0 = position, 1 = telemetry';

COMMENT ON COLUMN "drone_media"."type" IS '0 = video, 1 = picture, 2 = panorama';

COMMENT ON TABLE "geo_objects" IS '[TypescriptType]=

export type DBType_Geo_Object = DBType_Geo_Object_Base<0, 0> | DBType_Geo_Object_Base<0, 1> | DBType_Geo_Object_Base<0, 2> | DBType_Geo_Object_Base<0, 3> |
DBType_Geo_Object_Base<1, 0> | DBType_Geo_Object_Base<1, 1> | DBType_Geo_Object_Base<1, 2> | DBType_Geo_Object_Base<1, 3> | DBType_Geo_Object_Base<1, 4> |
DBType_Geo_Object_Base<2, 0> | DBType_Geo_Object_Base<2, 1> | DBType_Geo_Object_Base<2, 2> | DBType_Geo_Object_Base<2, 3> | DBType_Geo_Object_Base<2, 4> | DBType_Geo_Object_Base<2, 5> | DBType_Geo_Object_Base<2, 6> |
DBType_Geo_Object_Base<3, 0> | DBType_Geo_Object_Base<3, 1> | DBType_Geo_Object_Base<3, 2> | DBType_Geo_Object_Base<3, 3> | DBType_Geo_Object_Base<3, 4> | DBType_Geo_Object_Base<3, 5> | DBType_Geo_Object_Base<3, 6>

export type DBType_Geo_Object_Base<type extends DBType_Geo_Object_TypeType, sub_type extends DBType_Geo_Object_SubTypeType<type>> = {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    type: type;
    sub_type: sub_type;
    config: DBType_Geo_Object_ConfigType<type, sub_type>;
    created_at: string;
    updated_at: string;
    is_synced_with_dji: boolean;
    geom: ST_Geometry
}


export type DBType_Geo_Object_TypeType = 0|1|2|3

export const DBType_Geo_Object_Type_TYPES = {
  marking: 0,
  traffic: 1,
  unit: 2,
  collision: 3
} as const

export type DBType_Geo_Object_SubTypeType<type extends DBType_Geo_Object_TypeType> =
    type extends 0 ? (0|1|2|3) :
    type extends 1 ? (0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15) :
    type extends 2 ? (0|1|2|3|4|5|6) :
    type extends 3 ? (0|1|2|3|4|5|6) : unknown


export const DBType_Geo_Object_SubType_TYPES = {
  marking: {
    point: 0,
    line: 1,
    polygon: 2,
    circle: 3
  },
  traffic: {
    other: 0,
    moto_glider: 1,
    tow_plane: 2,
    helicopter: 3,
    parachute: 4,
    drop_plane: 5,
    hang_glider: 6,
    para_glider: 7,
    powered_aircraft: 8,
    jet_aicraft: 9,
    ufo: 10,
    balloon: 11,
    airship: 12,
    uav: 13,
    ground_support: 14,
    static_object: 15
  },
  unit: {
    airplane: 0,
    helicopter: 1,
    uav: 2,
    pilot: 3,
    ground_vehicle: 4,
    ground_staff: 5,
    other: 6
  },
  collision: {
    power_tower: 0,
    power_pole: 1,
    power_line_large: 2,
    power_line_small_or_catenary: 3,
    aerialway_pylon: 4,
    aerialway: 5,
    building: 6
  }
} as const

export type DBType_Geo_Object_ConfigType<type extends DBType_Geo_Object_TypeType, sub_type extends DBType_Geo_Object_SubTypeType<type>> = type extends 0 ? (
    sub_type extends 0 ? {point: [number, number, number], color: string} :
    sub_type extends 1 ? {line: [number, number, number][], color: string} :
    sub_type extends 2 ? {polygon: [number, number, number][], color: string} :
    sub_type extends 3 ? {center: [number, number, number], radius: number, color: string} : unknown
) : type extends 1 ? (
    {longitude: number, latitude: number, height: number, heading?: number, speed?: number}
) : type extends 2 ? (
    {longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number}
) : type extends 3 ? (
    sub_type extends 0 ? {id: number, point: [number, number, number]} :
    sub_type extends 1 ? {id: number, point: [number, number, number]} :
    sub_type extends 2 ? {id: number, line: [number, number, number][]} :
    sub_type extends 3 ? {id: number, line: [number, number, number][]} :
    sub_type extends 4 ? {id: number, point: [number, number, number]} :
    sub_type extends 5 ? {id: number, line: [number, number, number][]} :
    sub_type extends 6 ? {id: number, polygon: [number, number, number][]} : unknown
) : unknown

  ';

COMMENT ON COLUMN "missions"."state" IS '0 = planned, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled';

COMMENT ON COLUMN "tasks"."state" IS '0 = planned, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled';

COMMENT ON TABLE "collision_object_coverage_areas" IS '[TypescriptType]=

export type DBType_Collision_Object_Coverage_Area = {
    id: number;
    geom: ST_Point;
    radius: number;
    created_at: string;
    updated_at: string;
}
';

ALTER TABLE "users" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "users" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "teams" ADD FOREIGN KEY ("owner_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "teams" ADD FOREIGN KEY ("organisation_id") REFERENCES "organisations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "teams" ADD FOREIGN KEY ("logo_file_id") REFERENCES "files" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "organisations" ADD FOREIGN KEY ("owner_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "organisations" ADD FOREIGN KEY ("logo_file_id") REFERENCES "files" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "files" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "files" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "workspaces" ADD FOREIGN KEY ("owner_organisation_id") REFERENCES "organisations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "workspaces" ADD FOREIGN KEY ("owner_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "workspaces" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "workspace_permissions" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "workspace_permissions" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "connections" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "connections" ADD FOREIGN KEY ("remote_controller_id") REFERENCES "remote_controllers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "connections" ADD FOREIGN KEY ("last_drone_id") REFERENCES "drones" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drones" ADD FOREIGN KEY ("last_connection_id") REFERENCES "connections" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drones" ADD FOREIGN KEY ("current_flight_id") REFERENCES "flights" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flights" ADD FOREIGN KEY ("drone_id") REFERENCES "drones" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flights" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flights" ADD FOREIGN KEY ("updated_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flight_users" ADD FOREIGN KEY ("flight_id") REFERENCES "flights" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flight_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flight_users" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "flight_data" ADD FOREIGN KEY ("flight_id") REFERENCES "flights" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "remote_controller_data" ADD FOREIGN KEY ("remote_controller_id") REFERENCES "remote_controllers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drone_data" ADD FOREIGN KEY ("drone_id") REFERENCES "drones" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drone_data" ADD FOREIGN KEY ("flight_id") REFERENCES "flights" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drone_media" ADD FOREIGN KEY ("drone_id") REFERENCES "drones" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drone_media" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drone_media" ADD FOREIGN KEY ("flight_id") REFERENCES "flights" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "geo_objects" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "missions" ADD FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "missions" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "missions" ADD FOREIGN KEY ("assigned_to_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "missions" ADD FOREIGN KEY ("updated_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tasks" ADD FOREIGN KEY ("mission_id") REFERENCES "missions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tasks" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tasks" ADD FOREIGN KEY ("updated_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "task_geo_objects" ADD FOREIGN KEY ("geo_object_id") REFERENCES "geo_objects" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "task_geo_objects" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "collision_object_geo_objects" ADD FOREIGN KEY ("geo_object_id") REFERENCES "geo_objects" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "collision_object_geo_objects" ADD FOREIGN KEY ("coverage_area_id") REFERENCES "collision_object_coverage_areas" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "live_share_keys" ADD FOREIGN KEY ("connection_id") REFERENCES "connections" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "live_share_keys" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
