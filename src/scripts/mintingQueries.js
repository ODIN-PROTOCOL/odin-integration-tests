const {setupMintExtension} = require("./extensions/mintExtension.js");
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
        setupMintExtension,
    );

    console.log("Params: ", (await client.mint.unverified.params().catch(err)));
    console.log("Inflation: ", (await client.mint.unverified.inflation().catch(err)));
    console.log("Annual Provisions: ", (await client.mint.unverified.annualProvisions().catch(err)));
    console.log("Eth integration address: ", (await client.mint.unverified.ethIntegrationAddress().catch(err)));
    console.log("Treasury pool: ", (await client.mint.unverified.treasuryPool().catch(err)));
}

if (require.main === module) {
    main();
}
