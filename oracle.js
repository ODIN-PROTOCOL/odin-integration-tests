let { Secp256k1HdWallet, SigningCosmosClient,GasPrice, coins } = require( "@cosmjs/launchpad");

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

  let msg = {
    type: "oracle/CreateDataSource",
    value: {
      owner: account.address,
      name: 'aa',
      description: 'bb',
      executable: 'exec',
      sender: account.address,
    },
  };
  let fee = {
    amount: coins(2000, "uband"),
    gas: "180000", // 180k
  };
  let res = await client.signAndBroadcast([msg], fee);
  console.log(res)

  msg = {
    type: "oracle/CreateOracleScript",
    value: {
      owner: account.address,
      name: 'aa',
      description: 'bb',
      code: 'exec',
      sender: account.address,
    },
  };
  fee = {
    amount: coins(2000, "uband"),
    gas: "180000", // 180k
  };
  res = await client.signAndBroadcast([msg], fee);
  console.log(res)
}

main()