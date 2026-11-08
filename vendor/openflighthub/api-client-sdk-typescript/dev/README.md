# Protocol Documentation

see [LIVE_WEBSOCKET.md](LIVE_WEBSOCKET.md)

# How to generate the sdk

## Preparations
* check out `api` repo in the same folder as this repository
* open the `dev` folder in VSCode
* run `npm install` in the `dev` folder

## Updating versions
If you publish a new version, make sure to update the contents of `client_sdk.version`
The api version is automatically fetched from the openapi spec file in the api repository

## Generate source code from api specs

### Option A: VSCode
* hit `F5`

### Option B: command line
* run (in the `dev` folder) `bash build.sh && node build/generate.js`

## Run Tests

* in the main repo (not the `dev` folder) run: `npm run test`

## Github

* edit CHANGELOG.md and add the new version
* Make sure your version in the package.json has been changed
* commit
* Make sure you pushed git changes to github (so npmjs can cache the latest version of readme etc)
* create a new relase/tag (version number)

## Generate distributable js code

* in the main repo (not the `dev` folder) run: `npm run build`

## Publish to npm

next step requires successfull login via `npm login`
* run `npm publish` (might require `--otp`)

## update in your project

```
npm install openflighthub-api-client-sdk@2.16.2
```

if you are too fast, sometimes npm backend did dont update yet, and your npm cache is now broken (yes, LOL).
clear cache:

```
npm cache clean --force
```

then run the npm install command again

# Using local link to develop without having to publish to npm

1. in the `api-client-sdk-typescript` repo run `npm link`
2. in the `web-app` repo run `npm link openflighthub-api-client-sdk`

Now you build the sdk like normal:
* in dev hit `F5`
* in root folder run `npm run build`

**Important note:**
Step `2.` has to be repeated after everytime you do a `npm install` or `npm remove` in the `web-app` repo!
You probably have to reload vs code too

## Undo link
in the `web-app` repo run
* `npm unlink --no-save openflighthub-api-client-sdk`
* `npm install`
