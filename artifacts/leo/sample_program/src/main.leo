import token.aleo;

// The 'sample_program' program.
program sample_program.aleo {
    transition burntoken(rec:token.aleo/token.record)->u64{
        let amount:u64 = rec.amount;
        return amount;
    }
}
