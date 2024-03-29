import { takeSnapshot, SnapshotRestorer } from "@nomicfoundation/hardhat-network-helpers";
import hre from "hardhat";
import { assert, expect } from "chai";
import { afterEach, beforeEach } from "mocha";

import type { WormholeRelayerMock, RelayerGateway } from "../typechain-types"

describe("RelayerGateway", () => {

  const quorum = 13;
  let wormholeRelayerMock: WormholeRelayerMock;
  let relayerGateway: RelayerGateway;
  before(async () => {
    const wrFactory = await hre.ethers.getContractFactory("WormholeRelayerMock");
    const rgFactory = await hre.ethers.getContractFactory("RelayerGateway");

    wormholeRelayerMock = await wrFactory.deploy();
    relayerGateway = await rgFactory.deploy(await wormholeRelayerMock.getAddress());
  });
  let snapshot: SnapshotRestorer;
  beforeEach(async () => {
    snapshot = await takeSnapshot();
  });

  afterEach(async () => {
    await snapshot.restore();
  });

  describe("Relay GR message", () => {
    it("relay message should succeed", async () => {
      const {message, timestamp, sequence} = buildMockMessage(quorum);

      const tx = await relayerGateway.deliverGR(message);
      const receipt = await tx.wait();

      assert.isNotNull(receipt);
      assert.equal(receipt!.status, 1);
      const events = receipt!.logs.map((log) => wormholeRelayerMock.interface.parseLog(log));
      assert.lengthOf(events, 1);
      const deliveryEvent = events[0];
      assert.isNotNull(deliveryEvent);
      assert.equal(deliveryEvent!.args.timestamp, timestamp);
      assert.equal(deliveryEvent!.args.sequence, sequence);
    });


    it("malformed relay message should fail", async () => {
      const {message} = buildMockMessage(quorum + 3);

      await expect(relayerGateway.deliverGR(message)).to.be.reverted;
    });


    it("relay message without sufficient signatures should fail", async () => {
      const {message} = buildMockMessage(quorum - 7);

      await expect(relayerGateway.deliverGR(message)).to.be.reverted;
    });

    it("relay message with smaller payload should succeed", async () => {
      const {message, timestamp, sequence} = buildMockMessage(quorum, 100);

      const tx = await relayerGateway.deliverGR(message);
      const receipt = await tx.wait();

      assert.isNotNull(receipt);
      assert.equal(receipt!.status, 1);
      const events = receipt!.logs.map((log) => wormholeRelayerMock.interface.parseLog(log));
      assert.lengthOf(events, 1);
      const deliveryEvent = events[0];
      assert.isNotNull(deliveryEvent);
      assert.equal(deliveryEvent!.args.timestamp, timestamp);
      assert.equal(deliveryEvent!.args.sequence, sequence);
    });
  });

});

function buildMockMessage(amountOfSignatures: number, payloadSize = 200) {
  const mockSignature = new Array(66);
  mockSignature.fill(1, 0, mockSignature.length);
  const mockSignatures = [];
  for (let i = 0; i < amountOfSignatures - 1; ++i) {
    mockSignatures.push(mockSignature);
  }
  const signatures = Uint8Array.from(mockSignature.concat(...mockSignatures));
  const timestamp = 10_000;
  const emitterChainId = 6;
  const sequence = 6000;
  const consistencyLevel = 1;

  const payloadData = [];
  for (let i = 0; i < payloadSize; ++i) {
    payloadData.push(i * 2 % 4);
  }
  const payload = Uint8Array.from(payloadData);

  const message = hre.ethers.solidityPacked(
    ["bytes", "uint32", "uint16", "uint64", "uint8", "uint16", "bytes"],
    [signatures, timestamp, emitterChainId, sequence, consistencyLevel, payload.length, payload]
  );

  return {
    message,
    timestamp,
    sequence,
  }
}