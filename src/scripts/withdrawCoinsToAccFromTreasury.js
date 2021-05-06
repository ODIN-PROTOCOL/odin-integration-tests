const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgWithdrawCoinsToAccFromTreasury} = require("../../dist/mint/tx.js");
const {BroadcastMsg, ShowTreasuryPool, ShowBalances} = require("./utils.js");
const {coins} = require("@cosmjs/launchpad");
const config = require('../../config.json');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    let [account] = await wallet.getAccounts();

    // show treasury pool and balances before performing exchange
    await ShowTreasuryPool();
    await ShowBalances(account);

    const registry = new Registry();
    const typeUrl = "/mint.MsgWithdrawCoinsToAccFromTreasury";
    registry.register(typeUrl, MsgWithdrawCoinsToAccFromTreasury);

    const msg = {
        amount: coins(10, 'odin'),
        receiver: account.address,
        sender: account.address,
    }

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);

    // show treasury pool and balances after performing withdraw
    await ShowTreasuryPool();
    await ShowBalances(account);
}

main();
