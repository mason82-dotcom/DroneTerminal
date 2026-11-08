# For Developers

## Vue 3 Common Pitfalls etc

### Vue 3 for SFC:
https://vuejs.org/guide/components

### Use objects to pass reactive base values (like boolean) to components when they are used in e.g. computed methods in that component
Otherwise changes will not be propagated correctly

### css scoping issue with child components
Child components and Components should never have the same root class

### CSS and SCSS in vue

https://vuejs.org/api/sfc-css-features.html

https://vue-loader.vuejs.org/guide/pre-processors.html#sass

## Install
```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm run dev
```

For local development you will run into issues because the api is running on a different port. So we suggest this setup for local testing:
* run docker Desktop
* run api via VSCode or docker
* run web-app via `npm run dev`
* install `CORS Everywhere` plugin for Firefox or `Allow CORS: Access-Control-Allow-Origin` plugin for Chrome
* edit `C:\Windows\System32\drivers\etc\hosts` and add the following line `127.0.0.1 dev.openflighthub.org`
* run `npm run dev -- --host --port 9000`

## Setup https environment (required for e.g. media devices apis of the browser)
* generate self-signed certificates and save them in e.g. `/vite_dev_cert` or `C:\\vite_dev_cert`
* goto https://github.com/FiloSottile/mkcert/releases and download e.g. `mkcert-v1.4.4-windows-amd64.exe`
* move `mkcert-v1.4.4-windows-amd64.exe` to `/vite_dev_cert` or `C:\\vite_dev_cert`
* open cmd and run `cd /vite_dev_cert`
* then run `mkcert-v1.4.4-windows-amd64.exe -install`
* a popup opens that asks you for permission to install a root certificate: accept it
* now run `mkcert-v1.4.4-windows-amd64.exe *.openflighthub.org` to generate a new certificate to be used by the webserver
* setup nginx reverse proxy, where `api` runs on port `9001`:

```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    #www.openflighthub.org

    # HTTPS server
    #
    server {
        listen       443 ssl;
        server_name  localhost;

        ssl_certificate      /vite_dev_cert/_cert.pem;
        ssl_certificate_key  /vite_dev_cert/_private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location /api/ {
            proxy_pass http://localhost:9001/;
        }

        location / {
            proxy_pass http://localhost:5173;

            # WebSocket support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;

            proxy_set_header Connection "upgrade";
        }
    }

}
```
* start nginx
* visit https://dev.openflighthub.org, on Firefox you must manually accept the certificate (click `advanced`) on chrome it should automatically work


## Build Production Version

use VS Code default build task key combination `Ctrl + Shift + B`

## Run Unit Tests

use VS Code default build task key combination `Ctrl + Shift + T`

## Build and run Docker image
run `build_and_run_docker.sh` or `build_and_run_docker.cmd`

## Other Information

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize Vite configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).


### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Analyse bundle size
execute `npx vite-bundle-visualizer` and open `stats.html`

## Color Configuration / Theme
see /src/config/colors.ts

# Internationalisation / Translation via Vue I18n
see INTERNATIONALISATION.md

# Vue

Usefull plugins you can use:
* PrimeVue (for UI) https://primevue.org/
* https://github.com/vuejs/language-tools/tree/master/packages/component-type-helpers
