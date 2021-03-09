module.exports = {
    getDataProvidersPool
}

const config = require('../config.json')
const axios = require('axios')

const dataProvidersPoolRoute = '/oracle/data_providers_pool'

function getRequest(route) {
    return axios.get(config.api + route, {});
}

function getDataProvidersPool() {
    return getRequest(dataProvidersPoolRoute);
}

async function main() {
    console.log("Data providers pool: ", (await getDataProvidersPool()).data);
}

main()