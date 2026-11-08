import * as pgp from 'pg-promise'
//@ts-ignore
const db : pgp.IDatabase<any> = global.db

import { ST_Geometry } from '../../util/postgis';



    export function replaceGeometryWithParsed(rows: any[], originalColumn: string, geoJsonColumn: string){
        for(const row of rows){
            row[originalColumn] = ST_Geometry.fromGeoJSON(JSON.parse(row[geoJsonColumn]))
            delete row[geoJsonColumn]
        }
    }
    


//users

import {DBType_User_StateType} from "./DBTypes";

export type DBInsert_User = {
    team_id?: number
    name: string
    email: string
    email_hash: string
    password?: string
    login_token?: string
    session_token?: string
    stream_token?: string
    reset_code?: string
    created_at?: string
    state?: DBType_User_StateType
    locale?: string
    created_by_user_id: number
}

export type DBUpdate_User = {
    team_id?: number
    name?: string
    email?: string
    email_hash?: string
    password?: string
    login_token?: string
    session_token?: string
    stream_token?: string
    reset_code?: string
    created_at?: string
    state?: DBType_User_StateType
    locale?: string
    created_by_user_id?: number
}
const COLUMN_SET_USERS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name"
    },
    {
        "name": "email"
    },
    {
        "name": "email_hash"
    },
    {
        "name": "password",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "login_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "session_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "stream_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "reset_code",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "locale",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by_user_id"
    }
], {table: "users"})

const COLUMN_SET_USERS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "email",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "email_hash",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "password",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "login_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "session_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "stream_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "reset_code",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "locale",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by_user_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "users"})
import {DBType_User} from './DBTypes'


    export async function insert_User(values: DBInsert_User){
        const ret = await db.one<DBType_User>(db.$config.pgp.helpers.insert(values, undefined, 'users') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_User<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_User): Promise<T extends number ? false | DBType_User : DBType_User[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_User>(db.$config.pgp.helpers.update(values,  COLUMN_SET_USERS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_User>(db.$config.pgp.helpers.update(values,  COLUMN_SET_USERS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_User<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_User : DBType_User[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_User>('DELETE FROM users WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_User>('DELETE FROM users ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_User<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_User : DBType_User[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_User>('SELECT * FROM users ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_User>('SELECT * FROM users ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//teams

import {DBType_Team_StateType} from "./DBTypes";

export type DBInsert_Team = {
    name: string
    owner_user_id: number
    organisation_id?: number
    created_at?: string
    state?: DBType_Team_StateType
    logo_file_id?: number
}

export type DBUpdate_Team = {
    name?: string
    owner_user_id?: number
    organisation_id?: number
    created_at?: string
    state?: DBType_Team_StateType
    logo_file_id?: number
}
const COLUMN_SET_TEAMS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "name"
    },
    {
        "name": "owner_user_id"
    },
    {
        "name": "organisation_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "logo_file_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "teams"})

const COLUMN_SET_TEAMS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "owner_user_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "organisation_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "logo_file_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "teams"})
import {DBType_Team} from './DBTypes'


    export async function insert_Team(values: DBInsert_Team){
        const ret = await db.one<DBType_Team>(db.$config.pgp.helpers.insert(values, undefined, 'teams') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Team<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Team): Promise<T extends number ? false | DBType_Team : DBType_Team[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Team>(db.$config.pgp.helpers.update(values,  COLUMN_SET_TEAMS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Team>(db.$config.pgp.helpers.update(values,  COLUMN_SET_TEAMS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Team<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Team : DBType_Team[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Team>('DELETE FROM teams WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Team>('DELETE FROM teams ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Team<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Team : DBType_Team[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Team>('SELECT * FROM teams ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Team>('SELECT * FROM teams ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//organisations

import {DBType_Organisation_StateType} from "./DBTypes";

export type DBInsert_Organisation = {
    name: string
    owner_user_id: number
    created_at?: string
    state?: DBType_Organisation_StateType
    logo_file_id?: number
}

export type DBUpdate_Organisation = {
    name?: string
    owner_user_id?: number
    created_at?: string
    state?: DBType_Organisation_StateType
    logo_file_id?: number
}
const COLUMN_SET_ORGANISATIONS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "name"
    },
    {
        "name": "owner_user_id"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "logo_file_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "organisations"})

const COLUMN_SET_ORGANISATIONS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "owner_user_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "logo_file_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "organisations"})
import {DBType_Organisation} from './DBTypes'


    export async function insert_Organisation(values: DBInsert_Organisation){
        const ret = await db.one<DBType_Organisation>(db.$config.pgp.helpers.insert(values, undefined, 'organisations') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Organisation<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Organisation): Promise<T extends number ? false | DBType_Organisation : DBType_Organisation[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Organisation>(db.$config.pgp.helpers.update(values,  COLUMN_SET_ORGANISATIONS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Organisation>(db.$config.pgp.helpers.update(values,  COLUMN_SET_ORGANISATIONS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Organisation<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Organisation : DBType_Organisation[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Organisation>('DELETE FROM organisations WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Organisation>('DELETE FROM organisations ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Organisation<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Organisation : DBType_Organisation[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Organisation>('SELECT * FROM organisations ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Organisation>('SELECT * FROM organisations ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//files

import {} from "./DBTypes";

export type DBInsert_File = {
    workspace_id?: number
    ext: string
    name: string
    created_at?: string
    created_by: number
    thumbnail_format?: string
    thumbnail_generation_has_failed?: boolean
    exif_data?: string
    exif_data_generation_has_failed?: boolean
}

export type DBUpdate_File = {
    workspace_id?: number
    ext?: string
    name?: string
    created_at?: string
    created_by?: number
    thumbnail_format?: string
    thumbnail_generation_has_failed?: boolean
    exif_data?: string
    exif_data_generation_has_failed?: boolean
}
const COLUMN_SET_FILES = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "ext"
    },
    {
        "name": "name"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by"
    },
    {
        "name": "thumbnail_format",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "thumbnail_generation_has_failed",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "exif_data",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "exif_data_generation_has_failed",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "files"})

const COLUMN_SET_FILES_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "ext",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "thumbnail_format",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "thumbnail_generation_has_failed",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "exif_data",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "exif_data_generation_has_failed",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "files"})
import {DBType_File} from './DBTypes'


    export async function insert_File(values: DBInsert_File){
        const ret = await db.one<DBType_File>(db.$config.pgp.helpers.insert(values, undefined, 'files') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_File<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_File): Promise<T extends number ? false | DBType_File : DBType_File[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_File>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FILES_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_File>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FILES_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_File<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_File : DBType_File[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_File>('DELETE FROM files WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_File>('DELETE FROM files ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_File<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_File : DBType_File[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_File>('SELECT * FROM files ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_File>('SELECT * FROM files ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//workspaces

import {} from "./DBTypes";

export type DBInsert_Workspace = {
    name: string
    longitude: number
    latitude: number
    owner_team_id?: number
    owner_organisation_id?: number
    created_by: number
}

export type DBUpdate_Workspace = {
    name?: string
    longitude?: number
    latitude?: number
    owner_team_id?: number
    owner_organisation_id?: number
    created_by?: number
}
const COLUMN_SET_WORKSPACES = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "name"
    },
    {
        "name": "longitude"
    },
    {
        "name": "latitude"
    },
    {
        "name": "owner_team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "owner_organisation_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by"
    }
], {table: "workspaces"})

const COLUMN_SET_WORKSPACES_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "longitude",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "latitude",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "owner_team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "owner_organisation_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "workspaces"})
import {DBType_Workspace} from './DBTypes'


    export async function insert_Workspace(values: DBInsert_Workspace){
        const ret = await db.one<DBType_Workspace>(db.$config.pgp.helpers.insert(values, undefined, 'workspaces') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Workspace<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Workspace): Promise<T extends number ? false | DBType_Workspace : DBType_Workspace[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Workspace>(db.$config.pgp.helpers.update(values,  COLUMN_SET_WORKSPACES_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Workspace>(db.$config.pgp.helpers.update(values,  COLUMN_SET_WORKSPACES_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Workspace<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Workspace : DBType_Workspace[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Workspace>('DELETE FROM workspaces WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Workspace>('DELETE FROM workspaces ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Workspace<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Workspace : DBType_Workspace[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Workspace>('SELECT * FROM workspaces ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Workspace>('SELECT * FROM workspaces ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//workspace_permissions

import {} from "./DBTypes";

export type DBInsert_Workspace_Permission = {
    team_id: number
    workspace_id: number
}

export type DBUpdate_Workspace_Permission = {
    team_id?: number
    workspace_id?: number
}
const COLUMN_SET_WORKSPACE_PERMISSIONS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "team_id"
    },
    {
        "name": "workspace_id"
    }
], {table: "workspace_permissions"})

const COLUMN_SET_WORKSPACE_PERMISSIONS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "workspace_permissions"})
import {DBType_Workspace_Permission} from './DBTypes'


    export async function insert_Workspace_Permission(values: DBInsert_Workspace_Permission){
        const ret = await db.one<DBType_Workspace_Permission>(db.$config.pgp.helpers.insert(values, undefined, 'workspace_permissions') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Workspace_Permission<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Workspace_Permission): Promise<T extends number ? false | DBType_Workspace_Permission : DBType_Workspace_Permission[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Workspace_Permission>(db.$config.pgp.helpers.update(values,  COLUMN_SET_WORKSPACE_PERMISSIONS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Workspace_Permission>(db.$config.pgp.helpers.update(values,  COLUMN_SET_WORKSPACE_PERMISSIONS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Workspace_Permission<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Workspace_Permission : DBType_Workspace_Permission[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Workspace_Permission>('DELETE FROM workspace_permissions WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Workspace_Permission>('DELETE FROM workspace_permissions ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }


//connections

import {} from "./DBTypes";

export type DBInsert_Connection = {
    name: string
    secret: string
    session_token?: string
    workspace_id: number
    workspace_uuid: string
    remote_controller_id?: number
    last_drone_id?: number
    stream_is_alive?: boolean
}

export type DBUpdate_Connection = {
    name?: string
    secret?: string
    session_token?: string
    workspace_id?: number
    workspace_uuid?: string
    remote_controller_id?: number
    last_drone_id?: number
    stream_is_alive?: boolean
}
const COLUMN_SET_CONNECTIONS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "name"
    },
    {
        "name": "secret"
    },
    {
        "name": "session_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id"
    },
    {
        "name": "workspace_uuid"
    },
    {
        "name": "remote_controller_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "last_drone_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "stream_is_alive",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "connections"})

const COLUMN_SET_CONNECTIONS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "secret",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "session_token",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_uuid",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "remote_controller_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "last_drone_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "stream_is_alive",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "connections"})
import {DBType_Connection} from './DBTypes'


    export async function insert_Connection(values: DBInsert_Connection){
        const ret = await db.one<DBType_Connection>(db.$config.pgp.helpers.insert(values, undefined, 'connections') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Connection<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Connection): Promise<T extends number ? false | DBType_Connection : DBType_Connection[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Connection>(db.$config.pgp.helpers.update(values,  COLUMN_SET_CONNECTIONS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Connection>(db.$config.pgp.helpers.update(values,  COLUMN_SET_CONNECTIONS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Connection<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Connection : DBType_Connection[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Connection>('DELETE FROM connections WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Connection>('DELETE FROM connections ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Connection<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Connection : DBType_Connection[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Connection>('SELECT * FROM connections ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Connection>('SELECT * FROM connections ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//remote_controllers

import {DBType_Remote_Controller_TypeType} from "./DBTypes";

export type DBInsert_Remote_Controller = {
    serial_number: string
    type?: DBType_Remote_Controller_TypeType
}

export type DBUpdate_Remote_Controller = {
    serial_number?: string
    type?: DBType_Remote_Controller_TypeType
}
const COLUMN_SET_REMOTE_CONTROLLERS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "serial_number"
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "remote_controllers"})

const COLUMN_SET_REMOTE_CONTROLLERS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "serial_number",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "remote_controllers"})
import {DBType_Remote_Controller} from './DBTypes'


    export async function insert_Remote_Controller(values: DBInsert_Remote_Controller){
        const ret = await db.one<DBType_Remote_Controller>(db.$config.pgp.helpers.insert(values, undefined, 'remote_controllers') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Remote_Controller<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Remote_Controller): Promise<T extends number ? false | DBType_Remote_Controller : DBType_Remote_Controller[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Remote_Controller>(db.$config.pgp.helpers.update(values,  COLUMN_SET_REMOTE_CONTROLLERS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Remote_Controller>(db.$config.pgp.helpers.update(values,  COLUMN_SET_REMOTE_CONTROLLERS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Remote_Controller<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Remote_Controller : DBType_Remote_Controller[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Remote_Controller>('DELETE FROM remote_controllers WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Remote_Controller>('DELETE FROM remote_controllers ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Remote_Controller<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Remote_Controller : DBType_Remote_Controller[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Remote_Controller>('SELECT * FROM remote_controllers ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Remote_Controller>('SELECT * FROM remote_controllers ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//drones

import {DBType_Drone_TypeType} from "./DBTypes";

export type DBInsert_Drone = {
    serial_number: string
    name: string
    type?: DBType_Drone_TypeType
    last_connection_id?: number
    current_flight_id?: number
    in_flight?: boolean
}

export type DBUpdate_Drone = {
    serial_number?: string
    name?: string
    type?: DBType_Drone_TypeType
    last_connection_id?: number
    current_flight_id?: number
    in_flight?: boolean
}
const COLUMN_SET_DRONES = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "serial_number"
    },
    {
        "name": "name"
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "last_connection_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "current_flight_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "in_flight",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "drones"})

const COLUMN_SET_DRONES_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "serial_number",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "last_connection_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "current_flight_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "in_flight",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "drones"})
import {DBType_Drone} from './DBTypes'


    export async function insert_Drone(values: DBInsert_Drone){
        const ret = await db.one<DBType_Drone>(db.$config.pgp.helpers.insert(values, undefined, 'drones') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Drone<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Drone): Promise<T extends number ? false | DBType_Drone : DBType_Drone[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Drone>(db.$config.pgp.helpers.update(values,  COLUMN_SET_DRONES_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Drone>(db.$config.pgp.helpers.update(values,  COLUMN_SET_DRONES_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Drone<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Drone : DBType_Drone[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Drone>('DELETE FROM drones WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Drone>('DELETE FROM drones ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Drone<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Drone : DBType_Drone[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Drone>('SELECT * FROM drones ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Drone>('SELECT * FROM drones ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//flights

import {} from "./DBTypes";

export type DBInsert_Flight = {
    drone_id: number
    workspace_id: number
    started_at?: string
    landed_at?: string
    ended_at?: string
    is_created_manually?: boolean
    is_changed_manually?: boolean
    updated_by?: number
}

export type DBUpdate_Flight = {
    drone_id?: number
    workspace_id?: number
    started_at?: string
    landed_at?: string
    ended_at?: string
    is_created_manually?: boolean
    is_changed_manually?: boolean
    updated_by?: number
}
const COLUMN_SET_FLIGHTS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "drone_id"
    },
    {
        "name": "workspace_id"
    },
    {
        "name": "started_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "landed_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "ended_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "is_created_manually",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "is_changed_manually",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_by",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "flights"})

const COLUMN_SET_FLIGHTS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "drone_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "started_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "landed_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "ended_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "is_created_manually",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "is_changed_manually",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_by",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "flights"})
import {DBType_Flight} from './DBTypes'


    export async function insert_Flight(values: DBInsert_Flight){
        const ret = await db.one<DBType_Flight>(db.$config.pgp.helpers.insert(values, undefined, 'flights') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Flight<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Flight): Promise<T extends number ? false | DBType_Flight : DBType_Flight[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Flight>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FLIGHTS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Flight>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FLIGHTS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Flight<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Flight : DBType_Flight[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Flight>('DELETE FROM flights WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Flight>('DELETE FROM flights ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Flight<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Flight : DBType_Flight[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Flight>('SELECT * FROM flights ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Flight>('SELECT * FROM flights ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//flight_users

import {DBType_Flight_User_TypeType} from "./DBTypes";

export type DBInsert_Flight_User = {
    flight_id: number
    user_id: number
    type: DBType_Flight_User_TypeType
    created_by: number
}

export type DBUpdate_Flight_User = {
    flight_id?: number
    user_id?: number
    type?: DBType_Flight_User_TypeType
    created_by?: number
}
const COLUMN_SET_FLIGHT_USERS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "flight_id"
    },
    {
        "name": "user_id"
    },
    {
        "name": "type"
    },
    {
        "name": "created_by"
    }
], {table: "flight_users"})

const COLUMN_SET_FLIGHT_USERS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "flight_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "user_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "flight_users"})
import {DBType_Flight_User} from './DBTypes'


    export async function insert_Flight_User(values: DBInsert_Flight_User){
        const ret = await db.one<DBType_Flight_User>(db.$config.pgp.helpers.insert(values, undefined, 'flight_users') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Flight_User<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Flight_User): Promise<T extends number ? false | DBType_Flight_User : DBType_Flight_User[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Flight_User>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FLIGHT_USERS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Flight_User>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FLIGHT_USERS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Flight_User<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Flight_User : DBType_Flight_User[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Flight_User>('DELETE FROM flight_users WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Flight_User>('DELETE FROM flight_users ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }


//flight_data

import {DBType_Flight_Data_TypeType} from "./DBTypes";

export type DBInsert_Flight_Data = {
    flight_id: number
    received_at?: string
    created_at: string
    type: DBType_Flight_Data_TypeType
    data: object
}

export type DBUpdate_Flight_Data = {
    flight_id?: number
    received_at?: string
    created_at?: string
    type?: DBType_Flight_Data_TypeType
    data?: object
}
const COLUMN_SET_FLIGHT_DATA = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "flight_id"
    },
    {
        "name": "received_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at"
    },
    {
        "name": "type"
    },
    {
        "name": "data"
    }
], {table: "flight_data"})

const COLUMN_SET_FLIGHT_DATA_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "flight_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "received_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "data",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "flight_data"})
import {DBType_Flight_Data} from './DBTypes'


    export async function insert_Flight_Data(values: DBInsert_Flight_Data){
        const ret = await db.one<DBType_Flight_Data>(db.$config.pgp.helpers.insert(values, undefined, 'flight_data') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Flight_Data<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Flight_Data): Promise<T extends number ? false | DBType_Flight_Data : DBType_Flight_Data[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Flight_Data>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FLIGHT_DATA_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Flight_Data>(db.$config.pgp.helpers.update(values,  COLUMN_SET_FLIGHT_DATA_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Flight_Data<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Flight_Data : DBType_Flight_Data[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Flight_Data>('DELETE FROM flight_data WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Flight_Data>('DELETE FROM flight_data ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Flight_Data<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Flight_Data : DBType_Flight_Data[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Flight_Data>('SELECT * FROM flight_data ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Flight_Data>('SELECT * FROM flight_data ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//remote_controller_data

import {DBType_Remote_Controller_Data_TypeType} from "./DBTypes";

export type DBInsert_Remote_Controller_Data = {
    remote_controller_id: number
    type?: DBType_Remote_Controller_Data_TypeType
    data: object
    created_at?: string
}

export type DBUpdate_Remote_Controller_Data = {
    remote_controller_id?: number
    type?: DBType_Remote_Controller_Data_TypeType
    data?: object
    created_at?: string
}
const COLUMN_SET_REMOTE_CONTROLLER_DATA = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "remote_controller_id"
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "data"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "remote_controller_data"})

const COLUMN_SET_REMOTE_CONTROLLER_DATA_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "remote_controller_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "data",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "remote_controller_data"})
import {DBType_Remote_Controller_Data} from './DBTypes'


    export async function insert_Remote_Controller_Data(values: DBInsert_Remote_Controller_Data){
        const ret = await db.one<DBType_Remote_Controller_Data>(db.$config.pgp.helpers.insert(values, undefined, 'remote_controller_data') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Remote_Controller_Data<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Remote_Controller_Data): Promise<T extends number ? false | DBType_Remote_Controller_Data : DBType_Remote_Controller_Data[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Remote_Controller_Data>(db.$config.pgp.helpers.update(values,  COLUMN_SET_REMOTE_CONTROLLER_DATA_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Remote_Controller_Data>(db.$config.pgp.helpers.update(values,  COLUMN_SET_REMOTE_CONTROLLER_DATA_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Remote_Controller_Data<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Remote_Controller_Data : DBType_Remote_Controller_Data[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Remote_Controller_Data>('DELETE FROM remote_controller_data WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Remote_Controller_Data>('DELETE FROM remote_controller_data ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Remote_Controller_Data<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Remote_Controller_Data : DBType_Remote_Controller_Data[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Remote_Controller_Data>('SELECT * FROM remote_controller_data ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Remote_Controller_Data>('SELECT * FROM remote_controller_data ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//drone_data

import {DBType_Drone_Data_TypeType} from "./DBTypes";

export type DBInsert_Drone_Data = {
    drone_id: number
    flight_id: number
    type?: DBType_Drone_Data_TypeType
    data: object
    created_at?: string
}

export type DBUpdate_Drone_Data = {
    drone_id?: number
    flight_id?: number
    type?: DBType_Drone_Data_TypeType
    data?: object
    created_at?: string
}
const COLUMN_SET_DRONE_DATA = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "drone_id"
    },
    {
        "name": "flight_id"
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "data"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "drone_data"})

const COLUMN_SET_DRONE_DATA_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "drone_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "flight_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "data",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "drone_data"})
import {DBType_Drone_Data} from './DBTypes'


    export async function insert_Drone_Data(values: DBInsert_Drone_Data){
        const ret = await db.one<DBType_Drone_Data>(db.$config.pgp.helpers.insert(values, undefined, 'drone_data') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Drone_Data<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Drone_Data): Promise<T extends number ? false | DBType_Drone_Data : DBType_Drone_Data[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Drone_Data>(db.$config.pgp.helpers.update(values,  COLUMN_SET_DRONE_DATA_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Drone_Data>(db.$config.pgp.helpers.update(values,  COLUMN_SET_DRONE_DATA_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Drone_Data<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Drone_Data : DBType_Drone_Data[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Drone_Data>('DELETE FROM drone_data WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Drone_Data>('DELETE FROM drone_data ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Drone_Data<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Drone_Data : DBType_Drone_Data[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Drone_Data>('SELECT * FROM drone_data ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Drone_Data>('SELECT * FROM drone_data ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//drone_media

import {DBType_Drone_Media_TypeType} from "./DBTypes";

export type DBInsert_Drone_Media = {
    drone_id: number
    flight_id: number
    type: DBType_Drone_Media_TypeType
    file_id: number
    fingerprint: string
    tiny_fingerprint: string
    meta?: string
    captured_at?: string
    received_at?: string
    coverage?: string
    coverage_generated_at?: string
    camera_location?: string
    camera_angles?: string
}

export type DBUpdate_Drone_Media = {
    drone_id?: number
    flight_id?: number
    type?: DBType_Drone_Media_TypeType
    file_id?: number
    fingerprint?: string
    tiny_fingerprint?: string
    meta?: string
    captured_at?: string
    received_at?: string
    coverage?: string
    coverage_generated_at?: string
    camera_location?: string
    camera_angles?: string
}
const COLUMN_SET_DRONE_MEDIA = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "drone_id"
    },
    {
        "name": "flight_id"
    },
    {
        "name": "type"
    },
    {
        "name": "file_id"
    },
    {
        "name": "fingerprint"
    },
    {
        "name": "tiny_fingerprint"
    },
    {
        "name": "meta",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "captured_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "received_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "coverage",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "coverage_generated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "camera_location",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "camera_angles",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "drone_media"})

const COLUMN_SET_DRONE_MEDIA_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "drone_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "flight_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "file_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "fingerprint",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "tiny_fingerprint",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "meta",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "captured_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "received_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "coverage",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "coverage_generated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "camera_location",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "camera_angles",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "drone_media"})
import {DBType_Drone_Media} from './DBTypes'


    export async function insert_Drone_Media(values: DBInsert_Drone_Media){
        const ret = await db.one<DBType_Drone_Media>(db.$config.pgp.helpers.insert(values, undefined, 'drone_media') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Drone_Media<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Drone_Media): Promise<T extends number ? false | DBType_Drone_Media : DBType_Drone_Media[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Drone_Media>(db.$config.pgp.helpers.update(values,  COLUMN_SET_DRONE_MEDIA_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Drone_Media>(db.$config.pgp.helpers.update(values,  COLUMN_SET_DRONE_MEDIA_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Drone_Media<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Drone_Media : DBType_Drone_Media[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Drone_Media>('DELETE FROM drone_media WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Drone_Media>('DELETE FROM drone_media ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Drone_Media<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Drone_Media : DBType_Drone_Media[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Drone_Media>('SELECT * FROM drone_media ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Drone_Media>('SELECT * FROM drone_media ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//geo_objects

import {} from "./DBTypes";

export type DBInsert_Geo_Object = {
    uuid?: string
    workspace_id?: number
    name: string
    type: number
    sub_type: number
    config: object
    created_at?: string
    updated_at?: string
    geom: ST_Geometry
    is_synced_with_dji?: boolean
}

export type DBUpdate_Geo_Object = {
    uuid?: string
    workspace_id?: number
    name?: string
    type?: number
    sub_type?: number
    config?: object
    created_at?: string
    updated_at?: string
    geom?: ST_Geometry
    is_synced_with_dji?: boolean
}
const COLUMN_SET_GEO_OBJECTS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "uuid",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name"
    },
    {
        "name": "type"
    },
    {
        "name": "sub_type"
    },
    {
        "name": "config"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "geom",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "is_synced_with_dji",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "geo_objects"})

const COLUMN_SET_GEO_OBJECTS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "uuid",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "sub_type",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "config",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "geom",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "is_synced_with_dji",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "geo_objects"})
import {DBType_Geo_Object} from './DBTypes'


    export async function insert_Geo_Object(values: DBInsert_Geo_Object){
        const ret = await db.one<DBType_Geo_Object>(db.$config.pgp.helpers.insert(values, undefined, 'geo_objects') + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

        replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Geo_Object<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Geo_Object): Promise<T extends number ? false | DBType_Geo_Object : DBType_Geo_Object[]>{

        if(!values.updated_at){values.updated_at = new Date().toISOString()}

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Geo_Object>(db.$config.pgp.helpers.update(values,  COLUMN_SET_GEO_OBJECTS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

            if(!ret){
                //@ts-ignore
                return false
            }

            replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Geo_Object>(db.$config.pgp.helpers.update(values,  COLUMN_SET_GEO_OBJECTS_UPDATE) + ' ' + whereCondition + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

            replaceGeometryWithParsed(ret, 'geom', 'geom_parsed')

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Geo_Object<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Geo_Object : DBType_Geo_Object[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Geo_Object>('DELETE FROM geo_objects WHERE id = ${id} RETURNING *, ST_AsGeoJSON(geom) as geom_parsed', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Geo_Object>('DELETE FROM geo_objects ' + whereCondition + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

            replaceGeometryWithParsed(ret, 'geom', 'geom_parsed')

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Geo_Object<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Geo_Object : DBType_Geo_Object[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Geo_Object>('SELECT *, ST_AsGeoJSON(geom) as geom_parsed FROM geo_objects ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Geo_Object>('SELECT *, ST_AsGeoJSON(geom) as geom_parsed FROM geo_objects ' + whereCondition)

                replaceGeometryWithParsed(ret, 'geom', 'geom_parsed')

                //@ts-ignore
                return ret
            }

        }


//missions

import {DBType_Mission_StateType} from "./DBTypes";

export type DBInsert_Mission = {
    workspace_id: number
    name: string
    description?: string
    notes?: string
    created_by: number
    updated_by: number
    created_at?: string
    updated_at?: string
    assigned_to_team_id?: number
    state?: DBType_Mission_StateType
}

export type DBUpdate_Mission = {
    workspace_id?: number
    name?: string
    description?: string
    notes?: string
    created_by?: number
    updated_by?: number
    created_at?: string
    updated_at?: string
    assigned_to_team_id?: number
    state?: DBType_Mission_StateType
}
const COLUMN_SET_MISSIONS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "workspace_id"
    },
    {
        "name": "name"
    },
    {
        "name": "description",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "notes",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by"
    },
    {
        "name": "updated_by"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "assigned_to_team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "missions"})

const COLUMN_SET_MISSIONS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "workspace_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "description",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "notes",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_by",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "assigned_to_team_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "missions"})
import {DBType_Mission} from './DBTypes'


    export async function insert_Mission(values: DBInsert_Mission){
        const ret = await db.one<DBType_Mission>(db.$config.pgp.helpers.insert(values, undefined, 'missions') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Mission<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Mission): Promise<T extends number ? false | DBType_Mission : DBType_Mission[]>{

        if(!values.updated_at){values.updated_at = new Date().toISOString()}

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Mission>(db.$config.pgp.helpers.update(values,  COLUMN_SET_MISSIONS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Mission>(db.$config.pgp.helpers.update(values,  COLUMN_SET_MISSIONS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Mission<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Mission : DBType_Mission[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Mission>('DELETE FROM missions WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Mission>('DELETE FROM missions ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Mission<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Mission : DBType_Mission[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Mission>('SELECT * FROM missions ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Mission>('SELECT * FROM missions ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//tasks

import {DBType_Task_StateType} from "./DBTypes";

export type DBInsert_Task = {
    mission_id: number
    name: string
    description?: string
    notes?: string
    created_by: number
    updated_by: number
    created_at?: string
    updated_at?: string
    state?: DBType_Task_StateType
}

export type DBUpdate_Task = {
    mission_id?: number
    name?: string
    description?: string
    notes?: string
    created_by?: number
    updated_by?: number
    created_at?: string
    updated_at?: string
    state?: DBType_Task_StateType
}
const COLUMN_SET_TASKS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "mission_id"
    },
    {
        "name": "name"
    },
    {
        "name": "description",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "notes",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by"
    },
    {
        "name": "updated_by"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "tasks"})

const COLUMN_SET_TASKS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "mission_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "description",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "notes",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_by",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "state",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "tasks"})
import {DBType_Task} from './DBTypes'


    export async function insert_Task(values: DBInsert_Task){
        const ret = await db.one<DBType_Task>(db.$config.pgp.helpers.insert(values, undefined, 'tasks') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Task<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Task): Promise<T extends number ? false | DBType_Task : DBType_Task[]>{

        if(!values.updated_at){values.updated_at = new Date().toISOString()}

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Task>(db.$config.pgp.helpers.update(values,  COLUMN_SET_TASKS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Task>(db.$config.pgp.helpers.update(values,  COLUMN_SET_TASKS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Task<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Task : DBType_Task[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Task>('DELETE FROM tasks WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Task>('DELETE FROM tasks ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Task<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Task : DBType_Task[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Task>('SELECT * FROM tasks ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Task>('SELECT * FROM tasks ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//task_geo_objects

import {} from "./DBTypes";

export type DBInsert_Task_Geo_Object = {
    geo_object_id: number
    task_id: number
}

export type DBUpdate_Task_Geo_Object = {
    geo_object_id?: number
    task_id?: number
}
const COLUMN_SET_TASK_GEO_OBJECTS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "geo_object_id"
    },
    {
        "name": "task_id"
    }
], {table: "task_geo_objects"})

const COLUMN_SET_TASK_GEO_OBJECTS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "geo_object_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "task_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "task_geo_objects"})
import {DBType_Task_Geo_Object} from './DBTypes'


    export async function insert_Task_Geo_Object(values: DBInsert_Task_Geo_Object){
        const ret = await db.one<DBType_Task_Geo_Object>(db.$config.pgp.helpers.insert(values, undefined, 'task_geo_objects') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Task_Geo_Object<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Task_Geo_Object): Promise<T extends number ? false | DBType_Task_Geo_Object : DBType_Task_Geo_Object[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Task_Geo_Object>(db.$config.pgp.helpers.update(values,  COLUMN_SET_TASK_GEO_OBJECTS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Task_Geo_Object>(db.$config.pgp.helpers.update(values,  COLUMN_SET_TASK_GEO_OBJECTS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Task_Geo_Object<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Task_Geo_Object : DBType_Task_Geo_Object[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Task_Geo_Object>('DELETE FROM task_geo_objects WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Task_Geo_Object>('DELETE FROM task_geo_objects ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }


//collision_object_coverage_areas

import {} from "./DBTypes";

export type DBInsert_Collision_Object_Coverage_Area = {
    geom: ST_Geometry
    radius: number
    created_at?: string
    updated_at?: string
}

export type DBUpdate_Collision_Object_Coverage_Area = {
    geom?: ST_Geometry
    radius?: number
    created_at?: string
    updated_at?: string
}
const COLUMN_SET_COLLISION_OBJECT_COVERAGE_AREAS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "geom"
    },
    {
        "name": "radius"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "collision_object_coverage_areas"})

const COLUMN_SET_COLLISION_OBJECT_COVERAGE_AREAS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "geom",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "radius",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "updated_at",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "collision_object_coverage_areas"})
import {DBType_Collision_Object_Coverage_Area} from './DBTypes'


    export async function insert_Collision_Object_Coverage_Area(values: DBInsert_Collision_Object_Coverage_Area){
        const ret = await db.one<DBType_Collision_Object_Coverage_Area>(db.$config.pgp.helpers.insert(values, undefined, 'collision_object_coverage_areas') + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

        replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Collision_Object_Coverage_Area<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Collision_Object_Coverage_Area): Promise<T extends number ? false | DBType_Collision_Object_Coverage_Area : DBType_Collision_Object_Coverage_Area[]>{

        if(!values.updated_at){values.updated_at = new Date().toISOString()}

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Collision_Object_Coverage_Area>(db.$config.pgp.helpers.update(values,  COLUMN_SET_COLLISION_OBJECT_COVERAGE_AREAS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

            if(!ret){
                //@ts-ignore
                return false
            }

            replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Collision_Object_Coverage_Area>(db.$config.pgp.helpers.update(values,  COLUMN_SET_COLLISION_OBJECT_COVERAGE_AREAS_UPDATE) + ' ' + whereCondition + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

            replaceGeometryWithParsed(ret, 'geom', 'geom_parsed')

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Collision_Object_Coverage_Area<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Collision_Object_Coverage_Area : DBType_Collision_Object_Coverage_Area[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Collision_Object_Coverage_Area>('DELETE FROM collision_object_coverage_areas WHERE id = ${id} RETURNING *, ST_AsGeoJSON(geom) as geom_parsed', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Collision_Object_Coverage_Area>('DELETE FROM collision_object_coverage_areas ' + whereCondition + ' RETURNING *, ST_AsGeoJSON(geom) as geom_parsed')

            replaceGeometryWithParsed(ret, 'geom', 'geom_parsed')

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Collision_Object_Coverage_Area<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Collision_Object_Coverage_Area : DBType_Collision_Object_Coverage_Area[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Collision_Object_Coverage_Area>('SELECT *, ST_AsGeoJSON(geom) as geom_parsed FROM collision_object_coverage_areas ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                replaceGeometryWithParsed([ret], 'geom', 'geom_parsed')

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Collision_Object_Coverage_Area>('SELECT *, ST_AsGeoJSON(geom) as geom_parsed FROM collision_object_coverage_areas ' + whereCondition)

                replaceGeometryWithParsed(ret, 'geom', 'geom_parsed')

                //@ts-ignore
                return ret
            }

        }


//collision_object_geo_objects

import {} from "./DBTypes";

export type DBInsert_Collision_Object_Geo_Object = {
    geo_object_id: number
    coverage_area_id: number
}

export type DBUpdate_Collision_Object_Geo_Object = {
    geo_object_id?: number
    coverage_area_id?: number
}
const COLUMN_SET_COLLISION_OBJECT_GEO_OBJECTS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "geo_object_id"
    },
    {
        "name": "coverage_area_id"
    }
], {table: "collision_object_geo_objects"})

const COLUMN_SET_COLLISION_OBJECT_GEO_OBJECTS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "geo_object_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "coverage_area_id",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "collision_object_geo_objects"})
import {DBType_Collision_Object_Geo_Object} from './DBTypes'


    export async function insert_Collision_Object_Geo_Object(values: DBInsert_Collision_Object_Geo_Object){
        const ret = await db.one<DBType_Collision_Object_Geo_Object>(db.$config.pgp.helpers.insert(values, undefined, 'collision_object_geo_objects') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Collision_Object_Geo_Object<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Collision_Object_Geo_Object): Promise<T extends number ? false | DBType_Collision_Object_Geo_Object : DBType_Collision_Object_Geo_Object[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Collision_Object_Geo_Object>(db.$config.pgp.helpers.update(values,  COLUMN_SET_COLLISION_OBJECT_GEO_OBJECTS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Collision_Object_Geo_Object>(db.$config.pgp.helpers.update(values,  COLUMN_SET_COLLISION_OBJECT_GEO_OBJECTS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Collision_Object_Geo_Object<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Collision_Object_Geo_Object : DBType_Collision_Object_Geo_Object[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Collision_Object_Geo_Object>('DELETE FROM collision_object_geo_objects WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Collision_Object_Geo_Object>('DELETE FROM collision_object_geo_objects ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }


//live_share_keys

import {} from "./DBTypes";

export type DBInsert_Live_Share_Key = {
    key: string
    name?: string
    connection_id: number
    created_at?: string
    created_by: number
    valid_until?: string
}

export type DBUpdate_Live_Share_Key = {
    key?: string
    name?: string
    connection_id?: number
    created_at?: string
    created_by?: number
    valid_until?: string
}
const COLUMN_SET_LIVE_SHARE_KEYS = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "key"
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "connection_id"
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by"
    },
    {
        "name": "valid_until",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "live_share_keys"})

const COLUMN_SET_LIVE_SHARE_KEYS_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "key",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "name",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "connection_id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "created_by",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "valid_until",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "live_share_keys"})
import {DBType_Live_Share_Key} from './DBTypes'


    export async function insert_Live_Share_Key(values: DBInsert_Live_Share_Key){
        const ret = await db.one<DBType_Live_Share_Key>(db.$config.pgp.helpers.insert(values, undefined, 'live_share_keys') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Live_Share_Key<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Live_Share_Key): Promise<T extends number ? false | DBType_Live_Share_Key : DBType_Live_Share_Key[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Live_Share_Key>(db.$config.pgp.helpers.update(values,  COLUMN_SET_LIVE_SHARE_KEYS_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Live_Share_Key>(db.$config.pgp.helpers.update(values,  COLUMN_SET_LIVE_SHARE_KEYS_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Live_Share_Key<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Live_Share_Key : DBType_Live_Share_Key[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Live_Share_Key>('DELETE FROM live_share_keys WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Live_Share_Key>('DELETE FROM live_share_keys ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Live_Share_Key<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Live_Share_Key : DBType_Live_Share_Key[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Live_Share_Key>('SELECT * FROM live_share_keys ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Live_Share_Key>('SELECT * FROM live_share_keys ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }


//api_endpoint_performances

import {} from "./DBTypes";

export type DBInsert_Api_Endpoint_Performance = {
    url_with_id_params: string
    endpoint: string
    http_method: string
    query?: string
    run_time: number
    work_time: number
    started_at: string
    logged_at?: string
    status_code: number
    content_length: number
}

export type DBUpdate_Api_Endpoint_Performance = {
    url_with_id_params?: string
    endpoint?: string
    http_method?: string
    query?: string
    run_time?: number
    work_time?: number
    started_at?: string
    logged_at?: string
    status_code?: number
    content_length?: number
}
const COLUMN_SET_API_ENDPOINT_PERFORMANCES = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "cnd": true
    },
    {
        "name": "url_with_id_params"
    },
    {
        "name": "endpoint"
    },
    {
        "name": "http_method"
    },
    {
        "name": "query",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "run_time"
    },
    {
        "name": "work_time"
    },
    {
        "name": "started_at"
    },
    {
        "name": "logged_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "status_code"
    },
    {
        "name": "content_length"
    }
], {table: "api_endpoint_performances"})

const COLUMN_SET_API_ENDPOINT_PERFORMANCES_UPDATE = new db.$config.pgp.helpers.ColumnSet([
    {
        "name": "id",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "url_with_id_params",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "endpoint",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "http_method",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "query",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "run_time",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "work_time",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "started_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "logged_at",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "status_code",
        "skip": (col: {exists: boolean}) => !col.exists
    },
    {
        "name": "content_length",
        "skip": (col: {exists: boolean}) => !col.exists
    }
], {table: "api_endpoint_performances"})
import {DBType_Api_Endpoint_Performance} from './DBTypes'


    export async function insert_Api_Endpoint_Performance(values: DBInsert_Api_Endpoint_Performance){
        const ret = await db.one<DBType_Api_Endpoint_Performance>(db.$config.pgp.helpers.insert(values, undefined, 'api_endpoint_performances') + ' RETURNING *')

        

        return ret
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function update_Api_Endpoint_Performance<T extends number | string>(idOrWhereCondition: T, values: DBUpdate_Api_Endpoint_Performance): Promise<T extends number ? false | DBType_Api_Endpoint_Performance : DBType_Api_Endpoint_Performance[]>{

        

        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Api_Endpoint_Performance>(db.$config.pgp.helpers.update(values,  COLUMN_SET_API_ENDPOINT_PERFORMANCES_UPDATE) + ' WHERE id = ' + id + ' RETURNING *')

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Api_Endpoint_Performance>(db.$config.pgp.helpers.update(values,  COLUMN_SET_API_ENDPOINT_PERFORMANCES_UPDATE) + ' ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
    @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
    */
    export async function delete_Api_Endpoint_Performance<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Api_Endpoint_Performance : DBType_Api_Endpoint_Performance[]>{
        if(typeof idOrWhereCondition === 'number'){
            const id = idOrWhereCondition as number
            const ret = await db.oneOrNone<DBType_Api_Endpoint_Performance>('DELETE FROM api_endpoint_performances WHERE id = ${id} RETURNING *', {id})

            if(!ret){
                //@ts-ignore
                return false
            }

            

            //@ts-ignore
            return ret

        } else {
            let whereCondition = idOrWhereCondition as string
            whereCondition = whereCondition.trim()
            if(whereCondition.endsWith(';')){
                whereCondition = whereCondition.substring(0, whereCondition.length - 1)
            }

            const ret = await db.manyOrNone<DBType_Api_Endpoint_Performance>('DELETE FROM api_endpoint_performances ' + whereCondition + ' RETURNING *')

            

            //@ts-ignore
            return ret
        }
    }

    /**
        @param idOrWhereCondition is either a single id or a where clause which shall be generated with pgp.as.format() e.g. pgp.as.format('WHERE id = ${id}', {id: 42})
        */
        export async function select_Api_Endpoint_Performance<T extends number | string>(idOrWhereCondition: T): Promise<T extends number ? false | DBType_Api_Endpoint_Performance : DBType_Api_Endpoint_Performance[]>{
            if(typeof idOrWhereCondition === 'number'){
                const id = idOrWhereCondition as number
                const ret = await db.oneOrNone<DBType_Api_Endpoint_Performance>('SELECT * FROM api_endpoint_performances ' + pgp.as.format('WHERE id = ${id}', {id}))

                if(!ret){
                    //@ts-ignore
                    return false
                }

                

                //@ts-ignore
                return ret
            } else {
                let whereCondition = idOrWhereCondition as string
                whereCondition = whereCondition.trim()
                if(whereCondition.endsWith(';')){
                    whereCondition = whereCondition.substring(0, whereCondition.length - 1)
                }

                const ret = await db.manyOrNone<DBType_Api_Endpoint_Performance>('SELECT * FROM api_endpoint_performances ' + whereCondition)

                

                //@ts-ignore
                return ret
            }

        }