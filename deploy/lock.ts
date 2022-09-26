import { deployments, ethers, getNamedAccounts } from "hardhat"

//hardhat-deploy 部署方式
export default async function deployLock() {

    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  
    const lockedAmount = ethers.utils.parseEther("1");
  
    const { deployer } = await getNamedAccounts()
    console.log("deployer = ", deployer);
    

    const lock = await deployments.deploy("Lock", {
        from: deployer,
        log: true,
        args:[unlockTime],
        value: lockedAmount
    })

    console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
    
}
//指定标签
deployLock.tags = ["lock"]