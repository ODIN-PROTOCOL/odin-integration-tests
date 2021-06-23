const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');
const {toHex} = require("@cosmjs/encoding");

function err(reason) {
    console.log(reason);
}

async function main() {
    const client = await Tendermint34Client.connect(config.rpc);

    // TODO: get rewards (and commission) from here
    console.log('Block results by height:', await client.blockResults(10).catch(err));

    console.log('Block by height:', await client.block(10).catch(err));

    console.log('Blockchain:', await client.blockchain(10, 12).catch(err));

    let block = await client.block(10).catch(err);
    console.log(toHex(block.blockId.hash).toUpperCase());
}

main()