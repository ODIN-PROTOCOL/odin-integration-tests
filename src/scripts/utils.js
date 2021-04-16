module.exports = {
    BroadcastMsg,
    ShowBalances,
    ShowValidatorOutstandingRewards
}

const {
    QueryClient,
    setupBankExtension,
    setupDistributionExtension
} = require("@cosmjs/stargate");

const {Tendermint34Client} = require("@cosmjs/tendermint-rpc");
const {SigningStargateClient} = require("@cosmjs/stargate");
const {Bech32} = require("@cosmjs/encoding");
const {coins} = require("@cosmjs/launchpad");
const config = require('../../config.json');

async function ShowValidatorOutstandingRewards(account) {
    const queryClient = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupDistributionExtension,
    );

    const rewards = await queryClient.distribution.unverified.validatorOutstandingRewards(Bech32.encode('odinvaloper', Bech32.decode(account.address).data));
    console.log("Outstanding rewards: ", rewards);
}

async function ShowBalances(account) {
    const queryClient = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupBankExtension,
    );

    // check our balance
    console.log("Account:", account);
    console.log("Balance:", await queryClient.bank.unverified.allBalances(account.address));
}

async function BroadcastMsg(wallet, registry, msgAny) {
    let [account] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    const fee = {
        amount: coins(0, "loki"),
        gas: "2000000"
    }

    console.log("Submitting transaction...");
    const res = await client.signAndBroadcast(account.address, [msgAny], fee);
    console.log("Tx result:", res);
}