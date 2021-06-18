const {Tx} = require("@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx");

const {fromHex} = require("@cosmjs/encoding")

const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');

function err(reason) {
    console.log(reason);
}

async function main() {
    const client = await Tendermint34Client.connect(config.rpc);
    const txHash = "4FBA932E551DBD71B7CF29FAF058A7EE3B16628E9FF373411D40AC653A5CCCDB";
    // Tx
    // console.log('Tx by hash:', await client.tx({hash: fromHex(txHash)}).catch(err));

    const txs = await client.txSearch({query: `tx.height = 10`}).catch(err);
    console.log('Tx search:', txs);

    console.log('Tx raw:', txs.txs[0]);

    const decodedTx = Tx.decode(txs.txs[0].tx);
    console.log('Tx parsed:', decodedTx);

    console.log('Messages:', decodedTx.body.messages);
}

main();
