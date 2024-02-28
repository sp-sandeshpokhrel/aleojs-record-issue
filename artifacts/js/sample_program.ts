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
import { token } from "./types/token";
import { gettokenLeo } from "./js2leo/token";

export class Sample_programContract extends BaseContract {

  constructor(config: ContractConfig = {}) {
    super(config);
    this.config = {
      ...this.config,
      appName: 'sample_program',
      contractPath: 'artifacts/leo/sample_program',
      fee: '0.01'
    };
  }
  async burntoken(r0: token): Promise<[bigint, TransactionModel]> {
    const r0Leo = js2leo.json(gettokenLeo(r0));

    const params = [r0Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'burntoken',
      params,
    });
    const out0 = leo2js.u64(result.data[0] as string);
    return [out0, result.transaction];
  }


}