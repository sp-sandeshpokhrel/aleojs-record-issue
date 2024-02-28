# Issue: Record unspent even when record is input in transition

## Project Setup

Install aleojs from following repo readme:
https://github.com/venture23-zkp/aleojs

## Running the project

Install the dependencies using the following command:

```bash
npm install
```

Compile the programs:

```bash
aleojs-cli-dev compile
```

Before running test ensure that aleo devnet is running. And ensure that you put privatekey with name `ALEO_PRIVATE_KEY_TESTNET3` in .env file.

This test shows how the issue is happening in the aleo.
Run the token.test.ts file:

```bash
npm run test --runInBand -- token.test.ts
```

## Details of the issue

Here in this aleojs project, I have defined two program

1. token.aleo : It defines several transition function for minting, transferring token/record(for private token).
   It also defines a record of following format:

```
record token {
        // The token owner.
        owner: address,
        // The token amount.
        amount: u64,
    }
```

2. sample_program.aleo : It just imports the token program and has a `burntoken` transition function which takes the token program record(token) as input and simply return amount provided in record.

### Flow of the test

First the test will deploy the token program and then sample_program. Then

- Step 1: It will mint 2 token privately by calling `mint_private` of token program for the given wallet and amount of 2. And it gives record as output.
- Step 2: Then it will call `burntoken` transition function of sample_program by providing the record from step 1 as input. It should return the amount of token provided in record.
- Step 3: Then it will call `transfer_private` from token program again for the same wallet and amount of 2 with the same record from step 1 as input. And it gives two record as output, one for remaining amount and another for transferred amount.

  #### Expected Behaviour

  The expected behaviour is that the record from step 1 should be consumed in step 2 and should not be available for step 3. As the record is consumed in step 2, it should not be available for step 3 to consume again.

  #### Actual Behaviour

  The actual behaviour is that the record from step 1 is not consumed in step 2 and is available for step 3 to consume again. So, the record is unspent even when it is input in transition.
