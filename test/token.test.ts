import { PrivateKey } from '@aleohq/sdk';
import aleoConfig from '../aleo-config';
import { Sample_programContract } from '../artifacts/js/sample_program';
import { TokenContract } from '../artifacts/js/token';
import { token, tokenLeo } from '../artifacts/js/types/token';
import { parseRecordString } from '@aleojs/core';
import { gettoken } from '../artifacts/js/leo2js/token';

const amount = BigInt(2);

const TIMEOUT = 20000_000; // Also overwrite timeout in validateBroadcast in aleo/core package
const tokenContract = new TokenContract({ mode: 'execute' });
const sample_program = new Sample_programContract({ mode: 'execute' });
const admin = aleoConfig.accounts[0];
const wallet = PrivateKey.from_string(admin).to_address().to_string();

describe('Token Contract', () => {
  describe.skip('deploy', () => {
    test('Token deploy', async () => {
      tokenContract.connect(wallet);
      const tx = await tokenContract.deploy();
      await tokenContract.wait(tx);
    }, TIMEOUT);

    test('Sample_program deploy', async () => {
      sample_program.connect(wallet);
      const tx = await sample_program.deploy();
      await sample_program.wait(tx);
    }, TIMEOUT);
  })


  describe('mint and burn', () => {
    let record: token

    //mint new record
    test.skip('mint', async () => {
      const [result, tx] = await tokenContract.mint_private(wallet, amount);
      record = gettoken(parseRecordString(PrivateKey.from_string(tokenContract.config.privateKey).to_view_key().decrypt(result)) as tokenLeo)
      console.log(record)
      await tokenContract.wait(tx);
      expect(record.owner).toBe(wallet);
      expect(record.amount.toString()).toBe(amount.toString());
    }, TIMEOUT);

    //pass same record to another contract and donot do anything with the record
    test.skip('burn with sample contract', async () => {

      const [result, tx] = await sample_program.burntoken(record);
      await sample_program.wait(tx);
      expect(result).toBe(record.amount);
    }, TIMEOUT);

    //pass same record to transfer private to use it
    test('transfer private', async () => {

      const [result, result2, tx] = await tokenContract.transfer_private(record, wallet, amount)
      const record2 = gettoken(parseRecordString(PrivateKey.from_string(tokenContract.config.privateKey).to_view_key().decrypt(result2)) as tokenLeo)
      await tokenContract.wait(tx)
      expect(record2.amount).toBe(amount)
    }, TIMEOUT)
  })

})

