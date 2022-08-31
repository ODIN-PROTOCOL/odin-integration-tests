const {ParameterChangeProposal} = require("../../dist/cosmos/params/v1beta1/params");
const {MsgSubmitProposal} = require("../../dist/cosmos/gov/v1beta1/tx.js");
const {DirectSecp256k1HdWallet, Registry} = require("@cosmjs/proto-signing");
const {BroadcastMsg, HD_DERIVATION} = require("./utils.js");
const {coins} = require("@cosmjs/launchpad");
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

    let msg = {
        content: {
            typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
            value: ParameterChangeProposal.encode({
                title: "Mint 17.5m Geos for cosmos ecosystem Airdrop",
                description: "### Summary \nWe are requesting to mint 17500000 GEO to be minted on the ODIN chain for the cosmos Ecosystem airdrop.\n\n### Details\n50% of the total GEO supply will be minted on the ODIN chain in the next few months.\nGEO, the first ODT token, will be distributed among the following:\n\n1. ODIN Stakers &  liquidity providers ($ODIN/Osmos)\n2. Atom Stakers\n3. Osmosis Stakers\n\nMinimum amount & snapshot dates to be announced.\n\nThank you!",
                changes: [
                    {
                        subspace: "mint",
                        key: "MaxAllowedMintVolume",
                        value: '[{"denom":"mGeo", "amount":"17500000000000"}, {"denom":"unit_denom", "amount":"amount"}]'
                    },
                    {
                        subspace: "mint",
                        key: "AllowedMintDenoms",
                        value: '[{"token_unit_denom":"mGeo", "token_denom":"geo"},{"token_unit_denom":"unit_denom", "token_denom":"denom"}]'
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

main();
