var LotteryContractFactory = artifacts.require("LotteryContractFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(LotteryContractFactory);
};
