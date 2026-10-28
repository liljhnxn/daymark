import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { botchain } from "./chain";

export const wagmiConfig = createConfig({
  chains: [botchain],
  connectors: [
    injected(),
  ],
  transports: {
    [botchain.id]: http("https://rpc.botchain.ai"),
  },
  ssr: true,
});
