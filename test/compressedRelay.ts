import hre from "hardhat";
import { takeSnapshot, SnapshotRestorer } from "@nomicfoundation/hardhat-network-helpers";
import type { Contract, ContractTransactionResponse, EventLog } from "ethers";
import { assert, expect } from "chai";
import { afterEach, beforeEach } from "mocha";
import { inspect } from "util";


describe("RelayerGateway", () => {

  let wormholeRelayerMock: Contract;
  let relayerGateway: Contract;
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
      const mockSignature = new Array(66);
      mockSignature.fill(1, 0, mockSignature.length);
      const mockSignatures = [];
      for (let i = 0; i < 12; ++i) {
        mockSignatures.push(mockSignature);
      }
      const signatures = Uint8Array.from(mockSignature.concat(...mockSignatures));
      const timestamp = 10_000;
      const emitterChainId = 6;
      const sequence = 6000;
      const consistencyLevel = 1;
      const payload = Uint8Array.from([2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0]);

      const message = hre.ethers.solidityPacked(
        ["bytes", "uint32", "uint16", "uint64", "uint8", "bytes"],
        [signatures, timestamp, emitterChainId, sequence, consistencyLevel, payload]
      );

      const tx: ContractTransactionResponse = await relayerGateway.deliverGR(message);
      const receipt = await tx.wait();

      assert.isNotNull(receipt);
      assert.equal(receipt!.status, 1);
      // TODO: parse log with `WormholeRelayerMock` contract
      console.log(`Logs: ${inspect(receipt!.logs, { depth: 5 })}`);
      const events = wormholeRelayerMock. receipt!.logs.filter((event) => (event as EventLog).eventName === "Delivery") as EventLog[];
      assert.lengthOf(events, 1);
      assert.equal(events[0].args.timestamp, timestamp);
      assert.equal(events[0].args.sequence, sequence);
    });


    it("relay message should fail", async () => {
      const mockSignature = new Array(66);
      mockSignature.fill(1, 0, mockSignature.length);
      const mockSignatures = [];
      for (let i = 0; i < 5; ++i) {
        mockSignatures.push(mockSignature);
      }
      const signatures = Uint8Array.from(mockSignature.concat(...mockSignatures));
      const timestamp = 10_000;
      const emitterChainId = 6;
      const sequence = 6000;
      const consistencyLevel = 1;
      const payload = Uint8Array.from([2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0]);

      const message = hre.ethers.solidityPacked(
        ["bytes", "uint32", "uint16", "uint64", "uint8", "bytes"],
        [signatures, timestamp, emitterChainId, sequence, consistencyLevel, payload]
      );

      const tx: ContractTransactionResponse = await relayerGateway.deliverGR(message);
      const receipt = await tx.wait();

      assert.isNotNull(receipt);
      assert.equal(receipt!.status, 1);
      const events = receipt!.logs.filter((event) => (event as EventLog).eventName === "Delivery") as EventLog[];
      assert.lengthOf(events, 1);
      assert.equal(events[0].args.timestamp, timestamp);
      assert.equal(events[0].args.sequence, sequence);
    });
  });

});