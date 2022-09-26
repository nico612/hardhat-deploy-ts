# Hardhat project

查看命令

```bash
npx hardhat
```

帮助信息，如`test`

```bash
npx hardhat test --help
```

启动本地节点

```bash
npx hardhat node 
```

如果使用`hardhat-deploy`插件，不支持 上面这种网络, 需指定`hardhat`网络

```bash
npx hardhat node --network hardhat #会自动部署所有合约
或
npx hardhat node --network hardhat --no-deploy #只开启网络
```

编译

```bash
npx hardhat compile
```

测试

```bash
npx hardhat test #测试所有
npx hardhat test test/Lock.ts #指定测试文件
```

部署

```bash
npx hardhat run deploy/deploy.ts #hardhat原部署方式
npx hardhat deploy # hardhat-deploy 部署所有合约
npx hardhat deploy --tasg lock #	部署指定合约, lock需要在部署脚本中被指定
```

合约验证

https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan


vscode 配置

插件 
`solidity`
`hardhat-solidity` 

工作区环境配置

```json
{
    "files.autoSave": "afterDelay",
    "editor.fontSize": 13,
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/Thumbs.db": true,
        "**/node_modules":true
    },
    "solidity.defaultCompiler": "localFile", //默认使用本地编译
    "solidity.compileUsingLocalVersion":"/Users/a123/work/compile/soljson-v0.8.7+commit.e28d00a7.js",
    "solidity.remappingsUnix": [//unix 类型配置
        "solidity.compileUsingLocalVersion=/Users/a123/work/compile/soljson-v0.8.7+commit.e28d00a7.js",
        "@openzeppelin/=/usr/local/lib/node_modules/@openzeppelin"
    ],      
    "solidity.remappingsWindows": [     //windows 配置
        //compileUsingLocalVersion设置本地编译文件，最好设置在项目目录下，测试在其他盘里会报错
        "solidity.compileUsingLocalVersion=D:\\Program Files\\solidity\\soljson-v0.8.7+commit.e28d00a7.js",
        //配置openzeppelin库位置
        "@openzeppelin/=D:\\Program Files\\nvm\\v14.19.1\\node_modules\\@openzeppelin" 
    ],
    // "solidity.remappings": [ //同意配置建议使用上面的根据平台配置
    //     "@openzeppelin/=D:\\Program Files\\nvm\\v14.19.1\\node_modules\\@openzeppelin"
    // ],
    // "solidity.compileUsingRemoteVersion": "v0.8.7+commit.e28d00a7", //配置远程编译版本
    // "solidity.compileUsingRemoteVersion": "latest", //默认最新
}

```

bsc主网网络节点

https://bsc-dataseed1.defibit.io/

https://bsc-dataseed1.ninicoin.io/

https://bsc-dataseed2.defibit.io/

https://bsc-dataseed3.defibit.io/

https://bsc-dataseed4.defibit.io/

https://bsc-dataseed2.ninicoin.io/

https://bsc-dataseed3.ninicoin.io/

https://bsc-dataseed4.ninicoin.io/

https://bsc-dataseed1.binance.org/

https://bsc-dataseed2.binance.org/

https://bsc-dataseed3.binance.org/

https://bsc-dataseed4.binance.org/

