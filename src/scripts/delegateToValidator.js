const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {BroadcastMsg, ShowValidator, HD_DERIVATION} = require("./utils.js");
const {Bech32} = require("@cosmjs/encoding");
const {coin} = require("@cosmjs/launchpad");
const config = require('../../config.json');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    // show validator before performing delegation
    await ShowValidator(account);

    const registry = new Registry();
    const typeUrl = "/cosmos.staking.v1beta1.MsgDelegate";

    const msg = {
        delegatorAddress: account.address,
        validatorAddress: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
        amount: coin(10000000, "loki")
    }

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);

    // show validator after performing delegation
    await ShowValidator(account);
}

main()
