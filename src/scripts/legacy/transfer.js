let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../../../config.json')

async function main (){
  const wallet = await Secp256k1HdWallet.fromMnemonic(
    config.mnemonic, undefined, "odin"
  );
  
  const [{ address }] = await wallet.getAccounts();
  const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1odin'));

  // check our balance
  const account = await client.getAccount();
  console.log("Account:", account);
  
  const res = await client.sendTokens(address, coins(200000, "odin"), "");
  console.log('Tx result:', res)
}

main()
