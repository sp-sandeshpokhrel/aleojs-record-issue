import {
  token
} from "./types/token";
import {
  gettokenLeo
} from "./js2leo/token";
import {
  gettoken
} from "./leo2js/token";
import {
  zkRun,
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js
} from "@aleojs/core";
import {
  BaseContract
} from "../../contract/base-contract";
import {
  TransactionModel
} from "@aleohq/sdk";

export class TokenContract extends BaseContract {

  constructor(config: ContractConfig = {}) {
    super(config);
    this.config = {
      ...this.config,
      appName: 'token',
      contractPath: 'artifacts/leo/token',
      fee: '0.01'
    };
  }
  async mint_public(r0: LeoAddress, r1: bigint): Promise < [TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'mint_public',
      params,
    });
    return [result.transaction];
  }

  async mint_private(r0: LeoAddress, r1: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'mint_private',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async transfer_public(r0: LeoAddress, r1: bigint): Promise < [TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_public',
      params,
    });
    return [result.transaction];
  }

  async transfer_private(r0: token, r1: LeoAddress, r2: bigint): Promise < [LeoRecord, LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_private',
      params,
    });
    const out0 = result.data[0];
    const out1 = result.data[1];
    return [out0, out1, result.transaction];
  }

  async transfer_private_to_public(r0: token, r1: LeoAddress, r2: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_private_to_public',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async transfer_public_to_private(r0: LeoAddress, r1: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_public_to_private',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async account(key: LeoAddress, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.address(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'account',
      params,
    });

    if (result != null)
      return leo2js.u64(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`account returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}