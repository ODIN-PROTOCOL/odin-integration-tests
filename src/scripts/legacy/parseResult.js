let { Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins } = require( "@cosmjs/launchpad");
const config = require('../../../config.json')
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

async function main (){
  console.log(Buffer.from('AAAADkhlbGxvLCBXb3JsZCEK', 'base64').toString())


}

main()
