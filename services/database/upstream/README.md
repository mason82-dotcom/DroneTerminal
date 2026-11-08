# OpenFlightHub Database

These scripts that are used to setup the database will be executed when you deploy the database (which removes all data):
* 0_init_tables.sql (the generated SQL from dbdiagram.io)
* 1_init_users_and_permissions.sql (everything dbdiagram.io does not support)
* X_fill_with_example_data.sql (contains example data for dev/testing)
after this script the github action secret `ALTER_USERS_SQL` will execute to change the default passwords

MAKE SURE: that this github action secret is properly set

e.g.
```sql
ALTER ROLE api password '1234';;
```

Also set the secrets `POSTGRES_PASSWORD` and `POSTGRES_USER` which is the admin account for postgres


# PSQL directly

## Access
Either install the postgres-client on the host machine or use a docker container shell or use PGAdmin

### PGAdmin
right click servers -> register new
and fill out the data in the tab SSH-Tunnel

### Install postgresql client on host machine for easy access:
`apt-get install -y postgresql-client`
Now you can connect directly to the containers postgres:
`psql -U username -W -h localhost -p 5432 mydatabase`

### How to access psql command line on the database docker container:

* login to the webserver
* `docker ps` to find the container id of postgres
* `docker exec CONTAINER-ID /bin/bash`
* `psql postgresql://username:password@localhost:5432`

in case you exposed the port 5432 from the container and you have psql installed you do not need to login to the container at all


## How to drop database

from the command line in the container:
`dropdb --username=username -W mydatabase`

## How to create database
from the command line in the container:
`createdb --username=username -W mydatabase`

## How to run .sql file from command line
`psql --username=username -d mydatabase -a -f mysqlfile.sql`



# Edit definition

use [dbdiagram.io](https://dbdiagram.io/)

then export psql and save it as `0_init_tables.sql`

## Special rules:

### States

You can define specific values for integer columns, which the definition-generation repo will compile into TypeScript constants and types.

#### columns that are integers but only allow specific values (e.g. state)
mark those columns with [note: "0 = state a, 1 = state b"]

When running the "generate db types and schemes" script is executed, special typescript types and constants will be created so you dont have to manually write those numbers

**Syntax Rules:**
* `,` seperates states
* `=` seperates state value and state name

#### columns that are integers that depend on one or multiple state-like columns

You can use the `note` attribute and a json to define the behaviour

```js
JSON.stringify(YOUR_DEFINITION_HERE).replace(/\n/g, '').replace(/(?<!\\)"/g, "'")
```

# Performance and Debugging

Either use pg_hero or directly query:
```psql
SELECT
        pss.userid,
        pss.dbid,
        pd.datname as db_name,
        round((pss.total_exec_time + pss.total_plan_time)::numeric, 2) as total_time,
        pss.calls,
        round((pss.mean_exec_time+pss.mean_plan_time)::numeric, 2) as mean,
        round((100 * (pss.total_exec_time + pss.total_plan_time) / sum((pss.total_exec_time + pss.total_plan_time)::numeric) OVER ())::numeric, 2) as cpu_portion_pctg,
        substr(pss.query, 1, 200) short_query
FROM pg_stat_statements pss, pg_database pd
WHERE pd.oid=pss.dbid
ORDER BY (pss.total_exec_time + pss.total_plan_time)
DESC LIMIT 30;
```
[source](https://jfrog.com/community/data-science/troubleshooting-high-cpu-utilization-in-postgresql-databases-a-how-to-guide/)

## Reset statistics
If you want to reset the statistics because you made a bunch of changes, either use the "reset" button the the "queries" page of pg-hero.

Or execute
```psql
SELECT pg_stat_reset();
SELECT pg_stat_statements_reset();
```

### Database Optimization and watching
- indexes https://devcenter.heroku.com/articles/postgresql-indexes
- maybe later: Vacuum and https://github.com/reorg/pg_repack

more on databases:
- https://www.justwatch.com/blog/post/debugging-postgresql-performance-the-hard-way/?ref=nikolaj-sarry.info
- https://medium.com/paypal-tech/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680





# PG Admin

To setup pg admin, use an ssh tunnel. And make sure as an identity/private key file, you dont use putty .pkk file, but instead open Puttygen, and export that key as openssh format

