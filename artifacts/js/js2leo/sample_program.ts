import {
  token,
  tokenLeo,
  MyField,
  MyFieldLeo,
  MyField2,
  MyField2Leo
} from "../types/sample_program";
import {
  js2leo
} from "@aleojs/core";


export function gettokenLeo(token: token): tokenLeo {
  const result: tokenLeo = {
    owner: js2leo.privateField(js2leo.address(token.owner)),
    amount: js2leo.privateField(js2leo.u64(token.amount)),
    _nonce: js2leo.publicField(js2leo.group(token._nonce)),
  }
  return result;
}

export function getMyFieldLeo(myField: MyField): MyFieldLeo {
  const result: MyFieldLeo = {
    a: js2leo.u32(myField.a),
    b: js2leo.u32(myField.b),
    c: js2leo.u32(myField.c),
  }
  return result;
}

export function getMyField2Leo(myField2: MyField2): MyField2Leo {
  const result: MyField2Leo = {
    a: getMyFieldLeo(myField2.a),
    b: js2leo.u32(myField2.b),
  }
  return result;
}