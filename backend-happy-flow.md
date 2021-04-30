# This is a happy-flow, for interacting with the Odin chain

## Requirements:
_**Node version**: >=v14.16.1_<br>
_**tsc version**: >=4.2.4_<br>
_**Yarn version**: >=1.22.5_

First launch - generate *.js files from *.ts (if required)
```bash
yarn run build
```

_Set correct addresses of a node for **RPC** and **API** in **config.json**_

## Data requester happy flow
_Prerequisites: there is at least: 1 - data source; 1 - oracle script which refers to this data source;_<br>

### 1. Create request
```bash
node ./src/scripts/createRequest.js
```

### 2. Review report
```bash
node ./src/scripts/reviewReport.js
```

## Data provider happy flow

### 1. Create data source
```bash
node ./src/scripts/createDataSource.js
```

### 2. Create oracle script
```bash
node ./src/scripts/createOracleScript.js
```

### 3. Review results
```bash
node ./src/scripts/oracleQueries.js
```
Make sure there is at least 1 data request and 1 data source now. 

## Voting happy flow
### 1. Become a validator, as far as only validators can accept proposals
```bash
node ./src/scripts/createValidator.js
```

### 2. Create parameters change proposal
```bash
node ./src/scripts/createProposal.js
```

### 3. Vote for the proposal
```bash
node ./src/scripts/createVote.js
```

### 4. Check proposal status and voting period end time
```bash
node ./src/scripts/govQueries.js
```
After the voting period end reached, the proposal will change its status to "accepted"