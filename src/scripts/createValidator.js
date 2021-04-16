const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {coins} = require("@cosmjs/launchpad");
const {Bech32} = require("@cosmjs/encoding");
const {SigningStargateClient, defaultRegistryTypes} = require("@cosmjs/stargate");
const config = require('../../config.json');
const {MsgCreateValidator} = require("@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx");
const {PubKey} = require("@cosmjs/stargate/build/codec/cosmos/crypto/secp256k1/keys");

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    const [account] = await wallet.getAccounts();
    console.log("Account:", account);

    const typeUrlMsgCreateValidator = "/cosmos.staking.v1beta1.MsgCreateValidator";

    const registry = new Registry(defaultRegistryTypes);

    const fee = {
        amount: coins(0, "loki"),
        gas: "200000"
    };

    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    const msg = {
        description: {
            identity: "",
            website: "",
            moniker: "validator6",
            securityContact: "",
            details: "",
        },
        commission: {
            rate: "1",
            maxRate: "2",
            maxChangeRate: "1"
        },
        minSelfDelegation: "1",
        delegatorAddress: account.address,
        validatorAddress: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
        pubkey: {
            typeUrl: "/cosmos.crypto.ed25519.PubKey",
            value: PubKey.encode({key: account.pubkey}).finish()
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

    console.log(MsgCreateValidator.toJSON(msg));

    const res = await client.signAndBroadcast(account.address, [msgAny], fee);
    console.log('Tx result:', res);
}

main()