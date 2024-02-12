// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract WormholeRelayerMock {
    event Delivery();

    mapping(uint16 => bytes32) registrations;

    function deliver(bytes memory /*message*/) payable public {
        emit Delivery();
    }

    function register(uint16 chainId, bytes32 wormholeRelayer) public {
        registrations[chainId] = wormholeRelayer;
    }

    function getRegisteredWormholeRelayerContract(uint16 chainId) view external returns (bytes32) {
        return registrations[chainId];
    }
}