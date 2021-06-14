module.exports = {
    setupAuctionExtension
}

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryAuction = require("../../../dist/auction/query.js")

function setupAuctionExtension(base) {
    const rpc = cosmjsUtils.createRpc(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new queryAuction.QueryClientImpl(rpc);
    return {
        auction: {
            unverified: {
                params: async () => {
                    const {params} = await queryService.Params({})
                    return params;
                },
                rate: async (from, to) => {
                    const {rate} = await queryService.Rate({from: from, to: to});
                    return rate;
                },
            },
        },
    };
}
