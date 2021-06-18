const config = require('../../config.json');
const {HD_DERIVATION, MNEMONIC_SIZE} = require("./utils");
const {DirectSecp256k1HdWallet} = require("@cosmjs/proto-signing");

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        config.mnemonic,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    );

    const [account] = await wallet.getAccounts();
    console.log(account);

    const newWallet = await DirectSecp256k1HdWallet.generate(
        MNEMONIC_SIZE,
        {
            hdPaths: [HD_DERIVATION],
            prefix: "odin"
        }
    )
    console.log(newWallet.mnemonic);
    const newAccount = await newWallet.getAccounts()
    console.log(newAccount);
}

main();
