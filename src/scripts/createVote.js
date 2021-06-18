const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {MsgVote} = require("../../dist/cosmos/gov/v1beta1/tx");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const config = require('../../config.json');
const Long = require("long");

const OptionYes = 1;

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    );
    let [account] = await wallet.getAccounts();

    let msg = {
        proposalId: new Long(1),
        voter: account.address,
        option: OptionYes,
    }

    const registry = new Registry();
    const typeUrl = "/cosmos.gov.v1beta1.MsgVote";
    registry.register(typeUrl, MsgVote);

    const msgAny = {
        typeUrl: typeUrl,
        value: msg,
    };

    await BroadcastMsg(wallet, registry, msgAny);
}

main();
