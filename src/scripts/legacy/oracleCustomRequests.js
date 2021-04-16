module.exports = {
    getDataProvidersPool,
    getOracleParams
}

const config = require('../../../config.json')
const axios = require('axios')

const dataProvidersPoolRoute = '/oracle/data_providers_pool'
const oracleParamsRoute = '/oracle/params'

function getRequest(route) {
    return axios.get(config.api + route, {});
}

function getDataProvidersPool() {
    return getRequest(dataProvidersPoolRoute);
}

function getOracleParams() {
    return getRequest(oracleParamsRoute)
}

async function main() {
    console.log('Data providers pool: ', (await getDataProvidersPool()).data);
    console.log('Oracle params: ', (await getOracleParams()).data)
}

if (require.main === module) {
    main();
}