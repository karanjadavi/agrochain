process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const StellarSdk = require("@stellar/stellar-sdk");
const { Keypair, TransactionBuilder, Networks, BASE_FEE, Operation, Address } = StellarSdk;
const Server = StellarSdk.rpc ? StellarSdk.rpc.Server : StellarSdk.SorobanRpc.Server;
const fs = require("fs");

async function deploy() {
  const keypair = Keypair.fromSecret("SBCDJX4YZGDRIS3GHPAF5GH7GBSQG5MNXVTGTLQCSCA4INC2ONDIN7M5");
  const server = new Server("https://soroban-testnet.stellar.org");

  console.log("Deploying from:", keypair.publicKey());

  const account = await server.getAccount(keypair.publicKey());
  const wasmBuffer = fs.readFileSync("../agrochain-contract/target/wasm32-unknown-unknown/release/agrochain.optimized.wasm");
  const wasmHash = StellarSdk.hash(wasmBuffer);

  console.log("WASM hash:", wasmHash.toString("hex"));

  const tx = new TransactionBuilder(account, {
    fee: "1000000",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(Operation.createCustomContract({
      address: new Address(keypair.publicKey()),
      wasmHash: wasmHash,
    }))
    .setTimeout(60)
    .build();

  const preparedTx = await server.prepareTransaction(tx);
  preparedTx.sign(keypair);

  const result = await server.sendTransaction(preparedTx);
  console.log("Status:", result.status);
  console.log("Hash:", result.hash);

  if (result.status === "PENDING") {
    console.log("Waiting for confirmation...");
    await new Promise(r => setTimeout(r, 6000));
    const final = await server.getTransaction(result.hash);
    console.log("Result:", final.status);
    if (final.returnValue) {
      const contractId = Address.fromScVal(final.returnValue).toString();
      console.log("CONTRACT ID:", contractId);
      fs.writeFileSync("contract-id.txt", contractId);
      console.log("Saved to contract-id.txt");
    }
  }
}

deploy().catch(console.error);
