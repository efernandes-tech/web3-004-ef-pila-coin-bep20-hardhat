import {
    loadFixture,
    time,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('EFPilaCoin Tests', function () {
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const EFPilaCoin = await hre.ethers.getContractFactory('EFPilaCoin');
        const efPilaCoin = await EFPilaCoin.deploy();

        return { efPilaCoin, owner, otherAccount };
    }

    it('Should have correct name', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const name = await efPilaCoin.name();

        expect(name).to.equal('EFPilaCoin');
    });

    it('Should have correct symbol', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const symbol = await efPilaCoin.symbol();

        expect(symbol).to.equal('EFPLC');
    });

    it('Should have correct decimals', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const decimals = await efPilaCoin.decimals();

        expect(decimals).to.equal(18);
    });

    it('Should have correct totalSupply', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const totalSupply = await efPilaCoin.totalSupply();

        expect(totalSupply).to.equal(10000000n * 10n ** 18n);
    });

    it('Should get balance', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const balance = await efPilaCoin.balanceOf(owner.address);

        expect(balance).to.equal(10000000n * 10n ** 18n);
    });

    it('Should transfer', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const balanceOwnerBefore = await efPilaCoin.balanceOf(owner.address);
        const balanceOtherBefore = await efPilaCoin.balanceOf(
            otherAccount.address,
        );

        await efPilaCoin.transfer(otherAccount.address, 1n);

        const balanceOwnerAfter = await efPilaCoin.balanceOf(owner.address);
        const balanceOtherAfter = await efPilaCoin.balanceOf(
            otherAccount.address,
        );

        expect(balanceOwnerBefore).to.equal(10000000n * 10n ** 18n);
        expect(balanceOwnerAfter).to.equal(10000000n * 10n ** 18n - 1n);

        expect(balanceOtherBefore).to.equal(0);
        expect(balanceOtherAfter).to.equal(1);
    });

    it('Should NOT transfer', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = efPilaCoin.connect(otherAccount);

        await expect(
            instance.transfer(owner.address, 1n),
        ).to.be.revertedWithCustomError(efPilaCoin, 'ERC20InsufficientBalance');
    });

    it('Should approve', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await efPilaCoin.approve(otherAccount.address, 1n);

        const value = await efPilaCoin.allowance(
            owner.address,
            otherAccount.address,
        );

        expect(value).to.equal(1n);
    });

    it('Should transfer from', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const balanceOwnerBefore = await efPilaCoin.balanceOf(owner.address);
        const balanceOtherBefore = await efPilaCoin.balanceOf(
            otherAccount.address,
        );

        await efPilaCoin.approve(otherAccount.address, 10n);

        const instance = efPilaCoin.connect(otherAccount);
        await instance.transferFrom(owner.address, otherAccount.address, 5n);

        const allowance = await efPilaCoin.allowance(
            owner.address,
            otherAccount.address,
        );

        const balanceOwnerAfter = await efPilaCoin.balanceOf(owner.address);
        const balanceOtherAfter = await efPilaCoin.balanceOf(
            otherAccount.address,
        );

        expect(balanceOwnerBefore).to.equal(10000000n * 10n ** 18n);
        expect(balanceOwnerAfter).to.equal(10000000n * 10n ** 18n - 5n);

        expect(balanceOtherBefore).to.equal(0);
        expect(balanceOtherAfter).to.equal(5);

        expect(allowance).to.equal(5);
    });

    it('Should NOT transfer from (balance)', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = efPilaCoin.connect(otherAccount);
        await instance.approve(owner.address, 1n);

        await expect(
            efPilaCoin.transferFrom(otherAccount.address, owner.address, 1n),
        ).to.be.revertedWithCustomError(efPilaCoin, 'ERC20InsufficientBalance');
    });

    it('Should NOT transfer from (allowance)', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = efPilaCoin.connect(otherAccount);

        await expect(
            instance.transferFrom(owner.address, otherAccount.address, 1n),
        ).to.be.revertedWithCustomError(
            efPilaCoin,
            'ERC20InsufficientAllowance',
        );
    });

    it('Should mint once', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;
        await efPilaCoin.setMintAmount(mintAmount);

        const balanceBefore = await efPilaCoin.balanceOf(otherAccount.address);

        await efPilaCoin.mint(otherAccount.address);

        const balanceAfter = await efPilaCoin.balanceOf(otherAccount.address);

        expect(balanceAfter).to.equal(balanceBefore + mintAmount);
    });

    it('Should mint twice (different accounts)', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;
        await efPilaCoin.setMintAmount(mintAmount);

        const balanceBefore = await efPilaCoin.balanceOf(owner.address);
        await efPilaCoin.mint(owner.address);

        await efPilaCoin.mint(otherAccount.address);

        const balanceAfter = await efPilaCoin.balanceOf(owner.address);

        expect(balanceAfter).to.equal(balanceBefore + mintAmount);
    });

    it('Should mint twice (different moments)', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;
        await efPilaCoin.setMintAmount(mintAmount);

        const balanceBefore = await efPilaCoin.balanceOf(otherAccount.address);
        await efPilaCoin.mint(otherAccount.address);

        const mintDelay = 60 * 60 * 24 * 2; // 2 days in seconds
        await time.increase(mintDelay);

        await efPilaCoin.mint(otherAccount.address);

        const balanceAfter = await efPilaCoin.balanceOf(otherAccount.address);

        expect(balanceAfter).to.equal(balanceBefore + mintAmount * 2n);
    });

    it('Should NOT set mint amount', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;

        const instance = efPilaCoin.connect(otherAccount);

        await expect(instance.setMintAmount(mintAmount)).to.be.revertedWith(
            'You do not have permission.',
        );
    });

    it('Should NOT set mint delay', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintDelay = 1000n;

        const instance = efPilaCoin.connect(otherAccount);

        await expect(instance.setMintDelay(mintDelay)).to.be.revertedWith(
            'You do not have permission.',
        );
    });

    it('Should NOT mint', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await expect(efPilaCoin.mint(otherAccount.address)).to.be.revertedWith(
            'Minting is not enabled.',
        );
    });

    it('Should NOT mint twice', async function () {
        const { efPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await efPilaCoin.setMintAmount(1000n);

        await efPilaCoin.mint(otherAccount.address);

        await expect(efPilaCoin.mint(otherAccount.address)).to.be.revertedWith(
            'You cannot mint twice in a row.',
        );
    });
});
