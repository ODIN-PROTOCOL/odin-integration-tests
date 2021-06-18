const {
    Secp256k1HdWallet,
    SigningCosmosClient,
    GasPrice,
    BroadcastMode,
    coins,
} = require("@cosmjs/launchpad");
const config = require('../../../config.json')

async function main() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            prefix:"odin"
        }
    );


    const [{address}] = await wallet.getAccounts();
    const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString("1000000loki"), BroadcastMode.Block);

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
        amount: coins(0, "loki"),
        gas: "200000"
    }

    let res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)
}

main();
