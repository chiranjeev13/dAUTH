const { network } = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("----------");
  const args = []; // pass the address of the dApp (generate a random hash addr and put it inside the .env) after deployment you can also remove it from your project if you don't require it
  const NFT_MINT = await deploy("NFT_MINT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });
  console.log("----------");
};
module.exports.tags = ["all"];
