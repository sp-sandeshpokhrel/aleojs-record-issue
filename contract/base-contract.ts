import { ContractConfig, snarkDeploy } from "@aleojs/core";
import networkConfig from '../aleo-config'
import { PrivateKey, TransactionModel } from "@aleohq/sdk";
import { waitTransaction } from "@aleojs/core";

export class BaseContract {
    public config: ContractConfig = {};

    constructor(config: ContractConfig) {
        if (config) {
            this.config = {
                ...this.config,
                ...config
            };
        }

        if (!this.config.networkName)
            this.config.networkName = networkConfig.defaultNetwork;

        const networkName = this.config.networkName;
        if (networkName) {
            if (!networkConfig?.networks[networkName])
                throw Error(`Network config not defined for ${networkName}.Please add the config in aleo - config.js file in root directory`)

            this.config = {
                ...this.config,
                network: networkConfig.networks[networkName]
            };
        }

        if (!this.config.privateKey && networkName)
            this.config.privateKey = networkConfig.networks[networkName].accounts[0];
    }

    async deploy(): Promise<any> {
        const result = await snarkDeploy({
            config: this.config,
        });

        return result;
    }

    async wait(transaction: TransactionModel): Promise<any> {
        const endpoint = this.config.network.endpoint;
        return waitTransaction(transaction, endpoint)
    }

    connect(account: string) {
        const accounts = this.config.network.accounts.map((pvtKey) => {
            return PrivateKey.from_string(pvtKey).to_address().to_string();
        });
        const accountIndex = accounts.indexOf(account);
        if (accountIndex == -1) {
            throw Error(`Account ${account} not found!`);
        } else {
            this.config.privateKey = this.config.network.accounts[accountIndex];
        }
    }


}