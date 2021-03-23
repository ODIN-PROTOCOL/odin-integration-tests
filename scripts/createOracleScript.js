let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../config.json')
const fs = require('fs')
const zlib = require('zlib');

async function main (){
  const wallet = await Secp256k1HdWallet.fromMnemonic(
    config.mnemonic, undefined, "odin"
  );
  
  const [{ address }] = await wallet.getAccounts();
  const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

  // check our balance
  const account = await client.getAccount();
  console.log("Account:", account);

  const msg = {
    type: "oracle/CreateOracleScript",
    value: {
      name: 'fake oracle script',
      description: 'fake oracle script description',
      code: fs.readFileSync('./oracle_scripts/geo_data_source_v5.wasm').toString('base64'), // compression leads to error :(
      owner: address,
      sender: address,
      schema: "a",
      source_code_url: "a"
    }
  }
  const fee = {
    amount: coins(10, "loki"),
    gas: "2000000"
  }
  
  const res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)
}

main()
