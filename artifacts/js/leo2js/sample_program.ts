import {
  token,
  tokenLeo,
  MyField,
  MyFieldLeo,
  MyField2,
  MyField2Leo
} from "../types/sample_program";
import {
  leo2js
} from "@aleojs/core";


export function gettoken(token: tokenLeo): token {
  const result: token = {
    owner: leo2js.address(token.owner),
    amount: leo2js.u64(token.amount),
    _nonce: leo2js.group(token._nonce),
  }
  return result;
}

export function getMyField(myField: MyFieldLeo): MyField {
  const result: MyField = {
    a: leo2js.u32(myField.a),
    b: leo2js.u32(myField.b),
    c: leo2js.u32(myField.c),
  }
  return result;
}

export function getMyField2(myField2: MyField2Leo): MyField2 {
  const result: MyField2 = {
    a: getMyField(myField2.a),
    b: leo2js.u32(myField2.b),
  }
  return result;
}