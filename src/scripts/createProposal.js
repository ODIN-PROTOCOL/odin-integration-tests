const {ParameterChangeProposal} = require("../../dist/cosmos/params/v1beta1/params");
const {MsgSubmitProposal} = require("../../dist/cosmos/gov/v1beta1/tx.js");
const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const {coins} = require("@cosmjs/launchpad");
const config = require('../../config.json');

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    let msg = {
        content: {
            typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
            value: ParameterChangeProposal.encode({
                title: "Update mint air",
                description: "my awesome proposal",
                changes: [
                    {
                        subspace: "mint",
                        key: "MintAir",
                        value: "true"
                    }
                ]
            }).finish()
        },
        initialDeposit: coins(1000000000, "loki"),
        proposer: account.address
    }

    const registry = new Registry();
    const typeUrl = "/cosmos.gov.v1beta1.MsgSubmitProposal";
    registry.register(typeUrl, MsgSubmitProposal);

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);
}

main()
