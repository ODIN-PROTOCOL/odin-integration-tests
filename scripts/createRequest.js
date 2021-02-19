let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../config.json')
const fs = require('fs')
const zlib = require('zlib');
const {
  Obi,
  ObiSpec,
  ObiInteger,
  ObiVector,
  ObiStruct,
  ObiString,
  ObiBytes,
} = require('@bandprotocol/obi.js')
const { Client } = require('@bandprotocol/bandchain.js')

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
      calldata: new ObiStruct('{symbol:string,multiplier:u64}').encode({"symbol": "BTC", "multiplier": 1000000000}).toString('base64'),
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
  let requestID = res.logs[0].events[2].attributes[0].value
  console.log('Request ID:', requestID)
  let bandClient = new Client(config.api)
  console.log('waiting for report')
  await new Promise(resolve => setTimeout(resolve, 10000));
  console.log('let check')
  await new Promise(resolve => setTimeout(resolve, 1000));
  let request = await bandClient.getRequestByID(Number(requestID))
  console.log(request)
  console.log(request.result.responsePacketData.result.toString())
}

main()
