var LotteryContractAutoSettlement = artifacts.require("LotteryContractAutoSettlement.sol");

require("dotenv").config({path: "../.env"});

module.exports = function(deployer) {
  deployer.deploy(LotteryContractAutoSettlement, process.env.INITIAL_STAKE, 2);
};
