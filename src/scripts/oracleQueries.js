const {setupOracleExtension} = require("./extensions/oracleExtension.js");
const {
    QueryClient,
} = require("@cosmjs/stargate");
const {
    Tendermint34Client
} = require("@cosmjs/tendermint-rpc");
const {HD_DERIVATION} = require("./utils.js");
const {DirectSecp256k1HdWallet} = require("@cosmjs/proto-signing");
const {Bech32} = require("@cosmjs/encoding");
const Long = require("long");
const config = require('../../config.json')
const {err} = require("./utils");

// TODO: handle long returns
async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, HD_DERIVATION, "odin");
    let [account] = await wallet.getAccounts();

    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupOracleExtension,
    );

    console.log("Params: ", (await client.oracle.unverified.params().catch(err)));
    const counts = (await client.oracle.unverified.counts().catch(err));
    console.log("Counts: ", counts);
    // console.log("Data: ", (await client.oracle.unverified.data("0acc4f276eadba8e1f496d4c6f35adfef3af19f127cb49d124f96bfdfb1cf61d").catch(err)));
    if (counts.dataSourceCount > 0) {
        console.log("Data source: ", (await client.oracle.unverified.dataSource(new Long(1)).catch(err)));
    }
    if (counts.oracleScriptCount > 0) {
        console.log("Oracle script: ", (await client.oracle.unverified.oracleScript(new Long(1)).catch(err)));
    }
    if (counts.requestCount > 0) {
        console.log("Request: ", (await client.oracle.unverified.request(new Long(1)).catch(err)));
    }
    console.log("Validator: ", await client.oracle.unverified.validator(Bech32.encode('odinvaloper', Bech32.decode(account.address).data)));
    console.log("Reporters: ", await client.oracle.unverified.reporters(Bech32.encode('odinvaloper', Bech32.decode(account.address).data)));
    console.log("Active Validators: ", (await client.oracle.unverified.activeValidators()).count.toString());
    // TODO: revisit when GRPC request search works
    // if (counts.requestCount > 0) {
    //     console.log("Request Search: ", await client.oracle.unverified.requestSearch(new Long(1), "", new Long(1), new Long(1)));
    // }
    console.log("Data providers pool: ", await client.oracle.unverified.dataProvidersPool());
}

if (require.main === module) {
    main();
}