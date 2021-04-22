module.exports = {
    setupOracleExtension
}

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryOracle = require("../../../dist/oracle/v1/query.js")

function setupOracleExtension(base) {
    const rpc = cosmjsUtils.createRpc(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new queryOracle.QueryClientImpl(rpc);
    return {
        oracle: {
            unverified: {
                params: async () => {
                    const {params} = await queryService.Params({});
                    return params;
                },
                counts: async () => {
                    return await queryService.Counts({});
                },
                data: async (dataHash) => {
                    const {data} = await queryService.Data({dataHash: dataHash});
                    return data;
                },
                dataSource: async (dataSourceId) => {
                    const {dataSource} = await queryService.DataSource({dataSourceId: dataSourceId});
                    return dataSource;
                },
                oracleScript: async (oracleScriptId) => {
                    const {oracleScript} = await queryService.OracleScript({oracleScriptId: oracleScriptId});
                    return oracleScript;
                },
                request: async (requestId) => {
                    return await queryService.Request({requestId: requestId});
                },
                validator: async (validatorAddress) => {
                    return await queryService.Validator({validatorAddress: validatorAddress});
                },
                reporters: async (validatorAddress) => {
                    return await queryService.Reporters({validatorAddress: validatorAddress});
                },
                activeValidators: async () => {
                    return await queryService.ActiveValidators({});
                },
                requestSearch: async (oracleScriptId, calldata, askCount, minCount) => {
                    const {request} = await queryService.RequestSearch({
                        oracleScriptId: oracleScriptId,
                        calldata: calldata,
                        askCount: askCount,
                        minCount: minCount
                    });
                    return request;
                },
                dataProvidersPool: async () => {
                    return await queryService.DataProvidersPool({});
                },
            },
        },
    };
}