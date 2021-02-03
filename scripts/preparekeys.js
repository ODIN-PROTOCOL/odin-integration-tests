let { Secp256k1HdWallet, SigningCosmosClient, pubkeyToAddress, coins, coin, encodeBech32Pubkey, encodeSecp256k1Pubkey } = require( "@cosmjs/launchpad");
let { Bech32 } = require("@cosmjs/encoding");
const config = require('../config.json')

async function main (){
  //decodeBech32Pubkey()
  let address = 'odinvalcons17geerdwmlxpwxlahmt02vj4wy89wfstjnjwy94'
  console.log(Bech32.encode('odinvaloper', Bech32.decode(address).data))
  console.log(Bech32.encode('odin', Bech32.decode(address).data))
  
}

main()
