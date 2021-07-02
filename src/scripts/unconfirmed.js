var RpcClientForTendermint = require('rpc_client_for_tendermint');

var api = new RpcClientForTendermint.InfoApi()
var opts = {
    'limit': 1.2 // {{BigDecimal}} Maximum number of unconfirmed transactions to return
};
var callback = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ' + data);
    }
};
api.unconfirmedTxs(opts, callback);