pragma solidity ^0.8.19;

import "./BytesParsing.sol";

struct VM {
    uint8 version;
    uint32 timestamp;
    uint32 nonce;
    uint16 emitterChainId;
    bytes32 emitterAddress;
    uint64 sequence;
    uint8 consistencyLevel;
    bytes payload;

    uint32 guardianSetIndex;
    Signature[] signatures;

    bytes32 hash;
}


struct SlimVm {
    Signature[] signatures;

    uint32 timestamp;
    uint16 emitterChainId;
    uint64 sequence;
    uint8 consistencyLevel;
    bytes payload;
}

contract RelayerGateway {
    using BytesParsing for bytes;

    function deliver(bytes memory message) payable public {
        SlimVm memory parsedMessage;
        uint256 offset = 0;
        (parsedMessage.timestamp, offset) = message.asUint32Unchecked(offset);
        (parsedMessage.emitterChainId, offset) = message.asUint16Unchecked(offset);
        (parsedMessage.sequence, offset) = message.asUint64Unchecked(offset);
        (parsedMessage.consistencyLevel, offset) = message.asUint8Unchecked(offset);

    }
}