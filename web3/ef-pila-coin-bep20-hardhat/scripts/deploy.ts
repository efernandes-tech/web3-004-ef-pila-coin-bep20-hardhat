import { ethers } from 'hardhat';

async function main() {
    const pilacoin = await ethers.deployContract('PilaCoin');

    await pilacoin.waitForDeployment();

    console.log(`Contract deployed at ${pilacoin.target}`);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
