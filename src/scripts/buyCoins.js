const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgBuyCoins} = require("../../dist/auction/tx.js");
const {BroadcastMsg, ShowBalances, HD_DERIVATION} = require("./utils.js");
const {coin} = require("@cosmjs/launchpad");
const config = require('../../config.json');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    );
    let [account] = await wallet.getAccounts();

    // show balances before performing exchange
    await ShowBalances(account);

    const registry = new Registry();
    const typeUrl = "/auction.MsgBuyCoins";
    registry.register(typeUrl, MsgBuyCoins);

    const msg = {
        from: "minigeo",
        to: "loki",
        amount: coin(4, "minigeo"),
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

main();
