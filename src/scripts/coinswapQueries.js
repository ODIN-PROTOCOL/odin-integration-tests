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
    console.log("Exchange from 'geo' to 'odin':", (await client.coinswap.unverified.rate("geo", "odin").catch(err)));
    console.log("Exchange from 'eth' to 'odin':", (await client.coinswap.unverified.rate("eth", "odin").catch(err)));
}

if (require.main === module) {
    main();
}