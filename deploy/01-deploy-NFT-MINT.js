const { network } = require("hardhat");
require("dotenv").config();
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("----------");
  const args = [/*process.env.FRONTEND_CONTRACT_ACCESS_TOKEN*/];
  const NFT_MINT = await deploy("NFT_MINT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });
  console.log("----------");
};
module.exports.tags = ["all"];
