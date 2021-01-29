let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins, coin } = require( "@cosmjs/launchpad");

let mnemonic = 'addict lecture cruel avoid agent tortoise little gap valley eternal retreat sight deliver anxiety crystal leg comic fine weekend junk neither hour educate type'

async function main (){
const wallet = await Secp256k1HdWallet.fromMnemonic(
    // your mnemonic here 👇
    mnemonic, undefined, "band"
  );
  
  const [{ address }] = await wallet.getAccounts();
  console.log("Address:", address);
;
  const lcdApi = "http://127.0.0.1:1317";
  const client = new SigningCosmosClient(lcdApi, address, wallet, GasPrice.fromString('1uband'));

  // check our balance
  const account = await client.getAccount();
  console.log("Account:", account);

  const validator = await client.getAccount('band1cg26m90y3wk50p9dn8pema8zmaa22plxa0hnrg');
  console.log("Validator:", validator);

  // Send tokens
  // const recipient = "band1k9av7fcjzfc8j30f5ke3jnnzs7hgngpwr3g3r4";
  // const res = await client.sendTokens(validator.address, coins(12, "uband"));
  // console.log(res)

  const msg = {
    type: "cosmos-sdk/MsgDelegate",
    value: {
      delegator_address: account.address,
      validator_address: "bandvaloper1cg26m90y3wk50p9dn8pema8zmaa22plx3ensxr",
      amount: coin(300000, "uband"),
    },
  };
  const fee = {
    amount: coins(2000, "uband"),
    gas: "180000", // 180k
  };
  const res = await client.signAndBroadcast([msg], fee);
  console.log(res)
}

main()