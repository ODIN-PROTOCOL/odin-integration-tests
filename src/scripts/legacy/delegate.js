let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
let { Bech32 } = require("@cosmjs/encoding");
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

  const msg = {
    type: "cosmos-sdk/MsgDelegate",
    value: {
      delegator_address: address,
      validator_address: Bech32.encode('odinvaloper', Bech32.decode(address).data),
      amount: {
        denom: "odin",
        amount: "10000000"
      }
    }
  }
  const fee = {
    amount: coins(200, "odin"),
    gas: "200000", // 180k
  }
  
  const res = await client.signAndBroadcast([msg], fee, "");
  console.log('Tx result:', res)
}

main()
