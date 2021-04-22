module.exports = {
    getParams,
    getCurrentRate
}

const config = require('../../../config.json')
const axios = require('axios')

const rateRoute = "/coinswap/rate";
const paramsRoute = "/coinswap/params";

function getRequest(route) {
    return axios.get(config.api + route, {});
}

function getCurrentRate() {
    return getRequest(rateRoute);
}

function getParams() {
    return getRequest(paramsRoute);
}

function err(reason) {
    console.log(reason);
}

async function main() {
    console.log("Current rate: ", (await getCurrentRate().catch(err)).data);
    console.log("Params: ", (await getParams().catch(err)).data);
}

if (require.main === module) {
    main();
}