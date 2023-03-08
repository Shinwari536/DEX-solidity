import { expect } from "chai";
import { Contract, BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import hre, { ethers } from "hardhat";



describe("Exchange Contract", function () {

  let signers: Signer[];

  let exchange: Contract;
  let token: Contract;



  before(async () => {
    signers = await ethers.getSigners();

    hre.tracer.nameTags[await signers[0].getAddress()] = "ADMIN";
    hre.tracer.nameTags[await signers[1].getAddress()] = "USER1";

    const Token = await ethers.getContractFactory("Token", signers[0]);
    token = await Token.deploy();

    const Exchange = await ethers.getContractFactory("Exchange", signers[0]);
    exchange = await Exchange.deploy(token.address);

    hre.tracer.nameTags[exchange.address] = "EXCHANGE-CONTRACT";
    hre.tracer.nameTags[token.address] = "TOKEN-CONTRACT";
    
  });


  it("should buy tokens", async function () {
    await token.mint(exchange.address, parseEther('200000'));

    const before: BigNumber = await token.balanceOf(exchange.address);
    console.log("Exchange Balance Before: ",before);

    await exchange.connect(signers[0]).buy({value: parseEther('0.0003')});
    const after = await token.balanceOf(exchange.address);
    expect(after).to.be.equal(before.sub(parseEther('3')))
  })


});