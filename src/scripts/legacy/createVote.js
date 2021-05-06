let {
    Secp256k1HdWallet,
    SigningCosmosClient,
    GasPrice,
    BroadcastMode,
    coins,
} = require("@cosmjs/launchpad");
let {Bech32} = require("@cosmjs/encoding");
const config = require('../../../config.json')

async function main() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(
        config.mnemonic, undefined, "odin"
    );

    const [{address, pubkey}] = await wallet.getAccounts();
    const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1odin'), GasPrice.fromString("1000000odin"), BroadcastMode.Block);

    // check our balance
    const account = await client.getAccount();
    console.log("Account:", account);

    let msg = {
        type: "cosmos-sdk/MsgVote",
        value: {
            proposal_id: "1",
            voter: address,
            option: "Yes",
        }
    }
    const fee = {
        amount: coins(0, "odin"),
        gas: "200000"
    }

    let res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)
}

main()
