const {setupGovExtension} = require("./extensions/govExtension.js");
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
        setupGovExtension,
    );

    console.log("Params voting: ", (await client.gov.unverified.params("voting").catch(err)));
    console.log("Params tallying: ", (await client.gov.unverified.params("tallying").catch(err)));
    console.log("Params deposit: ", (await client.gov.unverified.params("deposit").catch(err)));

    // console.log("Proposals: ", (await client.gov.unverified.proposals().catch(err)));
}

if (require.main === module) {
    main();
}