const Lottery = artifacts.require("LotteryContractAutoSettlement");

const chai = require("./setupchai.js");
const expect = chai.expect;

require("dotenv").config({path: ".env"});

contract("Lottery Test", async (accounts) => {

  const [deployerAccount, someAccount, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myLottery = await Lottery.new(process.env.INITIAL_STAKE, 3);
  });

  it('stake should be set', async () => {
    let instance = this.myLottery;
    return expect(instance.stake()).to.eventually.be.a.bignumber.equal(process.env.INITIAL_STAKE);
  });

  it('one can enter the lottery', async () => {
    let instance = this.myLottery;
    return expect(instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")})).to.be.fulfilled;
  });

  it('money is transferred to the contract', async () => {
    let instance = this.myLottery;
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});

    return expect(web3.eth.getBalance(instance.address)).to.eventually.be.a.bignumber.equal(process.env.INITIAL_STAKE);
  });

  it('entry account is on players list', async () => {
    let instance = this.myLottery;
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});

    return expect(instance.getPlayers()).to.eventually.be.an('array').that.includes(someAccount);
  });

  it('players list gets updated', async () => {
    let instance = this.myLottery;
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});

    return expect(instance.getPlayers()).to.eventually.have.lengthOf(1);
  });

  it('many ones can enter the lottery', async () => {
    let instance = this.myLottery;
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});
    await instance.enter({from: anotherAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});

    var players = await instance.getPlayers();
    expect(players.length).to.be.equal(2);
    expect(players[0]).to.be.equal(someAccount);
    return expect(players[1]).to.be.equal(anotherAccount);
  });

  it('doesn\'t allow entries with less amount paid', async () => {
    let instance = this.myLottery;
    return expect(instance.enter({from: anotherAccount, value: web3.utils.toWei((parseInt(process.env.INITIAL_STAKE) - 10).toString(), "wei")})).to.be.rejected;
  });

  // it('doesn\'t allow entries with more amount paid', async () => {
  //   let instance = this.myLottery;
  //   return expect(instance.enter({from: anotherAccount, value: web3.utils.toWei((parseInt(process.env.INITIAL_STAKE) + 10).toString(), "wei")})).to.be.rejected;
  // });

  it('winner gets it all', async () => {
    let instance = this.myLottery;
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});
    const balanceBefore = await web3.eth.getBalance(someAccount);    
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});
    await instance.enter({from: someAccount, value: web3.utils.toWei(process.env.INITIAL_STAKE, "wei")});

    // expect(instance.pickWinner({from: deployerAccount})).to.be.fulfilled;
    return expect(instance.getPlayers()).to.eventually.be.empty;
  });

});