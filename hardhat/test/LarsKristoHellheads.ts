/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import moment from "moment";
import { BigNumber, BigNumberish } from "ethers";
import { ethers, network } from "hardhat";
import { DummyERC721, Lease as Lease721 } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const DAO_ACCOUNT_ID = "dao_account.eth";
const MARKET_CREATOR_ACCOUNT_ID = "creator.eth";
const ASSET_ACCOUNT_ID = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TENANT_ACCOUNT_ID = "0x41231dadda96380c114e75e0da8a2b207d9232c2";

const TOKEN_NAME = "larskristo: hellheads";
const TOKEN_SYMBOL = "LKHH";

async function getBlockTimestamp() {
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  const blockTimestamp = blockBefore.timestamp;

  return blockTimestamp;
}

async function createERC721Contract() {
  const [, , signer] = await ethers.getSigners();

  const ERC721 = await ethers.getContractFactory("LarsKristoHellheads");

  const contract = await ERC721.connect(signer).deploy(TOKEN_NAME, TOKEN_SYMBOL);

  return contract;
}

describe("Lease", function () {
  it("Initialize: call constructor", async function () {
    const [owner, , signer] = await ethers.getSigners();

    // console.log({ owner: owner.address, signer: signer.address });

    const ERC721 = await createERC721Contract();

    const name = await ERC721.name();
    const symbol = await ERC721.symbol();

    const ownerOf0 = await ERC721.ownerOf(0);
    const ownerOf1 = await ERC721.ownerOf(1);
    const ownerOf2 = await ERC721.ownerOf(2);
    const ownerOf3 = await ERC721.ownerOf(3);

    expect(name).to.equal(TOKEN_NAME);
    expect(symbol).to.equal(TOKEN_SYMBOL);

    // console.log({ ownerOf0, ownerOf1, ownerOf2, ownerOf3 });

    expect(ownerOf0).to.equal(owner.address);
    expect(ownerOf1).to.equal(owner.address);
    expect(ownerOf2).to.equal(owner.address);
    expect(ownerOf3).to.equal(owner.address);

    const token0 = await ERC721.tokenURI(0);
    const token1 = await ERC721.tokenURI(1);
    const token2 = await ERC721.tokenURI(2);
    const token3 = await ERC721.tokenURI(3);

    // console.log({ token0, token1, token2, token3 });

    // check for token price
    const price = await ERC721.getTokenPrice(0);
    expect(ethers.formatEther(price)).to.equal("0.5");

    // check approval for all
    await expect(ERC721.connect(owner).setApprovalForAll(signer.address, true))
      .to.emit(ERC721, "ApprovalForAll")
      .withArgs(owner.address, signer.address, true);

    const isApprovedForAll = await ERC721.isApprovedForAll(owner.address, signer.address);
    expect(isApprovedForAll).to.be.true;
  });

  it("getTokenPrice", async function () {
    const ERC721 = await createERC721Contract();

    const price = await ERC721.getTokenPrice(0);

    // console.log({ price: ethers.formatEther(price) });

    expect(ethers.formatEther(price)).to.equal("0.5");
  });

  it("setTokenForSale", async function () {
    const [owner, , signer, someoneElse] = await ethers.getSigners();

    const ERC721 = await createERC721Contract();

    await ERC721.connect(owner).setApprovalForAll(signer.address, true);

    await ERC721.connect(signer).setTokenForSale(owner.address, 0, BigInt(ethers.parseEther("0.6")));

    const price1 = await ERC721.getTokenPrice(0);

    console.log({ price1: ethers.formatEther(price1) });

    expect(ethers.formatEther(price1)).to.equal("0.6");

    await ERC721.connect(owner).setTokenForSale(owner.address, 1, BigInt(ethers.parseEther("0.6")));

    const price2 = await ERC721.getTokenPrice(0);

    console.log({ price2: ethers.formatEther(price2) });

    expect(ethers.formatEther(price2)).to.equal("0.6");

    await expect(ERC721.connect(someoneElse).setTokenForSale(owner.address, 2, BigInt(ethers.parseEther("0.6")))).to.be
      .reverted;
  });
});
