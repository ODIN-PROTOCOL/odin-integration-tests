const {PubKey} = require("@cosmjs/stargate/build/codec/cosmos/crypto/secp256k1/keys");
const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const {Bech32} = require("@cosmjs/encoding");
const config = require('../../config.json');
const {fromBase64} = require("@cosmjs/encoding");

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    const [account] = await wallet.getAccounts();

    const typeUrlMsgCreateValidator = "/cosmos.staking.v1beta1.MsgCreateValidator";

    const registry = new Registry();

    let enc = new TextEncoder();
    console.log(account.pubkey);
    console.log(Buffer.from("lv4ZpB0+T5DUNquH8L1YTFEkBNSR1B3wNbOXEhkgs9g=").length);

    const msg = {
        description: {
            identity: "",
            website: "",
            moniker: "validator5",
            securityContact: "",
            details: "",
        },
        commission: {
            rate: "100000000000000000",
            maxRate: "200000000000000000",
            maxChangeRate: "100000000000000000"
        },
        minSelfDelegation: "1",
        delegatorAddress: account.address,
        validatorAddress: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
        pubkey: {
            typeUrl: "/cosmos.crypto.ed25519.PubKey",
            value: PubKey.encode({key: Buffer.from(fromBase64("YVo5TzlCK5Y5C+7lnOKMlHZKoGfLrEKhmpci3xNs5HA="))}).finish()
        },
        value: {
            denom: "loki",
            amount: "10000000"
        }
    };

    const msgAny = {
        typeUrl: typeUrlMsgCreateValidator,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);
}

main()