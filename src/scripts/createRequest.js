const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgRequestData} = require("../../dist/oracle/v1/tx.js");
const {SigningStargateClient} = require("@cosmjs/stargate");
const {coins} = require("@cosmjs/launchpad");
var Long = require("long");

const {
    Obi,
    ObiSpec,
    ObiInteger,
    ObiVector,
    ObiStruct,
    ObiString,
    ObiBytes,
} = require('@bandprotocol/obi.js')

const config = require('../../config.json')

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    let [account] = await wallet.getAccounts();

    const msg = {
        oracleScriptId: new Long(1),
        askCount: new Long(1),
        minCount: new Long(1),
        prepareGas: new Long(200000),
        executeGas: new Long(200000),
        calldata: new ObiStruct('{symbol:string,multiplier:u64}').encode({
            "symbol": "BTC",
            "multiplier": 1000000000
        }).toString('base64'),
        clientId: "1",
        sender: account.address,
        feeLimit: []
    };

    const registry = new Registry();
    const typeUrl = "/oracle.v1.MsgRequestData";
    registry.register(typeUrl, MsgRequestData)

    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    const fee = {
        amount: coins(10, "loki"),
        gas: "2000000"
    };

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    const res = await client.signAndBroadcast(account.address, [msgAny], fee);
    console.log('Tx result:', res);

    let requestID = JSON.parse(res.rawLog)[0].events[2].attributes[0].value
    console.log('Request ID:', requestID)
}

main()