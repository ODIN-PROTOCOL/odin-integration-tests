const {
    QueryClient,
    setupBankExtension,
    setupStakingExtension,
    setupDistributionExtension
} = require("@cosmjs/stargate");

const {setupMintExtension} = require("./extensions/mintExtension.js");

const {Tendermint34Client} = require("@cosmjs/tendermint-rpc");
const {SigningStargateClient, defaultRegistryTypes} = require("@cosmjs/stargate");
const {Bech32} = require("@cosmjs/encoding");
const {coins} = require("@cosmjs/launchpad");
const {stringToPath} = require("@cosmjs/crypto");
const Long = require("long");
const config = require('../../config.json');

const HD_DERIVATION = stringToPath("m/44'/494'/0'/0/0");
const MNEMONIC_SIZE = 24;

function err(reason) {
    console.log(reason);
}

async function ShowValidatorOutstandingRewards(account) {
    const queryClient = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupDistributionExtension,
    );

    const rewards = await queryClient.distribution.unverified.validatorOutstandingRewards(Bech32.encode('odinvaloper', Bech32.decode(account.address).data)).catch(err);
    console.log("Reward: ", Long.fromString(rewards.rewards.rewards[0].amount));
    console.log("Outstanding rewards: ", rewards.rewards.rewards);
}

async function ShowBalances(account) {
    const queryClient = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupBankExtension,
    );

    // check our balance
    console.log("Account:", account);
    console.log("Balance:", await queryClient.bank.unverified.allBalances(account.address).catch(err));
}

async function ShowTreasuryPool() {
    const queryClient = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupMintExtension,
    );

    console.log("Treasury pool: ", (await queryClient.mint.unverified.treasuryPool().catch(err)));
}

async function ShowValidator(account) {
    const queryClient = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupStakingExtension,
    );

    const rewards = await queryClient.staking.unverified.validator(Bech32.encode('odinvaloper', Bech32.decode(account.address).data)).catch(err);
    console.log("Validator: ", rewards);
}

// async function ShowProposals() {
//     const queryClient = QueryClient.withExtensions(
//         await Tendermint34Client.connect(config.rpc),
//         setupMintExtension,
//     );
//
//     console.log("Proposals: ", (await queryClient.gov..catch(err)));
// }

async function BroadcastMsg(wallet, registry, msgAny) {
    defaultRegistryTypes.map((v) => {
        registry.register(v[0], v[1]);
    });

    let [account] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    const fee = {
        amount: coins(0, "loki"),
        gas: "2000000"
    }

    console.log("Submitting transaction...");
    const res = await client.signAndBroadcast(account.address, [msgAny], fee).catch(err);
    console.log("Tx result:", res);
    return res;
}

module.exports = {
    BroadcastMsg,
    ShowBalances,
    ShowValidatorOutstandingRewards,
    ShowTreasuryPool,
    ShowValidator,
    err,
    HD_DERIVATION
}