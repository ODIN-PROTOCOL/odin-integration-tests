let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../../../config.json')
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
    type: "oracle/CreateDataSource",
    value: {
      name: 'fake data source',
      description: 'fake data source description',
      executable: zlib.deflateSync(fs.readFileSync('./data_sources/geo-data-v5.py')).toString('base64'),
      owner: address,
      sender: address,
    }
  }
  const fee = {
    amount: coins(10, "loki"),
    gas: "200000"
  }
  
  const res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)
}

main()
