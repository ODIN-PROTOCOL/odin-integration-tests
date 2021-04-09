let {encodeBech32Pubkey} = require("@cosmjs/launchpad")
let {sha256, Ed25519} = require("@cosmjs/crypto");
let {Bech32, fromBase64} = require("@cosmjs/encoding");

const config = require('../config.json');

async function main() {
    // Ed25519 pubkey from genesis
    const pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: "bcZMryUNafP58SSMjrqZyCGb4sFEcv4cuLLArqTcl/g=",
    };

    let kp = await Ed25519.makeKeypair(Buffer.from(config.validator_secp256k1_priv_key_base64.slice(0, 32)));
    console.log(kp);

    const bech32Pubkey = encodeBech32Pubkey(pubkey, "odinvalconspub");
    console.log(bech32Pubkey, bech32Pubkey.length);

    const ed25519PubkeyRaw = fromBase64(pubkey.value);
    const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
    const bech32Address = Bech32.encode("odinvaloper", addressData);
    console.log(bech32Address, bech32Address.length);
}

main()