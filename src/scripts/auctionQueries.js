const {setupAuctionExtension} = require("./extensions/auctionExtension.js");
const {QueryClient} = require("@cosmjs/stargate");
const {Tendermint34Client} = require("@cosmjs/tendermint-rpc");

const config = require('../../config.json')
const {err} = require("./utils");


async function main() {
    const client = QueryClient.withExtensions(
        await Tendermint34Client.connect(config.rpc),
        setupAuctionExtension,
    );

    console.log("Params: ", (await client.auction.unverified.params().catch(err)));
    console.log("Status: ", (await client.auction.unverified.status().catch(err)));
}

if (require.main === module) {
    main();
}
