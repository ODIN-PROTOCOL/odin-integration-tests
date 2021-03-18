module.exports = {
    getEthIntegrationAddress
}

const config = require('../config.json')
const axios = require('axios')

const ethIntegrationAddressRoute = '/minting/eth-integration-address'

function getRequest(route) {
    return axios.get(config.api + route, {});
}

function getEthIntegrationAddress() {
    return getRequest(ethIntegrationAddressRoute);
}

async function main() {
    console.log('Eth integration address: ', (await getEthIntegrationAddress()).data);
}

if (require.main === module) {
    main();
}