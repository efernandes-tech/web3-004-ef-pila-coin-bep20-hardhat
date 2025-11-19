import { ethers } from 'hardhat';

async function main() {
    const newPilacoin = await ethers.deployContract('NewPilaCoin');

    await newPilacoin.waitForDeployment();

    console.log(`Contract deployed at ${newPilacoin.target}`);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
