import { Contract } from '@ethersproject/contracts'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { contractNames } from '../ts/deploy';

interface IDeployedContracts {
  [P: string]: Contract;
}

const deployContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment,
) {
  const {
    Token,
    } = contractNames;

  let contracts: IDeployedContracts = {};
  const signers = await hre.ethers.getSigners();

  const testToken = await hre.ethers.getContractFactory(Token, signers[0])
  contracts.Token = await testToken.deploy()

  

  console.log("Token", contracts.Token.address)


  try {
    await hre.run('verify', {
      address: contracts.Token.address,
      constructorArgsParams: [],
    })
  } catch (error) {
    console.log(`Smart contract at address ${contracts.Token.address} is already verified`)
  }


}

export default deployContract
