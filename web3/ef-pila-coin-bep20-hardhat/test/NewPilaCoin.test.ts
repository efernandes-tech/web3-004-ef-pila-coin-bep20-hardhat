import {
    loadFixture,
    time,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('NewPilaCoin Tests', function () {
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const NewPilaCoin = await hre.ethers.getContractFactory('NewPilaCoin');
        const newPilaCoin = await NewPilaCoin.deploy();

        return { newPilaCoin, owner, otherAccount };
    }

    it('Should have correct name', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const name = await newPilaCoin.name();

        expect(name).to.equal('NewPilaCoin');
    });

    it('Should have correct symbol', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const symbol = await newPilaCoin.symbol();

        expect(symbol).to.equal('NPLC');
    });

    it('Should have correct decimals', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const decimals = await newPilaCoin.decimals();

        expect(decimals).to.equal(18);
    });

    it('Should have correct totalSupply', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const totalSupply = await newPilaCoin.totalSupply();

        expect(totalSupply).to.equal(1000n * 10n ** 18n);
    });

    it('Should get balance', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const balance = await newPilaCoin.balanceOf(owner.address);

        expect(balance).to.equal(1000n * 10n ** 18n);
    });

    it('Should transfer', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const balanceOwnerBefore = await newPilaCoin.balanceOf(owner.address);
        const balanceOtherBefore = await newPilaCoin.balanceOf(
            otherAccount.address,
        );

        await newPilaCoin.transfer(otherAccount.address, 1n);

        const balanceOwnerAfter = await newPilaCoin.balanceOf(owner.address);
        const balanceOtherAfter = await newPilaCoin.balanceOf(
            otherAccount.address,
        );

        expect(balanceOwnerBefore).to.equal(1000n * 10n ** 18n);
        expect(balanceOwnerAfter).to.equal(1000n * 10n ** 18n - 1n);

        expect(balanceOtherBefore).to.equal(0);
        expect(balanceOtherAfter).to.equal(1);
    });

    it('Should NOT transfer', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = newPilaCoin.connect(otherAccount);

        await expect(
            instance.transfer(owner.address, 1n),
        ).to.be.revertedWithCustomError(
            newPilaCoin,
            'ERC20InsufficientBalance',
        );
    });

    it('Should approve', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await newPilaCoin.approve(otherAccount.address, 1n);

        const value = await newPilaCoin.allowance(
            owner.address,
            otherAccount.address,
        );

        expect(value).to.equal(1n);
    });

    it('Should transfer from', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const balanceOwnerBefore = await newPilaCoin.balanceOf(owner.address);
        const balanceOtherBefore = await newPilaCoin.balanceOf(
            otherAccount.address,
        );

        await newPilaCoin.approve(otherAccount.address, 10n);

        const instance = newPilaCoin.connect(otherAccount);
        await instance.transferFrom(owner.address, otherAccount.address, 5n);

        const allowance = await newPilaCoin.allowance(
            owner.address,
            otherAccount.address,
        );

        const balanceOwnerAfter = await newPilaCoin.balanceOf(owner.address);
        const balanceOtherAfter = await newPilaCoin.balanceOf(
            otherAccount.address,
        );

        expect(balanceOwnerBefore).to.equal(1000n * 10n ** 18n);
        expect(balanceOwnerAfter).to.equal(1000n * 10n ** 18n - 5n);

        expect(balanceOtherBefore).to.equal(0);
        expect(balanceOtherAfter).to.equal(5);

        expect(allowance).to.equal(5);
    });

    it('Should NOT transfer from (balance)', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = newPilaCoin.connect(otherAccount);
        await instance.approve(owner.address, 1n);

        await expect(
            newPilaCoin.transferFrom(otherAccount.address, owner.address, 1n),
        ).to.be.revertedWithCustomError(
            newPilaCoin,
            'ERC20InsufficientBalance',
        );
    });

    it('Should NOT transfer from (allowance)', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = newPilaCoin.connect(otherAccount);

        await expect(
            instance.transferFrom(owner.address, otherAccount.address, 1n),
        ).to.be.revertedWithCustomError(
            newPilaCoin,
            'ERC20InsufficientAllowance',
        );
    });

    it('Should mint once', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;
        await newPilaCoin.setMintAmount(mintAmount);

        const balanceBefore = await newPilaCoin.balanceOf(otherAccount.address);

        const instance = newPilaCoin.connect(otherAccount);
        await instance.mint();

        const balanceAfter = await newPilaCoin.balanceOf(otherAccount.address);

        expect(balanceAfter).to.equal(balanceBefore + mintAmount);
    });

    it('Should mint twice (different accounts)', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;
        await newPilaCoin.setMintAmount(mintAmount);

        const balanceBefore = await newPilaCoin.balanceOf(owner.address);
        await newPilaCoin.mint();

        const instance = newPilaCoin.connect(otherAccount);
        await instance.mint();

        const balanceAfter = await newPilaCoin.balanceOf(owner.address);

        expect(balanceAfter).to.equal(balanceBefore + mintAmount);
    });

    it('Should mint twice (different moments)', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;
        await newPilaCoin.setMintAmount(mintAmount);

        const balanceBefore = await newPilaCoin.balanceOf(owner.address);
        await newPilaCoin.mint();

        const mintDelay = 60 * 60 * 24 * 2; // 2 days in seconds
        await time.increase(mintDelay);

        await newPilaCoin.mint();

        const instance = newPilaCoin.connect(otherAccount);
        await instance.mint();

        const balanceAfter = await newPilaCoin.balanceOf(owner.address);

        expect(balanceAfter).to.equal(balanceBefore + mintAmount * 2n);
    });

    it('Should NOT set mint amount', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintAmount = 1000n;

        const instance = newPilaCoin.connect(otherAccount);

        await expect(instance.setMintAmount(mintAmount)).to.be.revertedWith(
            'You do not have permission.',
        );
    });

    it('Should NOT set mint delay', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const mintDelay = 1000n;

        const instance = newPilaCoin.connect(otherAccount);

        await expect(instance.setMintDelay(mintDelay)).to.be.revertedWith(
            'You do not have permission.',
        );
    });

    it('Should NOT mint', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await expect(newPilaCoin.mint()).to.be.revertedWith(
            'Minting is not enabled.',
        );
    });

    it('Should NOT mint twice', async function () {
        const { newPilaCoin, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await newPilaCoin.setMintAmount(1000n);

        await newPilaCoin.mint();

        await expect(newPilaCoin.mint()).to.be.revertedWith(
            'You cannot mint twice in a row.',
        );
    });
});
