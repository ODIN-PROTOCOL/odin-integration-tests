let { Secp256k1HdWallet, Secp256k1Wallet, SigningCosmosClient,GasPrice, coins } = require( "@cosmjs/launchpad");
let { Bech32 } = require("@cosmjs/encoding");
const config = require('../config.json')
const {BroadcastMode} = require("@cosmjs/launchpad");

async function main (){
    console.log(Buffer.from(config.validator_priv_key_base64, 'base64'))

    const validatorWallet = await Secp256k1Wallet.fromKey(
        // your mnemonic here 👇
        Buffer.from(config.validator_priv_key_base64, 'base64'), "odin"
    );

    let [{ address }] = await validatorWallet.getAccounts();
    console.log("Address:", address);

    let client = new SigningCosmosClient(config.api, address, validatorWallet, GasPrice.fromString('1loki'));

    // check our balance
    let validatorAccount = await client.getAccount();
    console.log("Validator Account:", validatorAccount);

    const wallet = await Secp256k1HdWallet.fromMnemonic(
        config.mnemonic, undefined, "odin"
    );

    let pubkey;
    [{address, pubkey}] = await wallet.getAccounts();
    client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'), GasPrice.fromString("1000000loki"), BroadcastMode.Block);

    // check our balance
    let account = await client.getAccount();
    console.log("Account:", account);

    let msg = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
            delegator_address: address,
            validator_address: Bech32.encode('odinvaloper', Bech32.decode(validatorAccount.address).data),
            amount: {
                denom: "loki",
                amount: "1000000000"
            }
        }
    }

    const fee = {
        amount: coins(0, "loki"),
        gas: "200000"
    }

    let res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)
}

main()