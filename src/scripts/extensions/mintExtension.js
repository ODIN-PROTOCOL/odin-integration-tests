module.exports = {
    setupMintExtension
}

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryMint = require("../../../dist/mint/query.js")

function setupMintExtension(base) {
    const rpc = cosmjsUtils.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new queryMint.QueryClientImpl(rpc);
    return {
        mint: {
            unverified: {
                params: async () => {
                    const {params} = await queryService.Params({})
                    return params;
                },
                inflation: async () => {
                    const {inflation} = await queryService.Inflation({});
                    return inflation;
                },
                annualProvisions: async () => {
                    const {annualProvisions} = await queryService.AnnualProvisions({});
                    return annualProvisions;
                },
                ethIntegrationAddress: async () => {
                    return await queryService.EthIntegrationAddress({});
                },
                treasuryPool: async () => {
                    return await queryService.TreasuryPool({});
                }
            },
        },
    };
}
