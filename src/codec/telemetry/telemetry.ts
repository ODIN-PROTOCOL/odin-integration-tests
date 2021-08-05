/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "telemetry";

/** AverageBlockSizePerDay represents average block size per day. */
export interface AverageBlockSizePerDay {
  date?: Date;
  bytes: Long;
}

/** AverageBlockSizePerDay represents average block time per day. */
export interface AverageBlockTimePerDay {
  date?: Date;
  seconds: Long;
}

/** AverageBlockSizePerDay represents average transaction fee per day. */
export interface AverageTxFeePerDay {
  date?: Date;
  fee: Coin[];
}

/** AverageBlockSizePerDay represents count of transactions per day. */
export interface TxVolumePerDay {
  date?: Date;
  volume: Long;
}

/** AverageBlockSizePerDay represents validators blocks and stake percentage. */
export interface ValidatorsBlocks {
  validatorAddress: string;
  blocksCount: Long;
  stakePercentage: string;
}

const baseAverageBlockSizePerDay: object = { bytes: Long.UZERO };

export const AverageBlockSizePerDay = {
  encode(
    message: AverageBlockSizePerDay,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (!message.bytes.isZero()) {
      writer.uint32(16).uint64(message.bytes);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AverageBlockSizePerDay {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAverageBlockSizePerDay } as AverageBlockSizePerDay;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.bytes = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AverageBlockSizePerDay {
    const message = { ...baseAverageBlockSizePerDay } as AverageBlockSizePerDay;
    if (object.date !== undefined && object.date !== null) {
      message.date = fromJsonTimestamp(object.date);
    } else {
      message.date = undefined;
    }
    if (object.bytes !== undefined && object.bytes !== null) {
      message.bytes = Long.fromString(object.bytes);
    } else {
      message.bytes = Long.UZERO;
    }
    return message;
  },

  toJSON(message: AverageBlockSizePerDay): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.bytes !== undefined &&
      (obj.bytes = (message.bytes || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<AverageBlockSizePerDay>
  ): AverageBlockSizePerDay {
    const message = { ...baseAverageBlockSizePerDay } as AverageBlockSizePerDay;
    if (object.date !== undefined && object.date !== null) {
      message.date = object.date;
    } else {
      message.date = undefined;
    }
    if (object.bytes !== undefined && object.bytes !== null) {
      message.bytes = object.bytes as Long;
    } else {
      message.bytes = Long.UZERO;
    }
    return message;
  },
};

const baseAverageBlockTimePerDay: object = { seconds: Long.UZERO };

export const AverageBlockTimePerDay = {
  encode(
    message: AverageBlockTimePerDay,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (!message.seconds.isZero()) {
      writer.uint32(16).uint64(message.seconds);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AverageBlockTimePerDay {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAverageBlockTimePerDay } as AverageBlockTimePerDay;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.seconds = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AverageBlockTimePerDay {
    const message = { ...baseAverageBlockTimePerDay } as AverageBlockTimePerDay;
    if (object.date !== undefined && object.date !== null) {
      message.date = fromJsonTimestamp(object.date);
    } else {
      message.date = undefined;
    }
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = Long.fromString(object.seconds);
    } else {
      message.seconds = Long.UZERO;
    }
    return message;
  },

  toJSON(message: AverageBlockTimePerDay): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.seconds !== undefined &&
      (obj.seconds = (message.seconds || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<AverageBlockTimePerDay>
  ): AverageBlockTimePerDay {
    const message = { ...baseAverageBlockTimePerDay } as AverageBlockTimePerDay;
    if (object.date !== undefined && object.date !== null) {
      message.date = object.date;
    } else {
      message.date = undefined;
    }
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = object.seconds as Long;
    } else {
      message.seconds = Long.UZERO;
    }
    return message;
  },
};

const baseAverageTxFeePerDay: object = {};

export const AverageTxFeePerDay = {
  encode(
    message: AverageTxFeePerDay,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.fee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AverageTxFeePerDay {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAverageTxFeePerDay } as AverageTxFeePerDay;
    message.fee = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.fee.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AverageTxFeePerDay {
    const message = { ...baseAverageTxFeePerDay } as AverageTxFeePerDay;
    message.fee = [];
    if (object.date !== undefined && object.date !== null) {
      message.date = fromJsonTimestamp(object.date);
    } else {
      message.date = undefined;
    }
    if (object.fee !== undefined && object.fee !== null) {
      for (const e of object.fee) {
        message.fee.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: AverageTxFeePerDay): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date.toISOString());
    if (message.fee) {
      obj.fee = message.fee.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.fee = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AverageTxFeePerDay>): AverageTxFeePerDay {
    const message = { ...baseAverageTxFeePerDay } as AverageTxFeePerDay;
    message.fee = [];
    if (object.date !== undefined && object.date !== null) {
      message.date = object.date;
    } else {
      message.date = undefined;
    }
    if (object.fee !== undefined && object.fee !== null) {
      for (const e of object.fee) {
        message.fee.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseTxVolumePerDay: object = { volume: Long.UZERO };

export const TxVolumePerDay = {
  encode(
    message: TxVolumePerDay,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (!message.volume.isZero()) {
      writer.uint32(16).uint64(message.volume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxVolumePerDay {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxVolumePerDay } as TxVolumePerDay;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.volume = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxVolumePerDay {
    const message = { ...baseTxVolumePerDay } as TxVolumePerDay;
    if (object.date !== undefined && object.date !== null) {
      message.date = fromJsonTimestamp(object.date);
    } else {
      message.date = undefined;
    }
    if (object.volume !== undefined && object.volume !== null) {
      message.volume = Long.fromString(object.volume);
    } else {
      message.volume = Long.UZERO;
    }
    return message;
  },

  toJSON(message: TxVolumePerDay): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.volume !== undefined &&
      (obj.volume = (message.volume || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<TxVolumePerDay>): TxVolumePerDay {
    const message = { ...baseTxVolumePerDay } as TxVolumePerDay;
    if (object.date !== undefined && object.date !== null) {
      message.date = object.date;
    } else {
      message.date = undefined;
    }
    if (object.volume !== undefined && object.volume !== null) {
      message.volume = object.volume as Long;
    } else {
      message.volume = Long.UZERO;
    }
    return message;
  },
};

const baseValidatorsBlocks: object = {
  validatorAddress: "",
  blocksCount: Long.UZERO,
  stakePercentage: "",
};

export const ValidatorsBlocks = {
  encode(
    message: ValidatorsBlocks,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (!message.blocksCount.isZero()) {
      writer.uint32(16).uint64(message.blocksCount);
    }
    if (message.stakePercentage !== "") {
      writer.uint32(26).string(message.stakePercentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorsBlocks {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidatorsBlocks } as ValidatorsBlocks;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.blocksCount = reader.uint64() as Long;
          break;
        case 3:
          message.stakePercentage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorsBlocks {
    const message = { ...baseValidatorsBlocks } as ValidatorsBlocks;
    if (
      object.validatorAddress !== undefined &&
      object.validatorAddress !== null
    ) {
      message.validatorAddress = String(object.validatorAddress);
    } else {
      message.validatorAddress = "";
    }
    if (object.blocksCount !== undefined && object.blocksCount !== null) {
      message.blocksCount = Long.fromString(object.blocksCount);
    } else {
      message.blocksCount = Long.UZERO;
    }
    if (
      object.stakePercentage !== undefined &&
      object.stakePercentage !== null
    ) {
      message.stakePercentage = String(object.stakePercentage);
    } else {
      message.stakePercentage = "";
    }
    return message;
  },

  toJSON(message: ValidatorsBlocks): unknown {
    const obj: any = {};
    message.validatorAddress !== undefined &&
      (obj.validatorAddress = message.validatorAddress);
    message.blocksCount !== undefined &&
      (obj.blocksCount = (message.blocksCount || Long.UZERO).toString());
    message.stakePercentage !== undefined &&
      (obj.stakePercentage = message.stakePercentage);
    return obj;
  },

  fromPartial(object: DeepPartial<ValidatorsBlocks>): ValidatorsBlocks {
    const message = { ...baseValidatorsBlocks } as ValidatorsBlocks;
    if (
      object.validatorAddress !== undefined &&
      object.validatorAddress !== null
    ) {
      message.validatorAddress = object.validatorAddress;
    } else {
      message.validatorAddress = "";
    }
    if (object.blocksCount !== undefined && object.blocksCount !== null) {
      message.blocksCount = object.blocksCount as Long;
    } else {
      message.blocksCount = Long.UZERO;
    }
    if (
      object.stakePercentage !== undefined &&
      object.stakePercentage !== null
    ) {
      message.stakePercentage = object.stakePercentage;
    } else {
      message.stakePercentage = "";
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
