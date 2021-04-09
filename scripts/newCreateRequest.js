let {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
let {Secp256k1} = require("@cosmjs/crypto")
let {SigningStargateClient, defaultRegistryTypes} = require("@cosmjs/stargate");
let {coins, coin} = require("@cosmjs/launchpad");
require("@bandprotocol/bandchain.js")
let protobuf = require("protobufjs");
const { Client } = require('@bandprotocol/bandchain.js')
// God bless this config :)
protobuf.parse.defaults.keepCase = true;

const {
    Obi,
    ObiSpec,
    ObiInteger,
    ObiVector,
    ObiStruct,
    ObiString,
    ObiBytes,
} = require('@bandprotocol/obi.js')

const config = require('../config.json')

function err(reason) {
    console.log(reason)
}

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    let [account] = await wallet.getAccounts();

    const msg = {
        oracle_script_id: 1,
        ask_count: 1,
        min_count: 1,
        prepare_gas: 200000,
        execute_gas: 200000,
        calldata: new ObiStruct('{symbol:string,multiplier:u64}').encode({
            "symbol": "BTC",
            "multiplier": 1000000000
        }).toString('base64'),
        client_id: "1",
        sender: account.address,
        fee_limit: []
    };

    const registry = new Registry();

    const typeUrl = "/oracle.v1.MsgRequestData";
    let MsgRequestData;
    protobuf.load("proto/tx.proto", function (err, root) {
        if (err)
            throw err;

        // Obtain a message type
        MsgRequestData = root.lookupType("oracle.v1.MsgRequestData");
        registry.register(typeUrl, MsgRequestData)

        let buffer = MsgRequestData.encode(msg).finish();
        console.log(buffer)

        let message = MsgRequestData.decode(buffer);
        console.log(message)
    });

    // console.log(account)

    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    const fee = {
        amount: coins(10, "loki"),
        gas: "2000000"
    };

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    console.log(msgAny)

    console.log(account.address)

    const res = await client.signAndBroadcast(account.address, [msgAny], fee);
    console.log('Tx result:', res);

    let requestID = JSON.parse(res.rawLog)[0].events[2].attributes[0].value
    console.log('Request ID:', requestID)
}

main()