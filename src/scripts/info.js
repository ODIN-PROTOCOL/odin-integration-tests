const {
    QueryClient,
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupStakingExtension,
    setupIbcExtension,
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
        setupAuthExtension,
        setupBankExtension,
        setupDistributionExtension,
        setupStakingExtension,
        setupIbcExtension
    );

    // Supply
    console.log('Total supply:', await client.bank.totalSupply().catch(err));
    console.log('Fee pool:', await client.distribution.communityPool().catch(err));
    // Params
    console.log('Distribution params: ', await client.distribution.params().catch(err));
    console.log('Staking params: ', await client.staking.params().catch(err));
    // Staking
    // console.log('Staking redelegations: ', await client.staking.unverified.validators("BOND_STATUS_BONDED").catch(err));

    // Example queries
    // const balances = await client.bank.balance(config.data_provider_address, "odin");
    // console.log('Balances: ', balances);
    // console.log('Validators: ', await client.staking.validators());
    // console.log('Distribution parameters: ', await client.distribution.parameters());
    // console.log('Gov proposals: ', JSON.stringify(await client.gov.proposals(), null, 2));
    // console.log('Mint inflation: ', await client.mint.inflation());
    // console.log('Slashing signingInfos: ', await client.slashing.signingInfos());
    // console.log('Staking redelegations: ', await client.staking.redelegations());
    // console.log('Supply totalAll: ', await client.bank.total());
    // console.log('Fee pool:', await client.distribution.communityPool());
    // console.log('Data providers pool', (await getDataProvidersPool()).data);
    // console.log('Current rate', (await getCurrentRate()).data);
    // console.log('Coinswap params', (await getParams()).data);
    // console.log('Mint params: ', await client.mint.parameters());
    // console.log('Oracle params: ', (await getOracleParams()).data);

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
}

main()
