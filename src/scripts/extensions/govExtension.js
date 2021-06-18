module.exports = {
    setupGovExtension
}

const cosmjsUtils = require("@cosmjs/stargate/build/queries/utils");
const queryGov = require("../../../dist/cosmos/gov/v1beta1/query.js")

function setupGovExtension(base) {
    const rpc = cosmjsUtils.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new queryGov.QueryClientImpl(rpc);
    return {
        gov: {
            unverified: {
                params: async (paramsType) => {
                    return await queryService.Params({paramsType: paramsType});
                },
                proposals: async (proposalStatus, voter, depositor) => {
                    const {proposals} = await queryService.Proposals({proposalStatus: proposalStatus, voter: voter, depositor: depositor});
                    return proposals;
                },
                proposal: async (proposalId) => {
                    return await queryService.Proposal({proposalId: proposalId});
                },
                vote: async (proposalId, voter) => {
                    return await queryService.Vote({proposalId: proposalId, voter: voter});
                },
                votes: async (proposalId) => {
                    const {votes} = await queryService.Votes({proposalId: proposalId});
                    return votes;
                },
                deposit: async (proposalId, depositor) => {
                    return await queryService.Deposit({proposalId: proposalId, depositor: depositor});
                },
                deposits: async (proposalId) => {
                    const {deposits} = await queryService.Deposits({proposalId: proposalId})
                    return deposits
                },
                tallyResult: async (proposalId) => {
                    return await queryService.TallyResult({proposalId: proposalId});
                }
            },
        },
    };
}
