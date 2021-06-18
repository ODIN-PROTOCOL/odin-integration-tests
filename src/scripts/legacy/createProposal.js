const {
    Secp256k1Wallet,
    SigningCosmosClient,
    GasPrice,
    coins,
} = require("@cosmjs/launchpad");
const config = require('../../../config.json')

const base64 = 'qW5i7TlV5lvjqqPxLYe2tc8mA57PqUjcUQeklUGOVDA='

async function main() {
    console.log(Buffer.from(base64, 'base64'))

    const wallet = await Secp256k1Wallet.fromKey(
        // your mnemonic here 👇
        Buffer.from(base64, 'base64'), "odin"
    );

    const [{ address }] = await wallet.getAccounts();
    console.log("Address:", address);

    const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

    // check our balance
    const account = await client.getAccount();
    console.log("Account:", account);

    let msg = {
        type: "cosmos-sdk/MsgSubmitProposal",
        value: {
            content: {
                type: "cosmos-sdk/ParameterChangeProposal",
                value: {
                    title: "Update mint air",
                    description: "my awesome proposal",
                    changes: [
                        {
                            "subspace": "mint",
                            "key": "MintAir",
                            "value": "true"
                        }
                    ]
                }
            },
            initial_deposit: coins(1000000000, "loki"),
            proposer: address
        }
    }
    const fee = {
        amount: coins(0, "loki"),
        gas: "200000"
    }

    let res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)

    res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)

    msg = {
        type: "cosmos-sdk/MsgVote",
        value: {
            proposal_id: "1",
            voter: address,
            option: "Yes",
        }
    }

    res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)
}

main();
