const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Myepicproject;
  const baseAccount = anchor.web3.Keypair.generate();
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("📝 Your transaction signature", tx);
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  tx = await program.rpc.addGif(
    "https://media.giphy.com/media/ejJclNX60XyEo555wW/giphy.gif",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );
  console.log("📝 Your transaction signature", tx);

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  console.log("👀 GIF List", account.gifList);

  tx = await program.rpc.addGif(
    "https://www.code-art.com/wp-content/uploads/2022/04/Fatima-Hernandez-6th-grade.png",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );
  console.log("📝 Your transaction signature", tx);

  console.log("Clearing GIFS:");

  tx = await program.rpc.clearGifs({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });
  console.log("📝 Your transaction signature", tx);
  console.log("👀 GIF Count", account.totalGifs.toString());
  console.log("👀 GIF List", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
