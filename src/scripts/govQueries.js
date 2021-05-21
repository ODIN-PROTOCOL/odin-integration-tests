const {setupGovExtension} = require("./extensions/govExtension.js");
const {
    QueryClient,
} = require("@cosmjs/stargate");
const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');
const {err} = require("./utils");
const Long = require("long");

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

    const proposalsDeposit = (await client.gov.unverified.proposals(statusDeposit, "", "").catch(err));
    console.log("Proposals deposit: ", proposalsDeposit);
    const proposalsVoting = (await client.gov.unverified.proposals(statusVoting, "", "").catch(err));
    console.log("Proposals voting: ", proposalsVoting);
    const proposalsPassed = (await client.gov.unverified.proposals(statusPassed, "", "").catch(err));
    console.log("Proposals passed: ", proposalsPassed);
    const proposalsRejected = (await client.gov.unverified.proposals(statusRejected, "", "").catch(err));
    console.log("Proposals rejected: ", proposalsRejected);

    if (proposalsDeposit.length + proposalsPassed.length + proposalsVoting.length + proposalsRejected.length > 0) {
        console.log("Tally result:", (await client.gov.unverified.tallyResult(new Long(1)).catch(err)));
        console.log("Votes result:", (await client.gov.unverified.votes(new Long(1)).catch(err)));
        console.log("Vote result:", (await client.gov.unverified.vote(new Long(1), "odin1pl07tk6hcpp2an3rug75as4dfgd743qp80g63g").catch(err)));
    }

    // console.log("Proposal: ", (await client.gov.unverified.proposal(new Long(1)).catch(err)));
}

if (require.main === module) {
    main();
}