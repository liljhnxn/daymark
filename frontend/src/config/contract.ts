import { Address } from "viem";

export const DAYMARK_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_DAYMARK_CONTRACT_ADDRESS ||
  "0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929") as Address;

export const isContractConfigured = (): boolean => {
  return (
    Boolean(DAYMARK_CONTRACT_ADDRESS) &&
    DAYMARK_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000"
  );
};

export const DAYMARK_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalCheckIns",
        type: "uint256",
      },
    ],
    name: "CheckedIn",
    type: "event",
  },
  {
    inputs: [],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getCheckInInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "latestTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalCount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "checkedInToday",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "hasCheckedInToday",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastCheckInDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastCheckInTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalCheckIns",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
