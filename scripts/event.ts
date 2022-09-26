import { ethers, network, deployments } from "hardhat";

//执行npx hardhat test test/01-greeting-test.ts 进行监听
//执行 npx hardhat run scripts/01-greeting-setting.ts 调用方法，会回调到01-greeting-test.ts文件中打印监听日志
const filter = {
    address: "0x0E60A81417Ed52406E2BCB6aCD6277B620307A29",
    //指定监听的对象
    // topics: [
    //     ethers.utils.id("SetGreeting(address,string)")
    // ]
}

ethers.provider.on(filter, (log) => {
    
//   console.log("log = ", log);
  //解析日志
  const Event = new ethers.utils.Interface(["event SetGreeting(address indexed user, string greeting)"]);
  let SetGreeting = Event.parseLog(log);
  console.log(SetGreeting.args.user);
  console.log(SetGreeting.args.greeting);
})