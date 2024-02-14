// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./BytesParsing.sol";

contract WormholeRelayerMock {
    using BytesParsing for bytes;

    event Delivery(uint32 timestamp, uint64 sequence);

    mapping(uint16 => bytes32) registrations;

    function deliver(bytes memory message) payable public {
        uint256 timestampOffset = 1 + 4 + 1 + 13 * 66;
        uint32 timestamp;
        uint64 sequence;
        uint256 offset;

        (timestamp, offset) = message.asUint32Unchecked(timestampOffset);
        offset += 4 + 2 + 32;
        (sequence,) = message.asUint64Unchecked(offset);
        emit Delivery(timestamp, sequence);
    }

    function register(uint16 chainId, bytes32 wormholeRelayer) public {
        registrations[chainId] = wormholeRelayer;
    }

    function getRegisteredWormholeRelayerContract(uint16 chainId) view external returns (bytes32) {
        return registrations[chainId];
    }
}