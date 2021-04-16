import {DirectSecp256k1HdWallet, Registry} from "@cosmjs/proto-signing";
import {coins} from "@cosmjs/launchpad";
import {Bech32} from "@cosmjs/encoding";
import {SigningStargateClient} from "@cosmjs/stargate";
import config from "../../config.json"
import {MsgActivate} from "codec/oracle/v1/tx.ts";

async function main() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, undefined, "odin");
    const [account] = await wallet.getAccounts();
    console.log("Account:", account);

    const typeUrlMsgActivate = "/oracle.v1.MsgActivate";

    const msg = {
        validator: Bech32.encode('odinvaloper', Bech32.decode(account.address).data),
    }

    const registry = new Registry();

    registry.register(typeUrlMsgActivate, MsgActivate);

    let msgAny = {
        typeUrl: typeUrlMsgActivate,
        value: msg,
    };

    const fee = {
        amount: coins(0, "loki"),
        gas: "200000"
    };

    const client = await SigningStargateClient.connectWithSigner(config.rpc, wallet, {registry: registry});

    let res = await client.signAndBroadcast(account.address, [msgAny], fee);
    console.log('Tx result:', res);
}

main()