const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgRequestData} = require("../../dist/oracle/v1/tx.js");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const Long = require("long");
const {ObiStruct} = require('@bandprotocol/obi.js')
const config = require('../../config.json')

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    );
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

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    const res = await BroadcastMsg(wallet, registry, msgAny);

    let requestID = JSON.parse(res.rawLog)[0].events[2].attributes[0].value
    console.log('Request ID:', requestID)
}

main();
