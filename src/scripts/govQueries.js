const {setupGovExtension} = require("./extensions/govExtension.js");
const {
    QueryClient,
} = require("@cosmjs/stargate");
const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');
const {err} = require("./utils");

const statusDeposit = 1;
const statusVoting = 2;
const statusPassed = 3;
const statusRejected = 4;

async function main() {

    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupGovExtension,
    );

    console.log("Params voting: ", (await client.gov.unverified.params("voting").catch(err)));
    console.log("Params tallying: ", (await client.gov.unverified.params("tallying").catch(err)));
    console.log("Params deposit: ", (await client.gov.unverified.params("deposit").catch(err)));

    console.log("Proposals deposit: ", (await client.gov.unverified.proposals(statusDeposit, "", "").catch(err)));
    console.log("Proposals voting: ", (await client.gov.unverified.proposals(statusVoting, "", "").catch(err)));
    console.log("Proposals passed: ", (await client.gov.unverified.proposals(statusPassed, "", "").catch(err)));
    console.log("Proposals rejected: ", (await client.gov.unverified.proposals(statusRejected, "", "").catch(err)));

    // console.log("Proposal: ", (await client.gov.unverified.proposal(new Long(1)).catch(err)));
}

if (require.main === module) {
    main();
}