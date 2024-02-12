import type { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            blockGasLimit: 100_000_000,
        },
    },
    solidity: {
        version: "0.8.24",
        settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: "paris" },
    },
};

export default config;