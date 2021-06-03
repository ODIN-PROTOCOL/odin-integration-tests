const { Bech32 } = require("@cosmjs/encoding");

function main (){
  let address = 'odinvalcons17geerdwmlxpwxlahmt02vj4wy89wfstjnjwy94'
  console.log(Bech32.encode('odinvaloper', Bech32.decode(address).data))
  console.log(Bech32.encode('odin', Bech32.decode(address).data))
}

main();
