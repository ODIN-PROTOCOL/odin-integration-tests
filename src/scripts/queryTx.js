const {
    StargateClient
} = require("@cosmjs/stargate");

const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');

function err(reason) {
    console.log(reason);
}

async function main() {
    const client = new StargateClient(await Tendermint34Client.connect(config.rpc));
    const txHash = "4FBA932E551DBD71B7CF29FAF058A7EE3B16628E9FF373411D40AC653A5CCCDB";
    // Tx
    console.log('Tx by hash:', await client.getTx(txHash).catch(err));
}

main();
