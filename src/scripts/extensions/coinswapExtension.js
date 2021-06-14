module.exports = {
    setupCoinswapExtension
}

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryCoinswap = require("../../../dist/coinswap/query.js")

function setupCoinswapExtension(base) {
    const rpc = cosmjsUtils.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new queryCoinswap.QueryClientImpl(rpc);
    return {
        coinswap: {
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
