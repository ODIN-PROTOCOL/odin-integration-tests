/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Balance } from "../cosmos/base/v1beta1/balance";
import { Validator } from "../cosmos/base/v1beta1/validator";

export const protobufPackage = "telemetry";

/**
 * QueryParamsRequest is request type for the Query/QueryParams RPC
 * method.
 */
export interface QueryTopBalancesRequest {
  denom: string;
  pagination?: PageRequest;
  desc: boolean;
}

/**
 * QueryParamsResponse is response type for the Query/QueryParams RPC
 * method.
 */
export interface QueryTopBalancesResponse {
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

/** Query defines the gRPC querier service. */
export interface Query {
  /** TopBalances returns all the system balances for specific denom. */
  TopBalances(
    request: QueryTopBalancesRequest
  ): Promise<QueryTopBalancesResponse>;
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
