const {setupOracleExtension} = require("./extensions/oracleExtension.js");
const {
    QueryClient,
} = require("@cosmjs/stargate");
const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");
const Long = require("long");

const config = require('../../config.json')
const {err} = require("./utils");

async function main() {

    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupOracleExtension,
    );

    let report = await client.oracle.unverified.request(new Long(1)).catch(err);
    console.log("Raw report: ", report);
    console.log("Result: \n", new TextDecoder().decode(report.request.responsePacketData.result));
}

if (require.main === module) {
    main();
}