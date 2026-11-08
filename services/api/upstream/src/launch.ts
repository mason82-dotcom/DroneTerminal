import app from './app'

import SecretsLoader from './util/SecretsLoader'
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets([
    'mqtt_port'])

const PORT = 6001;
const HOST = '0.0.0.0';

export const server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})


import {setup} from './mqtt'
setup(secrets.mqtt_port)
