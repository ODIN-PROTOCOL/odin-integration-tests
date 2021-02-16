let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../config.json')
const fs = require('fs')
const zlib = require('zlib');

async function main (){
  const wallet = await Secp256k1HdWallet.fromMnemonic(
    config.mnemonic, undefined, "odin"
  );
  
  const [{ address }] = await wallet.getAccounts();
  console.log(address)
  const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

  // check our balance
  const account = await client.getAccount();
  console.log("Account:", account);

  const msg = {
    type: "oracle/Request",
    value: {
      oracle_script_id: '1',
      calldata: Buffer.from('00000003425443000000003b9aca00', 'hex').toString('base64'),
      ask_count: '1',
      min_count: '1',
      client_id: '1',
      sender: address
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
