import {
  z
} from "zod";
import {
  leoAddressSchema,
  leoPrivateKeySchema,
  leoViewKeySchema,
  leoTxIdSchema,
  leoScalarSchema,
  leoFieldSchema,
  leoBooleanSchema,
  leoU8Schema,
  leoU16Schema,
  leoU32Schema,
  leoU64Schema,
  leoU128Schema,
  leoGroupSchema,
  leoRecordSchema,
  leoTxSchema,
  leoSignatureSchema,
  LeoArray,
  LeoAddress
} from "@aleojs/core";

export interface token {
  owner: LeoAddress;
  amount: bigint;
  _nonce: bigint;
}

export const leoTokenSchema = z.object({
  owner: leoAddressSchema,
  amount: leoU64Schema,
  _nonce: leoGroupSchema,
});
export type tokenLeo = z.infer < typeof leoTokenSchema > ;

export interface MyField {
  a: number;
  b: number;
  c: number;
}

export const leoMyFieldSchema = z.object({
  a: leoU32Schema,
  b: leoU32Schema,
  c: leoU32Schema,
});
export type MyFieldLeo = z.infer < typeof leoMyFieldSchema > ;

export interface MyField2 {
  a: MyField;
  b: number;
}

export const leoMyField2Schema = z.object({
  a: leoMyFieldSchema,
  b: leoU32Schema,
});
export type MyField2Leo = z.infer < typeof leoMyField2Schema > ;