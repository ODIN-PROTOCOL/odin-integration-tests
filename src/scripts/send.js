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
  const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry, gasPrice: GasPrice.fromString("10loki")});

  await ShowBalances(account);

  const res = await client.sendTokens(account.address, "odin1k4uuv8aanj3ejs0qhqmsax9d6lzmp0pl0gkc42", coins(2500000, "loki"), "");
  console.log('Tx result:', res)
}

main();
