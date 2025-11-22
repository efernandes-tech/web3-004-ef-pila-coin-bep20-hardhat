import { ethers } from 'hardhat';

async function main() {
    const efPilaCoin = await ethers.deployContract('EFPilaCoin');

    await efPilaCoin.waitForDeployment();

    console.log(`Contract deployed at ${efPilaCoin.target}`);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
