let { Secp256k1Wallet, SigningCosmosClient,GasPrice, coins } = require( "@cosmjs/launchpad");
let { Bech32 } = require("@cosmjs/encoding");

let base64 = 'qW5i7TlV5lvjqqPxLYe2tc8mA57PqUjcUQeklUGOVDA='

async function main (){
  console.log(Buffer.from(base64, 'base64'))

  const wallet = await Secp256k1Wallet.fromKey(
    // your mnemonic here 👇
    Buffer.from(base64, 'base64'), "odin"
  );
  
  const [{ address }] = await wallet.getAccounts();
  console.log("Address:", address);

  const lcdApi = "http://127.0.0.1:1317";
  const client = new SigningCosmosClient(lcdApi, address, wallet, GasPrice.fromString('1loki'));

  // check our balance
  const account = await client.getAccount();
  console.log("Account:", account); 

  let msg = {
    type: "oracle/Activate",
    value: {
      validator: Bech32.encode('odinvaloper', Bech32.decode(address).data),
    }
  }
  const fee = {
    amount: coins(10, "loki"),
    gas: "200000"
  }
  let res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)

  msg = {
    type: "oracle/AddReporter",
    value: {
      validator: Bech32.encode('odinvaloper', Bech32.decode(address).data),
      reporter: "odin13k7pr33s0m5vknd7ggsm4z50l94wa2s9qvplx6"
    }
  }
  res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)
}

main()