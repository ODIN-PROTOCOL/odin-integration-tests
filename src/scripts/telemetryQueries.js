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

    const pagination = new Pagination(0, 10, true, true);
    console.log("Balances: ", await client.telemetry.unverified.topBalances('minigeo', pagination).catch(err));
    console.log("Validators: ", await client.telemetry.unverified.extendedValidators('', pagination).catch(err));


    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 2)
    const endDate = (new Date())
    console.log(startDate)
    console.log(endDate)

    console.log("Average block size: ", await client.telemetry.unverified.avgBlockSize().catch(err));
    console.log("Average block time: ", await client.telemetry.unverified.avgBlockTime(startDate).catch(err));
    console.log("Tx volume per day: ", await client.telemetry.unverified.txVolume(undefined, endDate).catch(err));
    console.log("Average transaction fee per day: ", await client.telemetry.unverified.avgTxFee(startDate, endDate).catch(err));
    const topValidators = await client.telemetry.unverified.topValidators(startDate, endDate, pagination).catch(err)
    console.log("Top validators by blocks: ", topValidators);

    console.log("Validator blocks: ", await client.telemetry.unverified.validatorBlocks(topValidators.topValidators[0].validatorAddress, pagination).catch(err));
}

main()