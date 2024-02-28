import { PrivateKey } from '@aleohq/sdk';
import aleoConfig from '../aleo-config';
import { Sample_programContract } from '../artifacts/js/sample_program';
import { TokenContract } from '../artifacts/js/token';

const contract = new Sample_programContract({ mode: 'execute' });
const token = new TokenContract({ mode: 'execute' });

const admin = aleoConfig.accounts[0];
const wallet = PrivateKey.from_string(admin).to_address().to_string();

(async () => {
  console.log("Deploying token and contract");
  token.connect(wallet);
  const result0 = await token.deploy();
  await token.wait(result0);
  contract.connect(wallet);
  const result = await contract.deploy();
  await contract.wait(result);
  console.log(result);
})();
