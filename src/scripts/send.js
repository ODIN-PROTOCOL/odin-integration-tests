let { Secp256k1HdWallet, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../../config.json');
const {SigningStargateClient, defaultRegistryTypes} = require("@cosmjs/stargate");
const {Registry} = require("@cosmjs/proto-signing");
const { ShowBalances, HD_DERIVATION} = require("./utils.js");

async function main (){
  const wallet = await Secp256k1HdWallet.fromMnemonic(
      config.mnemonic,
      {
        hdPaths: [HD_DERIVATION],
        prefix:"odin"
      }
  );

  const registry = new Registry();

  defaultRegistryTypes.map((v) => {
    registry.register(v[0], v[1]);
  });

  let [account] = await wallet.getAccounts();
  const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry, gasPrice: GasPrice.fromString("1loki")});

  await ShowBalances(account);

  const res = await client.sendTokens(account.address, "odin157538720ldaw8v0e3mg56nnz0nwfhkkr4x5qc0", coins(20, "loki"), "");
  console.log('Tx result:', res)
}

main();
