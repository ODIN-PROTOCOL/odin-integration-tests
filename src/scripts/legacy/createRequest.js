let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../../../config.json')
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
  const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

  let account = await client.getAccount(config.data_provider_address);
  console.log("Data provider account:", account);

  account = await client.getAccount();
  console.log("Account:", account);

  const msg = {
    type: "oracle/Request",
    value: {
      oracle_script_id: '4',
      calldata: new ObiStruct('{models:[string]}').encode({
        "models": [
          "iPhone 8",
          "iPhone X",
          "iPhone 11",
          "iPhone 12"
        ]
      }).toString('base64'),
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
  console.log(request.result.responsePacketData.result.toString(), request.result.responsePacketData.result.length)

  account = await client.getAccount();
  console.log("Requester Account:", account);

  account = await client.getAccount(config.data_provider_address);
  console.log("Data Provider Account:", account);
}

main()

//first
/* new ObiStruct('{symbol:string,multiplier:u64}').encode({"symbol": "BTC", "multiplier": 1000000000}).toString('base64'), */

//second
/* new ObiStruct('{uuids:[string]}').encode({
        uuids: [
           "F46795AA-4D66-4D8E-911D-0D8E9BD905A0",
           "33DE13AC-F5A8-4E62-AC5A-A3127CB9F2CB",
           "29BC341C-6CB6-4773-961E-CE098CF313AC",
           "631EDD2F-2637-4243-9792-9E35A05B994C",
           "B4249D2C-995F-49C4-9A31-8F1FD128AC0F"
        ]
     }) */