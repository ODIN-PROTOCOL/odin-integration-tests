module.exports = {
    setupAuctionExtension
}

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryAuction = require("../../../dist/auction/query.js")

function setupAuctionExtension(base) {
    const rpc = cosmjsUtils.createProtobufRpcClient(base);
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
                status: async () => {
                    const {rate} = await queryService.AuctionStatus({});
                    return rate;
                },
            },
        },
    };
}
