/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Timestamp } from "../google/protobuf/timestamp";
import { Balance } from "../cosmos/base/v1beta1/balance";
import { Validator } from "../cosmos/base/v1beta1/validator";
import {
  AverageBlockSizePerDay,
  AverageBlockTimePerDay,
  AverageTxFeePerDay,
  TxVolumePerDay,
  ValidatorsBlocks,
} from "../telemetry/telemetry";

export const protobufPackage = "telemetry";

/** QueryTopBalancesRequest is request type for the Query/TopBalances RPC method. */
export interface QueryTopBalancesRequest {
  denom: string;
  pagination?: PageRequest;
  desc: boolean;
}

/** QueryTopBalancesResponse is response type for the Query/TopBalances RPC method. */
export interface QueryTopBalancesResponse {
  /** map<string, int64> transactionsCount = 1; */
  balances: Balance[];
  pagination?: PageResponse;
}

export interface QueryExtendedValidatorsRequest {
  status: string;
  pagination?: PageRequest;
}

export interface QueryExtendedValidatorsResponse {
  validators: Validator[];
  balances: Balance[];
  pagination?: PageResponse;
}

/** QueryAvgBlockSizeRequest is request type for the Query/AvgBlockSize RPC method. */
export interface QueryAvgBlockSizeRequest {
  startDate?: Date;
  endDate?: Date;
}

/** QueryAvgBlockSizeResponse is response type for the Query/AvgBlockSize RPC method. */
export interface QueryAvgBlockSizeResponse {
  avgBlockSizePerDay: AverageBlockSizePerDay[];
}

/** QueryAvgBlockTimeRequest is request type for the Query/AvgBlockTime RPC method. */
export interface QueryAvgBlockTimeRequest {
  startDate?: Date;
  endDate?: Date;
}

/** QueryAvgBlockTimeResponse is response type for the Query/AvgBlockTime RPC method. */
export interface QueryAvgBlockTimeResponse {
  avgBlockTimePerDay: AverageBlockTimePerDay[];
}

/** QueryAvgTxFeeRequest is request type for the Query/AvgTxFee RPC method. */
export interface QueryAvgTxFeeRequest {
  startDate?: Date;
  endDate?: Date;
}

/** QueryAvgTxFeeResponse is response type for the Query/AvgTxFee RPC method. */
export interface QueryAvgTxFeeResponse {
  avgTxFeePerDay: AverageTxFeePerDay[];
}

/** QueryTxVolumeRequest is request type for the Query/TxVolume RPC method. */
export interface QueryTxVolumeRequest {
  startDate?: Date;
  endDate?: Date;
}

/** QueryAvgTxFeeResponse is response type for the Query/TxVolume RPC method. */
export interface QueryTxVolumeResponse {
  txVolumePerDay: TxVolumePerDay[];
}

/** QueryValidatorsBlocksRequest is request type for the Query/ValidatorsBlocks RPC method. */
export interface QueryValidatorsBlocksRequest {
  startDate?: Date;
  endDate?: Date;
  pagination?: PageRequest;
  desc: boolean;
}

/** QueryValidatorsBlocksResponse is response type for the Query/ValidatorsBlocks RPC method. */
export interface QueryValidatorsBlocksResponse {
  validatorsBlocks: ValidatorsBlocks[];
  pagination?: PageResponse;
}

const baseQueryTopBalancesRequest: object = { denom: "", desc: false };

export const QueryTopBalancesRequest = {
  encode(
    message: QueryTopBalancesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.desc === true) {
      writer.uint32(24).bool(message.desc);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTopBalancesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTopBalancesRequest,
    } as QueryTopBalancesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.desc = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTopBalancesRequest {
    const message = {
      ...baseQueryTopBalancesRequest,
    } as QueryTopBalancesRequest;
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.desc !== undefined && object.desc !== null) {
      message.desc = Boolean(object.desc);
    } else {
      message.desc = false;
    }
    return message;
  },

  toJSON(message: QueryTopBalancesRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.desc !== undefined && (obj.desc = message.desc);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTopBalancesRequest>
  ): QueryTopBalancesRequest {
    const message = {
      ...baseQueryTopBalancesRequest,
    } as QueryTopBalancesRequest;
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.desc !== undefined && object.desc !== null) {
      message.desc = object.desc;
    } else {
      message.desc = false;
    }
    return message;
  },
};

const baseQueryTopBalancesResponse: object = {};

export const QueryTopBalancesResponse = {
  encode(
    message: QueryTopBalancesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.balances) {
      Balance.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTopBalancesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTopBalancesResponse,
    } as QueryTopBalancesResponse;
    message.balances = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balances.push(Balance.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTopBalancesResponse {
    const message = {
      ...baseQueryTopBalancesResponse,
    } as QueryTopBalancesResponse;
    message.balances = [];
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Balance.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryTopBalancesResponse): unknown {
    const obj: any = {};
    if (message.balances) {
      obj.balances = message.balances.map((e) =>
        e ? Balance.toJSON(e) : undefined
      );
    } else {
      obj.balances = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTopBalancesResponse>
  ): QueryTopBalancesResponse {
    const message = {
      ...baseQueryTopBalancesResponse,
    } as QueryTopBalancesResponse;
    message.balances = [];
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Balance.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryExtendedValidatorsRequest: object = { status: "" };

export const QueryExtendedValidatorsRequest = {
  encode(
    message: QueryExtendedValidatorsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryExtendedValidatorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryExtendedValidatorsRequest,
    } as QueryExtendedValidatorsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryExtendedValidatorsRequest {
    const message = {
      ...baseQueryExtendedValidatorsRequest,
    } as QueryExtendedValidatorsRequest;
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryExtendedValidatorsRequest): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryExtendedValidatorsRequest>
  ): QueryExtendedValidatorsRequest {
    const message = {
      ...baseQueryExtendedValidatorsRequest,
    } as QueryExtendedValidatorsRequest;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryExtendedValidatorsResponse: object = {};

export const QueryExtendedValidatorsResponse = {
  encode(
    message: QueryExtendedValidatorsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.balances) {
      Balance.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryExtendedValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryExtendedValidatorsResponse,
    } as QueryExtendedValidatorsResponse;
    message.validators = [];
    message.balances = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 2:
          message.balances.push(Balance.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryExtendedValidatorsResponse {
    const message = {
      ...baseQueryExtendedValidatorsResponse,
    } as QueryExtendedValidatorsResponse;
    message.validators = [];
    message.balances = [];
    if (object.validators !== undefined && object.validators !== null) {
      for (const e of object.validators) {
        message.validators.push(Validator.fromJSON(e));
      }
    }
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Balance.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryExtendedValidatorsResponse): unknown {
    const obj: any = {};
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    if (message.balances) {
      obj.balances = message.balances.map((e) =>
        e ? Balance.toJSON(e) : undefined
      );
    } else {
      obj.balances = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryExtendedValidatorsResponse>
  ): QueryExtendedValidatorsResponse {
    const message = {
      ...baseQueryExtendedValidatorsResponse,
    } as QueryExtendedValidatorsResponse;
    message.validators = [];
    message.balances = [];
    if (object.validators !== undefined && object.validators !== null) {
      for (const e of object.validators) {
        message.validators.push(Validator.fromPartial(e));
      }
    }
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Balance.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAvgBlockSizeRequest: object = {};

export const QueryAvgBlockSizeRequest = {
  encode(
    message: QueryAvgBlockSizeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.startDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startDate),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAvgBlockSizeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAvgBlockSizeRequest,
    } as QueryAvgBlockSizeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.endDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvgBlockSizeRequest {
    const message = {
      ...baseQueryAvgBlockSizeRequest,
    } as QueryAvgBlockSizeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = fromJsonTimestamp(object.startDate);
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = fromJsonTimestamp(object.endDate);
    } else {
      message.endDate = undefined;
    }
    return message;
  },

  toJSON(message: QueryAvgBlockSizeRequest): unknown {
    const obj: any = {};
    message.startDate !== undefined &&
      (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined &&
      (obj.endDate = message.endDate.toISOString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAvgBlockSizeRequest>
  ): QueryAvgBlockSizeRequest {
    const message = {
      ...baseQueryAvgBlockSizeRequest,
    } as QueryAvgBlockSizeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = object.startDate;
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate;
    } else {
      message.endDate = undefined;
    }
    return message;
  },
};

const baseQueryAvgBlockSizeResponse: object = {};

export const QueryAvgBlockSizeResponse = {
  encode(
    message: QueryAvgBlockSizeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.avgBlockSizePerDay) {
      AverageBlockSizePerDay.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAvgBlockSizeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAvgBlockSizeResponse,
    } as QueryAvgBlockSizeResponse;
    message.avgBlockSizePerDay = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.avgBlockSizePerDay.push(
            AverageBlockSizePerDay.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvgBlockSizeResponse {
    const message = {
      ...baseQueryAvgBlockSizeResponse,
    } as QueryAvgBlockSizeResponse;
    message.avgBlockSizePerDay = [];
    if (
      object.avgBlockSizePerDay !== undefined &&
      object.avgBlockSizePerDay !== null
    ) {
      for (const e of object.avgBlockSizePerDay) {
        message.avgBlockSizePerDay.push(AverageBlockSizePerDay.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryAvgBlockSizeResponse): unknown {
    const obj: any = {};
    if (message.avgBlockSizePerDay) {
      obj.avgBlockSizePerDay = message.avgBlockSizePerDay.map((e) =>
        e ? AverageBlockSizePerDay.toJSON(e) : undefined
      );
    } else {
      obj.avgBlockSizePerDay = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAvgBlockSizeResponse>
  ): QueryAvgBlockSizeResponse {
    const message = {
      ...baseQueryAvgBlockSizeResponse,
    } as QueryAvgBlockSizeResponse;
    message.avgBlockSizePerDay = [];
    if (
      object.avgBlockSizePerDay !== undefined &&
      object.avgBlockSizePerDay !== null
    ) {
      for (const e of object.avgBlockSizePerDay) {
        message.avgBlockSizePerDay.push(AverageBlockSizePerDay.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryAvgBlockTimeRequest: object = {};

export const QueryAvgBlockTimeRequest = {
  encode(
    message: QueryAvgBlockTimeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.startDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startDate),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAvgBlockTimeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAvgBlockTimeRequest,
    } as QueryAvgBlockTimeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.endDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvgBlockTimeRequest {
    const message = {
      ...baseQueryAvgBlockTimeRequest,
    } as QueryAvgBlockTimeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = fromJsonTimestamp(object.startDate);
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = fromJsonTimestamp(object.endDate);
    } else {
      message.endDate = undefined;
    }
    return message;
  },

  toJSON(message: QueryAvgBlockTimeRequest): unknown {
    const obj: any = {};
    message.startDate !== undefined &&
      (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined &&
      (obj.endDate = message.endDate.toISOString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAvgBlockTimeRequest>
  ): QueryAvgBlockTimeRequest {
    const message = {
      ...baseQueryAvgBlockTimeRequest,
    } as QueryAvgBlockTimeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = object.startDate;
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate;
    } else {
      message.endDate = undefined;
    }
    return message;
  },
};

const baseQueryAvgBlockTimeResponse: object = {};

export const QueryAvgBlockTimeResponse = {
  encode(
    message: QueryAvgBlockTimeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.avgBlockTimePerDay) {
      AverageBlockTimePerDay.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAvgBlockTimeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAvgBlockTimeResponse,
    } as QueryAvgBlockTimeResponse;
    message.avgBlockTimePerDay = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.avgBlockTimePerDay.push(
            AverageBlockTimePerDay.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvgBlockTimeResponse {
    const message = {
      ...baseQueryAvgBlockTimeResponse,
    } as QueryAvgBlockTimeResponse;
    message.avgBlockTimePerDay = [];
    if (
      object.avgBlockTimePerDay !== undefined &&
      object.avgBlockTimePerDay !== null
    ) {
      for (const e of object.avgBlockTimePerDay) {
        message.avgBlockTimePerDay.push(AverageBlockTimePerDay.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryAvgBlockTimeResponse): unknown {
    const obj: any = {};
    if (message.avgBlockTimePerDay) {
      obj.avgBlockTimePerDay = message.avgBlockTimePerDay.map((e) =>
        e ? AverageBlockTimePerDay.toJSON(e) : undefined
      );
    } else {
      obj.avgBlockTimePerDay = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAvgBlockTimeResponse>
  ): QueryAvgBlockTimeResponse {
    const message = {
      ...baseQueryAvgBlockTimeResponse,
    } as QueryAvgBlockTimeResponse;
    message.avgBlockTimePerDay = [];
    if (
      object.avgBlockTimePerDay !== undefined &&
      object.avgBlockTimePerDay !== null
    ) {
      for (const e of object.avgBlockTimePerDay) {
        message.avgBlockTimePerDay.push(AverageBlockTimePerDay.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryAvgTxFeeRequest: object = {};

export const QueryAvgTxFeeRequest = {
  encode(
    message: QueryAvgTxFeeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.startDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startDate),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAvgTxFeeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAvgTxFeeRequest } as QueryAvgTxFeeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.endDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvgTxFeeRequest {
    const message = { ...baseQueryAvgTxFeeRequest } as QueryAvgTxFeeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = fromJsonTimestamp(object.startDate);
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = fromJsonTimestamp(object.endDate);
    } else {
      message.endDate = undefined;
    }
    return message;
  },

  toJSON(message: QueryAvgTxFeeRequest): unknown {
    const obj: any = {};
    message.startDate !== undefined &&
      (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined &&
      (obj.endDate = message.endDate.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAvgTxFeeRequest>): QueryAvgTxFeeRequest {
    const message = { ...baseQueryAvgTxFeeRequest } as QueryAvgTxFeeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = object.startDate;
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate;
    } else {
      message.endDate = undefined;
    }
    return message;
  },
};

const baseQueryAvgTxFeeResponse: object = {};

export const QueryAvgTxFeeResponse = {
  encode(
    message: QueryAvgTxFeeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.avgTxFeePerDay) {
      AverageTxFeePerDay.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAvgTxFeeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAvgTxFeeResponse } as QueryAvgTxFeeResponse;
    message.avgTxFeePerDay = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.avgTxFeePerDay.push(
            AverageTxFeePerDay.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvgTxFeeResponse {
    const message = { ...baseQueryAvgTxFeeResponse } as QueryAvgTxFeeResponse;
    message.avgTxFeePerDay = [];
    if (object.avgTxFeePerDay !== undefined && object.avgTxFeePerDay !== null) {
      for (const e of object.avgTxFeePerDay) {
        message.avgTxFeePerDay.push(AverageTxFeePerDay.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryAvgTxFeeResponse): unknown {
    const obj: any = {};
    if (message.avgTxFeePerDay) {
      obj.avgTxFeePerDay = message.avgTxFeePerDay.map((e) =>
        e ? AverageTxFeePerDay.toJSON(e) : undefined
      );
    } else {
      obj.avgTxFeePerDay = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAvgTxFeeResponse>
  ): QueryAvgTxFeeResponse {
    const message = { ...baseQueryAvgTxFeeResponse } as QueryAvgTxFeeResponse;
    message.avgTxFeePerDay = [];
    if (object.avgTxFeePerDay !== undefined && object.avgTxFeePerDay !== null) {
      for (const e of object.avgTxFeePerDay) {
        message.avgTxFeePerDay.push(AverageTxFeePerDay.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryTxVolumeRequest: object = {};

export const QueryTxVolumeRequest = {
  encode(
    message: QueryTxVolumeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.startDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startDate),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTxVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTxVolumeRequest } as QueryTxVolumeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.endDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTxVolumeRequest {
    const message = { ...baseQueryTxVolumeRequest } as QueryTxVolumeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = fromJsonTimestamp(object.startDate);
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = fromJsonTimestamp(object.endDate);
    } else {
      message.endDate = undefined;
    }
    return message;
  },

  toJSON(message: QueryTxVolumeRequest): unknown {
    const obj: any = {};
    message.startDate !== undefined &&
      (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined &&
      (obj.endDate = message.endDate.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTxVolumeRequest>): QueryTxVolumeRequest {
    const message = { ...baseQueryTxVolumeRequest } as QueryTxVolumeRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = object.startDate;
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate;
    } else {
      message.endDate = undefined;
    }
    return message;
  },
};

const baseQueryTxVolumeResponse: object = {};

export const QueryTxVolumeResponse = {
  encode(
    message: QueryTxVolumeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.txVolumePerDay) {
      TxVolumePerDay.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryTxVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTxVolumeResponse } as QueryTxVolumeResponse;
    message.txVolumePerDay = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txVolumePerDay.push(
            TxVolumePerDay.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTxVolumeResponse {
    const message = { ...baseQueryTxVolumeResponse } as QueryTxVolumeResponse;
    message.txVolumePerDay = [];
    if (object.txVolumePerDay !== undefined && object.txVolumePerDay !== null) {
      for (const e of object.txVolumePerDay) {
        message.txVolumePerDay.push(TxVolumePerDay.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryTxVolumeResponse): unknown {
    const obj: any = {};
    if (message.txVolumePerDay) {
      obj.txVolumePerDay = message.txVolumePerDay.map((e) =>
        e ? TxVolumePerDay.toJSON(e) : undefined
      );
    } else {
      obj.txVolumePerDay = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTxVolumeResponse>
  ): QueryTxVolumeResponse {
    const message = { ...baseQueryTxVolumeResponse } as QueryTxVolumeResponse;
    message.txVolumePerDay = [];
    if (object.txVolumePerDay !== undefined && object.txVolumePerDay !== null) {
      for (const e of object.txVolumePerDay) {
        message.txVolumePerDay.push(TxVolumePerDay.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryValidatorsBlocksRequest: object = { desc: false };

export const QueryValidatorsBlocksRequest = {
  encode(
    message: QueryValidatorsBlocksRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.startDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startDate),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    if (message.desc === true) {
      writer.uint32(32).bool(message.desc);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorsBlocksRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorsBlocksRequest,
    } as QueryValidatorsBlocksRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.endDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.desc = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorsBlocksRequest {
    const message = {
      ...baseQueryValidatorsBlocksRequest,
    } as QueryValidatorsBlocksRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = fromJsonTimestamp(object.startDate);
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = fromJsonTimestamp(object.endDate);
    } else {
      message.endDate = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.desc !== undefined && object.desc !== null) {
      message.desc = Boolean(object.desc);
    } else {
      message.desc = false;
    }
    return message;
  },

  toJSON(message: QueryValidatorsBlocksRequest): unknown {
    const obj: any = {};
    message.startDate !== undefined &&
      (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined &&
      (obj.endDate = message.endDate.toISOString());
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.desc !== undefined && (obj.desc = message.desc);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryValidatorsBlocksRequest>
  ): QueryValidatorsBlocksRequest {
    const message = {
      ...baseQueryValidatorsBlocksRequest,
    } as QueryValidatorsBlocksRequest;
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = object.startDate;
    } else {
      message.startDate = undefined;
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate;
    } else {
      message.endDate = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.desc !== undefined && object.desc !== null) {
      message.desc = object.desc;
    } else {
      message.desc = false;
    }
    return message;
  },
};

const baseQueryValidatorsBlocksResponse: object = {};

export const QueryValidatorsBlocksResponse = {
  encode(
    message: QueryValidatorsBlocksResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validatorsBlocks) {
      ValidatorsBlocks.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorsBlocksResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorsBlocksResponse,
    } as QueryValidatorsBlocksResponse;
    message.validatorsBlocks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorsBlocks.push(
            ValidatorsBlocks.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorsBlocksResponse {
    const message = {
      ...baseQueryValidatorsBlocksResponse,
    } as QueryValidatorsBlocksResponse;
    message.validatorsBlocks = [];
    if (
      object.validatorsBlocks !== undefined &&
      object.validatorsBlocks !== null
    ) {
      for (const e of object.validatorsBlocks) {
        message.validatorsBlocks.push(ValidatorsBlocks.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryValidatorsBlocksResponse): unknown {
    const obj: any = {};
    if (message.validatorsBlocks) {
      obj.validatorsBlocks = message.validatorsBlocks.map((e) =>
        e ? ValidatorsBlocks.toJSON(e) : undefined
      );
    } else {
      obj.validatorsBlocks = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryValidatorsBlocksResponse>
  ): QueryValidatorsBlocksResponse {
    const message = {
      ...baseQueryValidatorsBlocksResponse,
    } as QueryValidatorsBlocksResponse;
    message.validatorsBlocks = [];
    if (
      object.validatorsBlocks !== undefined &&
      object.validatorsBlocks !== null
    ) {
      for (const e of object.validatorsBlocks) {
        message.validatorsBlocks.push(ValidatorsBlocks.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** TopBalances returns all the system balances for specific denom. */
  TopBalances(
    request: QueryTopBalancesRequest
  ): Promise<QueryTopBalancesResponse>;
  /** AvgBlockSize returns average block size per day. */
  AvgBlockSize(
    request: QueryAvgBlockSizeRequest
  ): Promise<QueryAvgBlockSizeResponse>;
  /** AvgBlockTime returns average block time per day. */
  AvgBlockTime(
    request: QueryAvgBlockTimeRequest
  ): Promise<QueryAvgBlockTimeResponse>;
  /** AvgTxFee returns average transaction fee per day. */
  AvgTxFee(request: QueryAvgTxFeeRequest): Promise<QueryAvgTxFeeResponse>;
  /** TxVolume returns count of transactions per day. */
  TxVolume(request: QueryTxVolumeRequest): Promise<QueryTxVolumeResponse>;
  /** ValidatorsBlocks returns validators blocks and stake percentage. */
  ValidatorsBlocks(
    request: QueryValidatorsBlocksRequest
  ): Promise<QueryValidatorsBlocksResponse>;
  ExtendedValidators(
    request: QueryExtendedValidatorsRequest
  ): Promise<QueryExtendedValidatorsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  TopBalances(
    request: QueryTopBalancesRequest
  ): Promise<QueryTopBalancesResponse> {
    const data = QueryTopBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("telemetry.Query", "TopBalances", data);
    return promise.then((data) =>
      QueryTopBalancesResponse.decode(new _m0.Reader(data))
    );
  }

  AvgBlockSize(
    request: QueryAvgBlockSizeRequest
  ): Promise<QueryAvgBlockSizeResponse> {
    const data = QueryAvgBlockSizeRequest.encode(request).finish();
    const promise = this.rpc.request("telemetry.Query", "AvgBlockSize", data);
    return promise.then((data) =>
      QueryAvgBlockSizeResponse.decode(new _m0.Reader(data))
    );
  }

  AvgBlockTime(
    request: QueryAvgBlockTimeRequest
  ): Promise<QueryAvgBlockTimeResponse> {
    const data = QueryAvgBlockTimeRequest.encode(request).finish();
    const promise = this.rpc.request("telemetry.Query", "AvgBlockTime", data);
    return promise.then((data) =>
      QueryAvgBlockTimeResponse.decode(new _m0.Reader(data))
    );
  }

  AvgTxFee(request: QueryAvgTxFeeRequest): Promise<QueryAvgTxFeeResponse> {
    const data = QueryAvgTxFeeRequest.encode(request).finish();
    const promise = this.rpc.request("telemetry.Query", "AvgTxFee", data);
    return promise.then((data) =>
      QueryAvgTxFeeResponse.decode(new _m0.Reader(data))
    );
  }

  TxVolume(request: QueryTxVolumeRequest): Promise<QueryTxVolumeResponse> {
    const data = QueryTxVolumeRequest.encode(request).finish();
    const promise = this.rpc.request("telemetry.Query", "TxVolume", data);
    return promise.then((data) =>
      QueryTxVolumeResponse.decode(new _m0.Reader(data))
    );
  }

  ValidatorsBlocks(
    request: QueryValidatorsBlocksRequest
  ): Promise<QueryValidatorsBlocksResponse> {
    const data = QueryValidatorsBlocksRequest.encode(request).finish();
    const promise = this.rpc.request(
      "telemetry.Query",
      "ValidatorsBlocks",
      data
    );
    return promise.then((data) =>
      QueryValidatorsBlocksResponse.decode(new _m0.Reader(data))
    );
  }

  ExtendedValidators(
    request: QueryExtendedValidatorsRequest
  ): Promise<QueryExtendedValidatorsResponse> {
    const data = QueryExtendedValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "telemetry.Query",
      "ExtendedValidators",
      data
    );
    return promise.then((data) =>
      QueryExtendedValidatorsResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
