const {Tx} = require("@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx");

const {fromHex} = require("@cosmjs/encoding")

const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json');
const {TxResult} = require("@cosmjs/stargate/build/codec/tendermint/abci/types");
const {StargateClient} = require("@cosmjs/stargate");
const {QueryClient} = require("@cosmjs/stargate");
const {fromUtf8} = require("@cosmjs/encoding");
const {MsgSend} = require("@cosmjs/stargate/build/codec/cosmos/bank/v1beta1/tx");

function err(reason) {
    console.log(reason);
}

async function main() {
    const client = await Tendermint34Client.connect(config.rpc);
    const txHash = "003B9B85EEB3FA840EC5698336B4C1CD3108480C75009287539AFE85DCE4B00E";

    const txs = await client.txSearch({query: `message.action='send' AND tx.height <= 100000`}).catch(err);
    console.log('Tx search:', txs);

    console.log('Tx raw:', txs.txs[0]);

    console.log('Tx res:', fromUtf8(txs.txs[0].result.data));

    const decodedTx = Tx.decode(txs.txs[0].tx);
    console.log('Tx parsed:', decodedTx);

    console.log('Messages:', decodedTx.body.messages);

    console.log('Raw message', decodedTx.body.messages[0]);

    console.log('Message:', MsgSend.decode(decodedTx.body.messages[0].value));

    // const tx = await client.tx({hash: fromHex(txHash)}).catch(err);
    // console.log('Tx query:', tx);
    //
    // console.log('Tx query decoded', TxResult.decode(tx.tx));
    //
    // const queryClient = new StargateClient(client);
    // console.log('Tx:', await queryClient.getTx(txHash));
}

main();
