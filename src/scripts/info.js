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
    console.log('Total supply:', await client.bank.unverified.totalSupply());
    console.log('Fee pool:', await client.distribution.unverified.communityPool());
    // Params
    console.log('Distribution params: ', await client.distribution.unverified.params());
    console.log('Staking params: ', await client.staking.unverified.params());

    // Example queries
    // const balances = await client.bank.balance(config.data_provider_address, "loki");
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
}

main()