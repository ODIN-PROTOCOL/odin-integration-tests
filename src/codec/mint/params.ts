/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mint";

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mintDenom: string;
  /** maximum annual change in inflation rate */
  inflationRateChange: string;
  /** maximum inflation rate */
  inflationMax: string;
  /** minimum inflation rate */
  inflationMin: string;
  /** goal of percent bonded atoms */
  goalBonded: string;
  /** expected blocks per year */
  blocksPerYear: Long;
  /** max amount to withdraw per time */
  maxWithdrawalPerTime: Coin[];
  /** map with smart contracts addresses */
  integrationAddresses: { [key: string]: string };
  /** flag if minting from air */
  mintAir: boolean;
  /** eligible to withdraw accounts */
  eligibleAccountsPool: string[];
}

export interface Params_IntegrationAddressesEntry {
  key: string;
  value: string;
}

const baseParams: object = {
  mintDenom: "",
  inflationRateChange: "",
  inflationMax: "",
  inflationMin: "",
  goalBonded: "",
  blocksPerYear: Long.UZERO,
  mintAir: false,
  eligibleAccountsPool: "",
};

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (message.inflationRateChange !== "") {
      writer.uint32(18).string(message.inflationRateChange);
    }
    if (message.inflationMax !== "") {
      writer.uint32(26).string(message.inflationMax);
    }
    if (message.inflationMin !== "") {
      writer.uint32(34).string(message.inflationMin);
    }
    if (message.goalBonded !== "") {
      writer.uint32(42).string(message.goalBonded);
    }
    if (!message.blocksPerYear.isZero()) {
      writer.uint32(48).uint64(message.blocksPerYear);
    }
    for (const v of message.maxWithdrawalPerTime) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    Object.entries(message.integrationAddresses).forEach(([key, value]) => {
      Params_IntegrationAddressesEntry.encode(
        { key: key as any, value },
        writer.uint32(66).fork()
      ).ldelim();
    });
    if (message.mintAir === true) {
      writer.uint32(72).bool(message.mintAir);
    }
    for (const v of message.eligibleAccountsPool) {
      writer.uint32(82).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    message.maxWithdrawalPerTime = [];
    message.integrationAddresses = {};
    message.eligibleAccountsPool = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintDenom = reader.string();
          break;
        case 2:
          message.inflationRateChange = reader.string();
          break;
        case 3:
          message.inflationMax = reader.string();
          break;
        case 4:
          message.inflationMin = reader.string();
          break;
        case 5:
          message.goalBonded = reader.string();
          break;
        case 6:
          message.blocksPerYear = reader.uint64() as Long;
          break;
        case 7:
          message.maxWithdrawalPerTime.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        case 8:
          const entry8 = Params_IntegrationAddressesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry8.value !== undefined) {
            message.integrationAddresses[entry8.key] = entry8.value;
          }
          break;
        case 9:
          message.mintAir = reader.bool();
          break;
        case 10:
          message.eligibleAccountsPool.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    message.maxWithdrawalPerTime = [];
    message.integrationAddresses = {};
    message.eligibleAccountsPool = [];
    if (object.mintDenom !== undefined && object.mintDenom !== null) {
      message.mintDenom = String(object.mintDenom);
    } else {
      message.mintDenom = "";
    }
    if (
      object.inflationRateChange !== undefined &&
      object.inflationRateChange !== null
    ) {
      message.inflationRateChange = String(object.inflationRateChange);
    } else {
      message.inflationRateChange = "";
    }
    if (object.inflationMax !== undefined && object.inflationMax !== null) {
      message.inflationMax = String(object.inflationMax);
    } else {
      message.inflationMax = "";
    }
    if (object.inflationMin !== undefined && object.inflationMin !== null) {
      message.inflationMin = String(object.inflationMin);
    } else {
      message.inflationMin = "";
    }
    if (object.goalBonded !== undefined && object.goalBonded !== null) {
      message.goalBonded = String(object.goalBonded);
    } else {
      message.goalBonded = "";
    }
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = Long.fromString(object.blocksPerYear);
    } else {
      message.blocksPerYear = Long.UZERO;
    }
    if (
      object.maxWithdrawalPerTime !== undefined &&
      object.maxWithdrawalPerTime !== null
    ) {
      for (const e of object.maxWithdrawalPerTime) {
        message.maxWithdrawalPerTime.push(Coin.fromJSON(e));
      }
    }
    if (
      object.integrationAddresses !== undefined &&
      object.integrationAddresses !== null
    ) {
      Object.entries(object.integrationAddresses).forEach(([key, value]) => {
        message.integrationAddresses[key] = String(value);
      });
    }
    if (object.mintAir !== undefined && object.mintAir !== null) {
      message.mintAir = Boolean(object.mintAir);
    } else {
      message.mintAir = false;
    }
    if (
      object.eligibleAccountsPool !== undefined &&
      object.eligibleAccountsPool !== null
    ) {
      for (const e of object.eligibleAccountsPool) {
        message.eligibleAccountsPool.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    message.inflationRateChange !== undefined &&
      (obj.inflationRateChange = message.inflationRateChange);
    message.inflationMax !== undefined &&
      (obj.inflationMax = message.inflationMax);
    message.inflationMin !== undefined &&
      (obj.inflationMin = message.inflationMin);
    message.goalBonded !== undefined && (obj.goalBonded = message.goalBonded);
    message.blocksPerYear !== undefined &&
      (obj.blocksPerYear = (message.blocksPerYear || Long.UZERO).toString());
    if (message.maxWithdrawalPerTime) {
      obj.maxWithdrawalPerTime = message.maxWithdrawalPerTime.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.maxWithdrawalPerTime = [];
    }
    obj.integrationAddresses = {};
    if (message.integrationAddresses) {
      Object.entries(message.integrationAddresses).forEach(([k, v]) => {
        obj.integrationAddresses[k] = v;
      });
    }
    message.mintAir !== undefined && (obj.mintAir = message.mintAir);
    if (message.eligibleAccountsPool) {
      obj.eligibleAccountsPool = message.eligibleAccountsPool.map((e) => e);
    } else {
      obj.eligibleAccountsPool = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    message.maxWithdrawalPerTime = [];
    message.integrationAddresses = {};
    message.eligibleAccountsPool = [];
    if (object.mintDenom !== undefined && object.mintDenom !== null) {
      message.mintDenom = object.mintDenom;
    } else {
      message.mintDenom = "";
    }
    if (
      object.inflationRateChange !== undefined &&
      object.inflationRateChange !== null
    ) {
      message.inflationRateChange = object.inflationRateChange;
    } else {
      message.inflationRateChange = "";
    }
    if (object.inflationMax !== undefined && object.inflationMax !== null) {
      message.inflationMax = object.inflationMax;
    } else {
      message.inflationMax = "";
    }
    if (object.inflationMin !== undefined && object.inflationMin !== null) {
      message.inflationMin = object.inflationMin;
    } else {
      message.inflationMin = "";
    }
    if (object.goalBonded !== undefined && object.goalBonded !== null) {
      message.goalBonded = object.goalBonded;
    } else {
      message.goalBonded = "";
    }
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = object.blocksPerYear as Long;
    } else {
      message.blocksPerYear = Long.UZERO;
    }
    if (
      object.maxWithdrawalPerTime !== undefined &&
      object.maxWithdrawalPerTime !== null
    ) {
      for (const e of object.maxWithdrawalPerTime) {
        message.maxWithdrawalPerTime.push(Coin.fromPartial(e));
      }
    }
    if (
      object.integrationAddresses !== undefined &&
      object.integrationAddresses !== null
    ) {
      Object.entries(object.integrationAddresses).forEach(([key, value]) => {
        if (value !== undefined) {
          message.integrationAddresses[key] = String(value);
        }
      });
    }
    if (object.mintAir !== undefined && object.mintAir !== null) {
      message.mintAir = object.mintAir;
    } else {
      message.mintAir = false;
    }
    if (
      object.eligibleAccountsPool !== undefined &&
      object.eligibleAccountsPool !== null
    ) {
      for (const e of object.eligibleAccountsPool) {
        message.eligibleAccountsPool.push(e);
      }
    }
    return message;
  },
};

const baseParams_IntegrationAddressesEntry: object = { key: "", value: "" };

export const Params_IntegrationAddressesEntry = {
  encode(
    message: Params_IntegrationAddressesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Params_IntegrationAddressesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseParams_IntegrationAddressesEntry,
    } as Params_IntegrationAddressesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params_IntegrationAddressesEntry {
    const message = {
      ...baseParams_IntegrationAddressesEntry,
    } as Params_IntegrationAddressesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: Params_IntegrationAddressesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Params_IntegrationAddressesEntry>
  ): Params_IntegrationAddressesEntry {
    const message = {
      ...baseParams_IntegrationAddressesEntry,
    } as Params_IntegrationAddressesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
