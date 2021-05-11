const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgCreateDataSource} = require("../../dist/oracle/v1/tx.js");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const {coins} = require("@cosmjs/launchpad");
const config = require('../../config.json');
const fs = require('fs');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    const registry = new Registry();
    const typeUrl = "/oracle.v1.MsgCreateDataSource";
    registry.register(typeUrl, MsgCreateDataSource);

    const msg = {
        name: 'fake data source',
        description: 'fake data source description',
        executable: fs.readFileSync('./data_sources/geo-data-v5.py').toString('base64'),
        fee: coins(1, "loki"),
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
