let {
    Secp256k1HdWallet,
    SigningCosmosClient,
    GasPrice,
    coins,
} = require('@cosmjs/launchpad');
const config = require('../../../config.json');
const axios = require('axios')

function getRequest(route) {
    return axios.get(config.api + route, {});
}

async function main() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(
        config.mnemonic, undefined, 'odin'
    );

    const [{address}] = await wallet.getAccounts();
    const client = new SigningCosmosClient(config.api, address, wallet, GasPrice.fromString('1odin'));

    let receiverAccount = await client.getAccount(config.data_provider_address);
    console.log('  Receiver balance before minting:', receiverAccount.balance);

    const msg = {
        type: 'mint/WithdrawCoinsToAccFromTreasury',
        value: {
            amount: coins(10, 'odin'),
            receiver: 'odin1nnfeguq30x6nwxjhaypxymx3nulyspsuja4a2x',
            sender: address,
        }
    }
    const fee = {
        amount: coins(10, 'odin'),
        gas: '200000'
    }

    const result = await client.signAndBroadcast([msg], fee, '');
    console.log('  Tx result:', result);

    receiverAccount = await client.getAccount(config.data_provider_address);
    console.log('  Receiver balance after minting:', receiverAccount.balance);

    const treasuryPoolRoute = '/minting/treasury_pool'
    console.log('  Treasury pool: ', (await getRequest(treasuryPoolRoute)).data);
}

main();
