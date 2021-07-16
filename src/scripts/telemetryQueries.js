const {
    QueryClient,
} = require("@cosmjs/stargate");

const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');
const {Pagination} = require("./extensions/telemetryExtension");
const {setupTelemetryExtension} = require("./extensions/telemetryExtension");
const {err} = require("./utils");

async function main() {

    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupTelemetryExtension,
    );

    const pagination = new Pagination(0, 10, true);
    console.log("Balances: ", await client.telemetry.unverified.topBalances('minigeo', pagination).catch(err));
}

main()