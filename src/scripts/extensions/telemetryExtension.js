const Long = require("long");

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryTelemetry = require("../../../dist/telemetry/query.js");

class Pagination {
    constructor(offset, limit, desc) {
        this.offset = new Long(offset);
        this.limit = new Long(limit);
        this.desc = desc;
    }
}

function setupTelemetryExtension(base) {
    const rpc = cosmjsUtils.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    const queryService = new queryTelemetry.QueryClientImpl(rpc);
    return {
        telemetry: {
            unverified: {
                topBalances: async (denom, pagination) => {
                    return await queryService.TopBalances({
                        denom: denom,
                        pagination: {
                            key: [],
                            limit: pagination.limit,
                            offset: pagination.offset,
                        },
                        desc: pagination.desc
                    });
                },
            },
        },
    };
}

module.exports = {
    setupTelemetryExtension,
    Pagination
}