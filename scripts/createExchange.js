let {Secp256k1HdWallet, SigningCosmosClient, GasPrice, coins, coin} = require("@cosmjs/launchpad");
const config = require('../config.json')

function err(resp) {
    console.log(resp)
}

async function main() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(
        config.mnemonic, undefined, "odin"
    );

    const [{address}] = await wallet.getAccounts();
    const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

    // check our balance
    let account = await client.getAccount();
    console.log("Account:", account);

    const msg = {
        type: "coinswap/Exchange",
        value: {
            from: "geo",
            to: "loki",
            amount: coin(10, "geo"),
            requester: address,
        }
    }
    const fee = {
        amount: coins(10, "loki"),
        gas: "2000000"
    }

    const res = await client.signAndBroadcast([msg], fee, "").catch(err);
    console.log('Tx result:', res)

    account = await client.getAccount();
    console.log("Account:", account);
}

main()
