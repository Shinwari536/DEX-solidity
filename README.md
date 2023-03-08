# Hardhat boilerplate

Remove the contracts from contract folder and write your own contracts.

<br>1-First check the node version, it should be 16.
<br>2- use command <i>node --versions</i> to check installed version.
<br>3- use command <i>nvm use 16.19.1</i> to install node version if needed.
<br>4- run <i>yarn install</i>

# Compile Contract
<br> npx hardhat compile 

# Deploy Contract
<br> npx hardhat deploy --network NETWORK_NAME

# Verify Contract
<br> npx hardhat verify CONTRACT_ADDRESS --network NETWORK_NAME