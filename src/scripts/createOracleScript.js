const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgCreateOracleScript} = require("../../dist/oracle/v1/tx.js");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const config = require('../../config.json');
const fs = require('fs');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    const registry = new Registry();
    const typeUrl = "/oracle.v1.MsgCreateOracleScript";
    registry.register(typeUrl, MsgCreateOracleScript);

    const msg = {
        name: 'fake oracle script',
        description: 'fake oracle script description',
        code: fs.readFileSync('./oracle_scripts/mock.wasm').toString('base64'), // compression leads to error :(
        owner: account.address,
        sender: account.address,
        schema: "",
        source_code_url: ""
    };

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);
}

main()
