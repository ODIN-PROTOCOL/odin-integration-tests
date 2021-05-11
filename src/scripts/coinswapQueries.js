const {setupCoinswapExtension} = require("./extensions/coinswapExtension.js");
const {
    QueryClient,
} = require("@cosmjs/stargate");
const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json')
const {err} = require("./utils");

// TODO: handle long returns
async function main() {

    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupCoinswapExtension,
    );

    console.log("Params: ", (await client.coinswap.unverified.params().catch(err)));
    console.log("Exchange from 'minigeo' to 'loki':", (await client.coinswap.unverified.rate("minigeo", "loki").catch(err)));
    console.log("Exchange from 'eth' to 'loki':", (await client.coinswap.unverified.rate("eth", "loki").catch(err)));
}

if (require.main === module) {
    main();
}