const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORTMATIC_KEY;
const RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

const onboardOptions = {
  dappId: process.env.NEXT_PUBLIC_DAPP_ID,
  networkId: 5, // Goerli
  darkMode: true,
  walletSelect: {
    wallets: [
      { walletName: "metamask", preferred: true },
      { walletName: "coinbase", preferred: true },
      {
        walletName: "walletLink",
        preferred: true,
        rpcUrl: RPC_URL,
        appName: "nft",
      },
      {
        walletName: "fortmatic",
        apiKey: FORTMATIC_KEY,
        preferred: true,
      },
      { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
      { walletName: "gnosis", preferred: true },
      { walletName: "authereum" },

      {
        walletName: "ledger",
        rpcUrl: RPC_URL,
      },
      {
        walletName: "lattice",
        rpcUrl: RPC_URL,
        appName: "nft",
      },
      {
        walletName: "keepkey",
        rpcUrl: RPC_URL,
      },
    ],
  },
  walletCheck: [
    { checkName: "derivationPath" },
    { checkName: "accounts" },
    { checkName: "connect" },
    { checkName: "network" },
  ],
};

export { onboardOptions };
