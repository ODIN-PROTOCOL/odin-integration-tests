const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgEditDataSource} = require("../../dist/oracle/v1/tx.js");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const config = require('../../config.json');
const Long = require("long");
const zlib = require('zlib');
const fs = require('fs');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    const registry = new Registry();
    const typeUrl = "/oracle.v1.MsgEditDataSource";
    registry.register(typeUrl, MsgEditDataSource);

    const msg = {
        dataSourceId: new Long(2),
        executable: fs.readFileSync('./data_sources/geo-data-v5.py').toString('base64'),
        owner: account.address,
        sender: account.address,
    };

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);
}

main()
