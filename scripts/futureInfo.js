const config = require('../config.json')
let {
  StargateClient,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  QueryClient,
  setupStakingExtension,
} = require("@cosmjs/stargate");
let { Client } = require("@cosmjs/tendermint-rpc");

async function main (){
  const tmClient = await Client.connect(config.rpc);
  const client = QueryClient.withExtensions(tmClient, setupAuthExtension, setupBankExtension, setupDistributionExtension, setupStakingExtension);
  console.log(client)

  console.log(await (setupStakingExtension((await StargateClient.connect(config.rpc)).queryClient)).staking.unverified.params())


  // Example queries
  //const balances = await client.bank.balances(myAddress);
  console.log('Staking redelegations: ', await client.staking.unverified.validators("BOND_STATUS_UNSPECIFIED"));
  console.log('Distribution parameters: ', await client.distribution.params());
  console.log('Gov proposals: ', await client.gov.proposals());
  console.log('Mint inflation: ', await client.mint.inflation());
  console.log('Slashing signingInfos: ', await client.slashing.signingInfos());
  
  console.log('Supply totalAll: ', await client.supply.totalAll());
  

  
}

main()