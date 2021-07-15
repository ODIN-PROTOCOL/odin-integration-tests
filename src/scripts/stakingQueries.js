const {
    QueryClient,
    setupStakingExtension,
} = require("@cosmjs/stargate");

const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');
const {ShowBalances} = require("./utils");

const {HD_DERIVATION} = require("./utils");
const {DirectSecp256k1HdWallet} = require("@cosmjs/proto-signing");

function err(reason) {
    console.log(reason);
}

async function main() {

    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupStakingExtension,
    );

    // Staking
    // console.log('Staking redelegations: ', await client.staking.unverified.validators("BOND_STATUS_BONDED").catch(err));

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    );

    const [account] = await wallet.getAccounts();
    console.log(account);

    await ShowBalances(account);

    console.log('Staking delegations: ', await client.staking.pool().catch(err));
}

main()
