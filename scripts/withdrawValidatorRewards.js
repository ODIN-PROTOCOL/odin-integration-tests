let {
    Secp256k1HdWallet,
    SigningCosmosClient,
    GasPrice,
    coins,
    encodeBech32Pubkey,
    encodeSecp256k1Pubkey
} = require("@cosmjs/launchpad");
let {Bech32} = require("@cosmjs/encoding");
let {
    LcdClient,
    setupDistributionExtension,
} = require("@cosmjs/launchpad");
const config = require('../config.json')

async function main() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(
        config.mnemonic, undefined, "odin"
    );

    const [{address, pubkey}] = await wallet.getAccounts();
    const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1loki'));

    // check our balance
    let account = await client.getAccount();
    console.log("Account:", account);

    const lcdclient = LcdClient.withExtensions(
        {apiUrl: config.api},
        setupDistributionExtension,
    );
    let rewards = await lcdclient.distribution.validatorOutstandingRewards(Bech32.encode('odinvaloper', Bech32.decode(address).data))
    console.log("Outstanding rewards: ", rewards)

    let msg = {
        type: "cosmos-sdk/MsgWithdrawValidatorCommission",
        value: {
            validator_address: Bech32.encode('odinvaloper', Bech32.decode(address).data),
        }
    }
    const fee = {
        amount: coins(10, "loki"),
        gas: "200000"
    }

    let res = await client.signAndBroadcast([msg], fee, "");
    console.log('Tx result:', res)

    account = await client.getAccount();
    console.log("Account:", account);
}

main()
