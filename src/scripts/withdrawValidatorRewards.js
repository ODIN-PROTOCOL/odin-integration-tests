const {MsgWithdrawValidatorCommission} = require("@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/tx");
const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {BroadcastMsg, ShowBalances, ShowValidatorOutstandingRewards} = require("./utils.js");
let {Bech32} = require("@cosmjs/encoding");
const config = require('../../config.json')

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    let [account] = await wallet.getAccounts();

    // show outstanding rewards
    await ShowValidatorOutstandingRewards(account);

    // show balances before performing withdrawal
    await ShowBalances(account);

    const registry = new Registry();
    const typeUrl = "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission";
    registry.register(typeUrl, MsgWithdrawValidatorCommission);

    const msg = {
        validatorAddress: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
    };

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);

    // show balances after performing withdrawal
    await ShowBalances(account);
}

main()
