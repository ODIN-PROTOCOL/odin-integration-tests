/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.base.v1beta1";

/** BondStatus is the status of a validator. */
export enum BondStatus {
  /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
  BOND_STATUS_UNSPECIFIED = 0,
  /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
  BOND_STATUS_UNBONDED = 1,
  /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
  BOND_STATUS_UNBONDING = 2,
  /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
  BOND_STATUS_BONDED = 3,
  UNRECOGNIZED = -1,
}

export function bondStatusFromJSON(object: any): BondStatus {
  switch (object) {
    case 0:
    case "BOND_STATUS_UNSPECIFIED":
      return BondStatus.BOND_STATUS_UNSPECIFIED;
    case 1:
    case "BOND_STATUS_UNBONDED":
      return BondStatus.BOND_STATUS_UNBONDED;
    case 2:
    case "BOND_STATUS_UNBONDING":
      return BondStatus.BOND_STATUS_UNBONDING;
    case 3:
    case "BOND_STATUS_BONDED":
      return BondStatus.BOND_STATUS_BONDED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BondStatus.UNRECOGNIZED;
  }
}

export function bondStatusToJSON(object: BondStatus): string {
  switch (object) {
    case BondStatus.BOND_STATUS_UNSPECIFIED:
      return "BOND_STATUS_UNSPECIFIED";
    case BondStatus.BOND_STATUS_UNBONDED:
      return "BOND_STATUS_UNBONDED";
    case BondStatus.BOND_STATUS_UNBONDING:
      return "BOND_STATUS_UNBONDING";
    case BondStatus.BOND_STATUS_BONDED:
      return "BOND_STATUS_BONDED";
    default:
      return "UNKNOWN";
  }
}

/**
 * Validator defines a validator, together with the total amount of the
 * Validator's bond shares and their exchange rate to coins. Slashing results in
 * a decrease in the exchange rate, allowing correct calculation of future
 * undelegations without iterating over delegators. When coins are delegated to
 * this validator, the validator is credited with a delegation whose number of
 * bond shares is based on the amount of coins delegated divided by the current
 * exchange rate. Voting power can be calculated as total bonded shares
 * multiplied by exchange rate.
 */
export interface Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operatorAddress: string;
  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensusPubkey?: Any;
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed: boolean;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status: BondStatus;
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens: string;
  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegatorShares: string;
  /** description defines the description terms for the validator. */
  description?: Description;
  /** unbonding_height defines, if unbonding, the height at which this validator has begun unbonding. */
  unbondingHeight: Long;
  /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
  unbondingTime?: Date;
  /** commission defines the commission parameters. */
  commission?: Commission;
  /** min_self_delegation is the validator's self declared minimum self delegation. */
  minSelfDelegation: string;
}

/** Commission defines commission parameters for a given validator. */
export interface Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commissionRates?: CommissionRates;
  /** update_time is the last time the commission rate was changed. */
  updateTime?: Date;
}

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export interface CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: string;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  maxRate: string;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  maxChangeRate: string;
}

/** Description defines a validator description. */
export interface Description {
  /** moniker defines a human-readable name for the validator. */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  securityContact: string;
  /** details define other optional details. */
  details: string;
}

const baseValidator: object = {
  operatorAddress: "",
  jailed: false,
  status: 0,
  tokens: "",
  delegatorShares: "",
  unbondingHeight: Long.ZERO,
  minSelfDelegation: "",
};

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.operatorAddress !== "") {
      writer.uint32(10).string(message.operatorAddress);
    }
    if (message.consensusPubkey !== undefined) {
      Any.encode(message.consensusPubkey, writer.uint32(18).fork()).ldelim();
    }
    if (message.jailed === true) {
      writer.uint32(24).bool(message.jailed);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.tokens !== "") {
      writer.uint32(42).string(message.tokens);
    }
    if (message.delegatorShares !== "") {
      writer.uint32(50).string(message.delegatorShares);
    }
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (!message.unbondingHeight.isZero()) {
      writer.uint32(64).int64(message.unbondingHeight);
    }
    if (message.unbondingTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.unbondingTime),
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.commission !== undefined) {
      Commission.encode(message.commission, writer.uint32(82).fork()).ldelim();
    }
    if (message.minSelfDelegation !== "") {
      writer.uint32(90).string(message.minSelfDelegation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidator } as Validator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operatorAddress = reader.string();
          break;
        case 2:
          message.consensusPubkey = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.jailed = reader.bool();
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          message.tokens = reader.string();
          break;
        case 6:
          message.delegatorShares = reader.string();
          break;
        case 7:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 8:
          message.unbondingHeight = reader.int64() as Long;
          break;
        case 9:
          message.unbondingTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.commission = Commission.decode(reader, reader.uint32());
          break;
        case 11:
          message.minSelfDelegation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    const message = { ...baseValidator } as Validator;
    if (
      object.operatorAddress !== undefined &&
      object.operatorAddress !== null
    ) {
      message.operatorAddress = String(object.operatorAddress);
    } else {
      message.operatorAddress = "";
    }
    if (
      object.consensusPubkey !== undefined &&
      object.consensusPubkey !== null
    ) {
      message.consensusPubkey = Any.fromJSON(object.consensusPubkey);
    } else {
      message.consensusPubkey = undefined;
    }
    if (object.jailed !== undefined && object.jailed !== null) {
      message.jailed = Boolean(object.jailed);
    } else {
      message.jailed = false;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = bondStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.tokens !== undefined && object.tokens !== null) {
      message.tokens = String(object.tokens);
    } else {
      message.tokens = "";
    }
    if (
      object.delegatorShares !== undefined &&
      object.delegatorShares !== null
    ) {
      message.delegatorShares = String(object.delegatorShares);
    } else {
      message.delegatorShares = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromJSON(object.description);
    } else {
      message.description = undefined;
    }
    if (
      object.unbondingHeight !== undefined &&
      object.unbondingHeight !== null
    ) {
      message.unbondingHeight = Long.fromString(object.unbondingHeight);
    } else {
      message.unbondingHeight = Long.ZERO;
    }
    if (object.unbondingTime !== undefined && object.unbondingTime !== null) {
      message.unbondingTime = fromJsonTimestamp(object.unbondingTime);
    } else {
      message.unbondingTime = undefined;
    }
    if (object.commission !== undefined && object.commission !== null) {
      message.commission = Commission.fromJSON(object.commission);
    } else {
      message.commission = undefined;
    }
    if (
      object.minSelfDelegation !== undefined &&
      object.minSelfDelegation !== null
    ) {
      message.minSelfDelegation = String(object.minSelfDelegation);
    } else {
      message.minSelfDelegation = "";
    }
    return message;
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.operatorAddress !== undefined &&
      (obj.operatorAddress = message.operatorAddress);
    message.consensusPubkey !== undefined &&
      (obj.consensusPubkey = message.consensusPubkey
        ? Any.toJSON(message.consensusPubkey)
        : undefined);
    message.jailed !== undefined && (obj.jailed = message.jailed);
    message.status !== undefined &&
      (obj.status = bondStatusToJSON(message.status));
    message.tokens !== undefined && (obj.tokens = message.tokens);
    message.delegatorShares !== undefined &&
      (obj.delegatorShares = message.delegatorShares);
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    message.unbondingHeight !== undefined &&
      (obj.unbondingHeight = (message.unbondingHeight || Long.ZERO).toString());
    message.unbondingTime !== undefined &&
      (obj.unbondingTime = message.unbondingTime.toISOString());
    message.commission !== undefined &&
      (obj.commission = message.commission
        ? Commission.toJSON(message.commission)
        : undefined);
    message.minSelfDelegation !== undefined &&
      (obj.minSelfDelegation = message.minSelfDelegation);
    return obj;
  },

  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = { ...baseValidator } as Validator;
    if (
      object.operatorAddress !== undefined &&
      object.operatorAddress !== null
    ) {
      message.operatorAddress = object.operatorAddress;
    } else {
      message.operatorAddress = "";
    }
    if (
      object.consensusPubkey !== undefined &&
      object.consensusPubkey !== null
    ) {
      message.consensusPubkey = Any.fromPartial(object.consensusPubkey);
    } else {
      message.consensusPubkey = undefined;
    }
    if (object.jailed !== undefined && object.jailed !== null) {
      message.jailed = object.jailed;
    } else {
      message.jailed = false;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.tokens !== undefined && object.tokens !== null) {
      message.tokens = object.tokens;
    } else {
      message.tokens = "";
    }
    if (
      object.delegatorShares !== undefined &&
      object.delegatorShares !== null
    ) {
      message.delegatorShares = object.delegatorShares;
    } else {
      message.delegatorShares = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromPartial(object.description);
    } else {
      message.description = undefined;
    }
    if (
      object.unbondingHeight !== undefined &&
      object.unbondingHeight !== null
    ) {
      message.unbondingHeight = object.unbondingHeight as Long;
    } else {
      message.unbondingHeight = Long.ZERO;
    }
    if (object.unbondingTime !== undefined && object.unbondingTime !== null) {
      message.unbondingTime = object.unbondingTime;
    } else {
      message.unbondingTime = undefined;
    }
    if (object.commission !== undefined && object.commission !== null) {
      message.commission = Commission.fromPartial(object.commission);
    } else {
      message.commission = undefined;
    }
    if (
      object.minSelfDelegation !== undefined &&
      object.minSelfDelegation !== null
    ) {
      message.minSelfDelegation = object.minSelfDelegation;
    } else {
      message.minSelfDelegation = "";
    }
    return message;
  },
};

const baseCommission: object = {};

export const Commission = {
  encode(
    message: Commission,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commissionRates !== undefined) {
      CommissionRates.encode(
        message.commissionRates,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.updateTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updateTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Commission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommission } as Commission;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commissionRates = CommissionRates.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.updateTime = fromTimestamp(
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

  fromJSON(object: any): Commission {
    const message = { ...baseCommission } as Commission;
    if (
      object.commissionRates !== undefined &&
      object.commissionRates !== null
    ) {
      message.commissionRates = CommissionRates.fromJSON(
        object.commissionRates
      );
    } else {
      message.commissionRates = undefined;
    }
    if (object.updateTime !== undefined && object.updateTime !== null) {
      message.updateTime = fromJsonTimestamp(object.updateTime);
    } else {
      message.updateTime = undefined;
    }
    return message;
  },

  toJSON(message: Commission): unknown {
    const obj: any = {};
    message.commissionRates !== undefined &&
      (obj.commissionRates = message.commissionRates
        ? CommissionRates.toJSON(message.commissionRates)
        : undefined);
    message.updateTime !== undefined &&
      (obj.updateTime = message.updateTime.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Commission>): Commission {
    const message = { ...baseCommission } as Commission;
    if (
      object.commissionRates !== undefined &&
      object.commissionRates !== null
    ) {
      message.commissionRates = CommissionRates.fromPartial(
        object.commissionRates
      );
    } else {
      message.commissionRates = undefined;
    }
    if (object.updateTime !== undefined && object.updateTime !== null) {
      message.updateTime = object.updateTime;
    } else {
      message.updateTime = undefined;
    }
    return message;
  },
};

const baseCommissionRates: object = {
  rate: "",
  maxRate: "",
  maxChangeRate: "",
};

export const CommissionRates = {
  encode(
    message: CommissionRates,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rate !== "") {
      writer.uint32(10).string(message.rate);
    }
    if (message.maxRate !== "") {
      writer.uint32(18).string(message.maxRate);
    }
    if (message.maxChangeRate !== "") {
      writer.uint32(26).string(message.maxChangeRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommissionRates {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommissionRates } as CommissionRates;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rate = reader.string();
          break;
        case 2:
          message.maxRate = reader.string();
          break;
        case 3:
          message.maxChangeRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommissionRates {
    const message = { ...baseCommissionRates } as CommissionRates;
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = String(object.rate);
    } else {
      message.rate = "";
    }
    if (object.maxRate !== undefined && object.maxRate !== null) {
      message.maxRate = String(object.maxRate);
    } else {
      message.maxRate = "";
    }
    if (object.maxChangeRate !== undefined && object.maxChangeRate !== null) {
      message.maxChangeRate = String(object.maxChangeRate);
    } else {
      message.maxChangeRate = "";
    }
    return message;
  },

  toJSON(message: CommissionRates): unknown {
    const obj: any = {};
    message.rate !== undefined && (obj.rate = message.rate);
    message.maxRate !== undefined && (obj.maxRate = message.maxRate);
    message.maxChangeRate !== undefined &&
      (obj.maxChangeRate = message.maxChangeRate);
    return obj;
  },

  fromPartial(object: DeepPartial<CommissionRates>): CommissionRates {
    const message = { ...baseCommissionRates } as CommissionRates;
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    } else {
      message.rate = "";
    }
    if (object.maxRate !== undefined && object.maxRate !== null) {
      message.maxRate = object.maxRate;
    } else {
      message.maxRate = "";
    }
    if (object.maxChangeRate !== undefined && object.maxChangeRate !== null) {
      message.maxChangeRate = object.maxChangeRate;
    } else {
      message.maxChangeRate = "";
    }
    return message;
  },
};

const baseDescription: object = {
  moniker: "",
  identity: "",
  website: "",
  securityContact: "",
  details: "",
};

export const Description = {
  encode(
    message: Description,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.identity !== "") {
      writer.uint32(18).string(message.identity);
    }
    if (message.website !== "") {
      writer.uint32(26).string(message.website);
    }
    if (message.securityContact !== "") {
      writer.uint32(34).string(message.securityContact);
    }
    if (message.details !== "") {
      writer.uint32(42).string(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDescription } as Description;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moniker = reader.string();
          break;
        case 2:
          message.identity = reader.string();
          break;
        case 3:
          message.website = reader.string();
          break;
        case 4:
          message.securityContact = reader.string();
          break;
        case 5:
          message.details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Description {
    const message = { ...baseDescription } as Description;
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = String(object.moniker);
    } else {
      message.moniker = "";
    }
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity);
    } else {
      message.identity = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = String(object.website);
    } else {
      message.website = "";
    }
    if (
      object.securityContact !== undefined &&
      object.securityContact !== null
    ) {
      message.securityContact = String(object.securityContact);
    } else {
      message.securityContact = "";
    }
    if (object.details !== undefined && object.details !== null) {
      message.details = String(object.details);
    } else {
      message.details = "";
    }
    return message;
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.identity !== undefined && (obj.identity = message.identity);
    message.website !== undefined && (obj.website = message.website);
    message.securityContact !== undefined &&
      (obj.securityContact = message.securityContact);
    message.details !== undefined && (obj.details = message.details);
    return obj;
  },

  fromPartial(object: DeepPartial<Description>): Description {
    const message = { ...baseDescription } as Description;
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = object.moniker;
    } else {
      message.moniker = "";
    }
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity;
    } else {
      message.identity = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = object.website;
    } else {
      message.website = "";
    }
    if (
      object.securityContact !== undefined &&
      object.securityContact !== null
    ) {
      message.securityContact = object.securityContact;
    } else {
      message.securityContact = "";
    }
    if (object.details !== undefined && object.details !== null) {
      message.details = object.details;
    } else {
      message.details = "";
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
