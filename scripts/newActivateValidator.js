let {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
let {coins, encodeBech32Pubkey, encodeSecp256k1Pubkey} = require("@cosmjs/launchpad");
let {Bech32, fromBase64, toBase64} = require("@cosmjs/encoding");
let {SigningStargateClient, defaultRegistryTypes} = require("@cosmjs/stargate");
let config = require('../config.json')
let {MsgCreateValidator} = require("@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx");
let {CommissionRates} = require("@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/staking");
let protobuf = require("protobufjs");
const {PublicKey} = require("@cosmjs/stargate/build/codec/tendermint/crypto/keys");
protobuf.parse.defaults.keepCase = true;

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    const [account] = await wallet.getAccounts();
    console.log("Account:", account);

    console.log(encodeBech32Pubkey(encodeSecp256k1Pubkey(account.pubkey), 'odinvalconspub'))

    const typeUrlMsgActivate = "/oracle.v1.MsgActivate";
    const typeUrlMsgCreateValidator = "/cosmos.staking.v1beta1.MsgCreateValidator";

    let msg = {
        validator: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
    }

    const registry = new Registry();

    registry.register(typeUrlMsgCreateValidator, MsgCreateValidator);
    protobuf.load("proto/tx.proto", function (err, root) {
        if (err)
            throw err;

        // Obtain a message type
        let MsgActivate = root.lookupType("oracle.v1.MsgActivate");
        registry.register(typeUrlMsgActivate, MsgActivate)

        let buffer = MsgActivate.encode(msg).finish();
        console.log(buffer)

        let message = MsgActivate.decode(buffer);
        console.log(message)
    });

    let msgAny = {
        typeUrl: typeUrlMsgActivate,
        value: msg,
    };

    const fee = {
        amount: coins(0, "loki"),
        gas: "200000"
    }

    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    let res = await client.signAndBroadcast(account.address, [msgAny], fee);
    console.log('Tx result:', JSON.stringify(res));

    // msg = {
    //     description: {
    //         moniker: "validator5",
    //     },
    //     commission: {
    //         rate: "1",
    //         maxRate: "2",
    //         maxChangeRate: "1"
    //     },
    //     minSelfDelegation: "1",
    //     delegatorAddress: account.address,
    //     validatorAddress: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
    //     pubkey: {
    //         typeUrl: "/cosmos.crypto.secp256k1.PubKey",
    //         value: account.pubkey
    //     },
    //     value: {
    //         denom: "odin",
    //         amount: "10000000"
    //     }
    // }
    //
    // msgAny = {
    //     typeUrl: typeUrlMsgCreateValidator,
    //     value: msg,
    // };
    //
    // console.log(MsgCreateValidator.toJSON(msg));

    // res = await client.signAndBroadcast(account.address, [msgAny], fee);
    // console.log('Tx result:', JSON.stringify(res));
}

main()