const {PubKey} = require("@cosmjs/stargate/build/codec/cosmos/crypto/secp256k1/keys");
const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgCreateVestingAccount} = require("../../dist/cosmos/vesting/v1beta1/tx.js");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const {Bech32} = require("@cosmjs/encoding");
const config = require('../../config.json');
const Long = require("long");

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    );

    const [account] = await wallet.getAccounts();

    const registry = new Registry();
    const typeUrlMsgCreateVestingAccount = "/cosmos.vesting.v1beta1.MsgCreateVestingAccount";
    registry.register(typeUrlMsgCreateVestingAccount, MsgCreateVestingAccount);



    const msg = {
        fromAddress: account.address,
        toAddress: "odin1lpr2zq308aae8ak8jze86s02cyx8u3wmk5xusd",
        amount: [{
            denom: "loki",
            amount: "1000000000"
        }],
        endTime: new Long(Date.now() + 24*60*60*1000),
        delayed: false
    };

    const msgAny = {
        typeUrl: typeUrlMsgCreateVestingAccount,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);
}

main();