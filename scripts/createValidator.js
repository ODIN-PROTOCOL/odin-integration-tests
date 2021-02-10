let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins, coin, encodeBech32Pubkey, encodeSecp256k1Pubkey } = require( "@cosmjs/launchpad");
let { Bech32 } = require("@cosmjs/encoding");
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

  let msg = {
    type: "cosmos-sdk/MsgCreateValidator",
    value: {
      description: {
        moniker: "validator5",
        identity: "",
        website: "",
        security_contact: "",
        details: ""
      },
      commission: {
        rate: "0.100000000000000000",
        max_rate: "0.200000000000000000",
        max_change_rate: "0.010000000000000000"
      },
      min_self_delegation: "1",
      delegator_address: address,
      validator_address: Bech32.encode('odinvaloper', Bech32.decode(address).data),
      pubkey: encodeBech32Pubkey(encodeSecp256k1Pubkey(pubkey), 'odinvalconspub'),
      value: {
        denom: "loki",
        amount: "10000000"
      }
    }
  }
  const fee = {
    amount: coins(10, "loki"),
    gas: "200000"
  }
  
  let res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)

  msg = {
    type: "oracle/Activate",
    value: {
      validator: Bech32.encode('odinvaloper', Bech32.decode(address).data),
    }
  }
  res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)

  // msg = {
  //   type: "oracle/AddReporter",
  //   value: {
  //     validator: Bech32.encode('odinvaloper', Bech32.decode(address).data),
  //     reporter: address
  //   }
  // }
  // res = await client.signAndBroadcast([msg], fee, "");
  // console.log('Tx result:', res)
}

main()
