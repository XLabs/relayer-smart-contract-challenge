/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  RelayerGateway,
  RelayerGatewayInterface,
} from "../RelayerGateway";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract WormholeRelayerMock",
        name: "relayerMock",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "deliverGR",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161096c38038061096c83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6108d9806100936000396000f3fe60806040526004361061001e5760003560e01c806309f6d13b14610023575b600080fd5b61003661003136600461056f565b610038565b005b6000610043826100ba565b90506000610050826101c7565b6000546040516322133eaf60e01b81529192506001600160a01b0316906322133eaf903490610083908590600401610644565b6000604051808303818588803b15801561009c57600080fd5b505af11580156100b0573d6000803e3d6000fd5b5050505050505050565b6100c261050c565b6100ca61050c565b60408051600d8082526101c0820190925260009160429190816020015b60608152602001906001900390816100e7575050835260005b600d811015610147576060610116878585610412565b865180519196509192508291908490811061013357610133610677565b602090810291909101015250600101610100565b50600485830181015163ffffffff908116602086015292019161016e908690849061048716565b61ffff9182166040860152808701600881015167ffffffffffffffff166060870152600981015160ff166080870152600b9081015191019350906101b790879085908416610412565b5060a08501525091949350505050565b60608060016003600d85600001516000815181106101e7576101e7610677565b6020026020010151866000015160018151811061020657610206610677565b6020026020010151876000015160028151811061022557610225610677565b6020026020010151886000015160038151811061024457610244610677565b6020026020010151896000015160048151811061026357610263610677565b60200260200101518a6000015160058151811061028257610282610677565b60200260200101518b600001516006815181106102a1576102a1610677565b60200260200101518c600001516007815181106102c0576102c0610677565b60200260200101518d600001516008815181106102df576102df610677565b60200260200101516040516020016103029c9b9a999897969594939291906106a9565b60405160208183030381529060405290506060836000015160098151811061032c5761032c610677565b60200260200101518460000151600a8151811061034b5761034b610677565b60200260200101518560000151600b8151811061036a5761036a610677565b60200260200101518660000151600c8151811061038957610389610677565b60200260200101518760200151600089604001516103aa8b60400151610495565b8b606001516040516020016103c799989796959493929190610786565b60405160208183030381529060405290506000828286608001518760a001516040516020016103f9949392919061082f565b60408051601f1981840301815291905295945050505050565b60606000826000036104355750506040805160008152602081019091528261047f565b5050604051828201601f83168061044a575060205b80830184810186838901015b8183101561046e578051835260209283019201610456565b5050848452601f01601f1916604052505b935093915050565b600291810182015192910190565b60008054604051633e8267e760e01b815261ffff841660048201526001600160a01b0390911690633e8267e790602401602060405180830381865afa1580156104e2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610506919061088a565b92915050565b6040518060c0016040528060608152602001600063ffffffff168152602001600061ffff168152602001600067ffffffffffffffff168152602001600060ff168152602001606081525090565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561058157600080fd5b813567ffffffffffffffff8082111561059957600080fd5b818401915084601f8301126105ad57600080fd5b8135818111156105bf576105bf610559565b604051601f8201601f19908116603f011681019083821181831017156105e7576105e7610559565b8160405282815287602084870101111561060057600080fd5b826020860160208301376000928101602001929092525095945050505050565b60005b8381101561063b578181015183820152602001610623565b50506000910152565b6020815260008251806020840152610663816040850160208701610620565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b6000815161069f818560208601610620565b9290920192915050565b6001600160f81b031960f88e811b821683526001600160e01b031960e08f901b1660018401528c901b16600582015289516000906106ee816006850160208f01610620565b8a5190830190610705816006840160208f01610620565b8a5191019061071b816006840160208e01610620565b8951910190610731816006840160208d01610620565b8851910190610747816006840160208c01610620565b61077161076b61076561075f6006858701018c61068d565b8a61068d565b8861068d565b8661068d565b925050509d9c50505050505050505050505050565b60008a51610798818460208f01610620565b8a51908301906107ac818360208f01610620565b8a519101906107bf818360208e01610620565b89519101906107d2818360208d01610620565b60e098891b6001600160e01b0319908116929091019182529690971b90951660048701525060f09290921b6001600160f01b0319166008850152600a84015260c01b6001600160c01b031916602a83015250603201949350505050565b60008551610841818460208a01610620565b855190830190610855818360208a01610620565b60f886901b6001600160f81b0319169101908152835161087c816001840160208801610620565b016001019695505050505050565b60006020828403121561089c57600080fd5b505191905056fea2646970667358221220af4fd2796dcaf6627e98e75af8d41856a1d8049a101e7d4b1dbeb7b018aaff5664736f6c63430008180033";

type RelayerGatewayConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RelayerGatewayConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RelayerGateway__factory extends ContractFactory {
  constructor(...args: RelayerGatewayConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    relayerMock: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(relayerMock, overrides || {});
  }
  override deploy(
    relayerMock: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(relayerMock, overrides || {}) as Promise<
      RelayerGateway & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RelayerGateway__factory {
    return super.connect(runner) as RelayerGateway__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RelayerGatewayInterface {
    return new Interface(_abi) as RelayerGatewayInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RelayerGateway {
    return new Contract(address, _abi, runner) as unknown as RelayerGateway;
  }
}
