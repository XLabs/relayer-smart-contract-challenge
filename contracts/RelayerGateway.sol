// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./BytesParsing.sol";
import "./WormholeRelayerMock.sol";


uint8 constant VAA_VERSION = 1;
uint32 constant GUARDIAN_SET = 3;
uint8 constant QUORUM_SIGNATURES = 13;
uint32 constant VAA_NONCE = 0;

struct SlimVm {
    bytes[] signatures;

    uint32 timestamp;
    uint16 emitterChainId;
    uint64 sequence;
    uint8 consistencyLevel;
    bytes payload;
}

contract RelayerGateway {
    using BytesParsing for bytes;

    WormholeRelayerMock wormholeRelayer;

    function deliverGR(bytes memory message) payable public {
        SlimVm memory parsedMessage = parseMessage(message);
        bytes memory vaa = buildVaa(parsedMessage);
        wormholeRelayer.deliver{value: msg.value}(vaa);
    }

    function parseMessage(bytes memory message) pure internal returns (SlimVm memory) {
        SlimVm memory parsedMessage;
        uint256 offset = 0;
        // secp256k1 signature (65 bytes) + guardian set index (1 byte)
        uint256 signatureLength = 66;
        parsedMessage.signatures = new bytes[](QUORUM_SIGNATURES);
        for (uint256 i = 0; i < QUORUM_SIGNATURES; ++i) {
            bytes memory signature;
            (signature, offset) = message.sliceUnchecked(offset, offset + signatureLength);
            parsedMessage.signatures[i] = signature;
        }
        (parsedMessage.timestamp, offset) = message.asUint32Unchecked(offset);
        (parsedMessage.emitterChainId, offset) = message.asUint16Unchecked(offset);
        (parsedMessage.sequence, offset) = message.asUint64Unchecked(offset);
        (parsedMessage.consistencyLevel, offset) = message.asUint8Unchecked(offset);
        (parsedMessage.payload, offset) = message.sliceUnchecked(offset, message.length);

        return parsedMessage;
    }

    function buildVaa(SlimVm memory message) view internal returns (bytes memory) {
        bytes memory firstPart;
        {
            firstPart = abi.encodePacked(
                VAA_VERSION,
                GUARDIAN_SET,
                QUORUM_SIGNATURES,
                message.signatures[0],
                message.signatures[1],
                message.signatures[2],
                message.signatures[3],
                message.signatures[4],
                message.signatures[5],
                message.signatures[6],
                message.signatures[7],
                message.signatures[8]
            );
        }
        bytes memory secondPart;
        {
            secondPart = abi.encodePacked(
                message.signatures[9],
                message.signatures[10],
                message.signatures[11],
                message.signatures[12],
                message.timestamp,
                VAA_NONCE,
                message.emitterChainId,
                getEmitterAddressFromChain(message.emitterChainId),
                message.sequence
            );
        }

        bytes memory result = abi.encodePacked(
            firstPart,
            secondPart,
            message.consistencyLevel,
            message.payload
        );
        return result;
    }

    function getEmitterAddressFromChain(uint16 chainId) view internal returns (bytes32) {
        return wormholeRelayer.getRegisteredWormholeRelayerContract(chainId);
    }
}
