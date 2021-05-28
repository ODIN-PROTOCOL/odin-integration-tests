const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgExchange} = require("../../dist/coinswap/tx.js");
const {BroadcastMsg, ShowBalances, HD_DERIVATION} = require("./utils.js");
const {coin} = require("@cosmjs/launchpad");
const config = require('../../config.json');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    // show balances before performing exchange
    await ShowBalances(account);

    const registry = new Registry();
    const typeUrl = "/coinswap.MsgExchange";
    registry.register(typeUrl, MsgExchange);

    const msg = {
        from: "loki",
        to: "minigeo",
        amount: coin(1, "loki"),
        requester: account.address,
    }

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);

    // show balances after performing exchange
    await ShowBalances(account);
}

main()
