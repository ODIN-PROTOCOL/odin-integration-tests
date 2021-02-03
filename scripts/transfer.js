let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../config.json')

async function main (){
  const wallet = await Secp256k1HdWallet.fromMnemonic(
    config.mnemonic, undefined, "odin"
  );
  
  const [{ address, pubkey }] = await wallet.getAccounts();
  const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

  // check our balance
  const account = await client.getAccount();
  console.log("Account:", account);
  
  const res = await client.sendTokens(address, coins(200000, "loki"), "");
  console.log('Tx result:', res)
}

main()
