# Development

## OpenApi spec
Can be edited with swagger editor (clone and run locally https://github.com/swagger-api/swagger-editor/ or https://editor-next.swagger.io/).
Following custom rules apply (because of depending build scripts):
- each path operation must have a single tag
- every request body should be a `$ref` to `components/schemas` because we can then automatically generate the JSON Schema and use that in our `api` code

## Types and Schemas
Types and schemas are automatically generated with this repo: https://github.com/OpenFlightHub/definition-typegenerator

### Postgis Types

if you read from database and you have geometry columns, they will automatically be converted into ST_Geometry instances if you use the DBHelpers!
For inserting stuff into the database, also use ST_Geometry.

If you have to write your own SQL queries for pg-promise, you have to deal with this yourself:

example for a select query:
```js
// use ST_AsGeoJSON
const result = await db.manyOrNone<{id: number, geom: ST_Geometry}>('SELECT id, ST_AsGeoJSON(my_table.geom) as geom_parsed FROM my_table')

// use the replacement helper
replaceGeometryWithParsed(result, 'geom', 'geom_parsed')
```


## Guarding system

both express Request and Response have a property `GM` which is the GuardedMiddleware. it provides a set of functions that help you validating user input and api putput. If something is not right, those functions will throw a GuardError which will later be handled by the apps error handler. This helps you writing safe and simple code for routers.

### Following order shall be respected (so generic tests work)

2. `await guardUserIsAuthenticated()` or `await guardUserPermission()` (`guardUserPermission()` includes `guardUserIsAuthenticated()`)
3. other guards
5. `res.guardSend({someResult: 66})` or `res.send()`

## Translation
Generate translation keys automatically from sources. Missing keys will be added to each `{{lang}}.json` file
`node findTranslationKeysInSource.js`

# Testing

to test in VSCode, just press `Ctrl+Shift+T`

## Jest Documentation

https://jestjs.io/docs/getting-started#using-typescript

## SuperTest Documentation

https://www.npmjs.com/package/supertest