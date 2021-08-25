const Lottery = artifacts.require("LotteryContractAutoSettlement");
const LotteryFactory = artifacts.require("LotteryContractFactory");

const chai = require("./setupchai.js");
const expect = chai.expect;

contract("Lottery Factory Test", async (accounts) => {

  const [deployerAccount, someAccount, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myLotteryFactory = await LotteryFactory.new();
  });

  it('only owner is allowed to create lotteries', async () => {
    let instance = this.myLotteryFactory;
    return expect(instance.create_lottery(10000, 5, { from: someAccount })).to.be.rejected;
  });

  it('creates a lottery', async () => {
    let instance = this.myLotteryFactory;

    await instance.create_lottery(10000, 5);
    // expect(instance.create_lottery(10000, 5)).to.be.fulfilled;
    return expect(instance.get_lotteries()).to.eventually.have.lengthOf(1);
  });

  it('creates multiple lotteries', async () => {
    let instance = this.myLotteryFactory;

    await instance.create_lottery(10000, 5);
    await instance.create_lottery(100000, 5);

    return expect(instance.get_lotteries()).to.eventually.have.lengthOf(2);
  });

  it('lotteries work fine', async () => {
    let instance = this.myLotteryFactory;

    await instance.create_lottery(10000, 5);
    const LotteryAddresses = await instance.get_lotteries();
    const lottery = await Lottery.at(LotteryAddresses[0]);

    return expect(lottery.stake()).to.eventually.be.a.bignumber.equal('10000');
  });

});