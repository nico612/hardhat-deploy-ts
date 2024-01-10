1. 下载solidity编译插件

2. 下载solidity编译器，可以在.sol文件中，右键选择下载solidity编译文件进行下载

3. 下载`openzeppelin`合约库

   ```bash
   $ npm install -g @openzeppelin/contracts
   $ npm install -g @openzeppelin/contracts-upgradeable
   ```

4. windows下 `Ctrl + Shift + P` 选择 `perferences: Open Settings (JSON)` 打开设置

   ```json
   {
       "files.exclude": {
           "**/.git": true,
           "**/.svn": true,
           "**/.hg": true,
           "**/CVS": true,
           "**/.DS_Store": true,
           "**/Thumbs.db": true,
           "**/node_modules":true 
       },
       "files.autoSave": "afterDelay",
       "solidity.defaultCompiler": "localFile", //默认使用本地编译
       "solidity.remappingsUnix": [],      //unix 类型配置
       "solidity.remappingsWindows": [     //windows 配置
           //compileUsingLocalVersion设置本地编译文件，最好设置在项目目录下，测试在其他盘里会报错
           "solidity.compileUsingLocalVersion=D:\\Program Files\\solidity\\soljson-v0.8.7+commit.e28d00a7.js",
           //配置openzeppelin库位置
           "@openzeppelin/=D:\\Program Files\\nvm\\v14.19.1\\node_modules\\@openzeppelin" 
       ],
       // "solidity.remappings": [ //同意配置建议使用上面的根据平台配置
       //     "@openzeppelin/=D:\\Program Files\\nvm\\v14.19.1\\node_modules\\@openzeppelin"
       // ],
       "solidity.compileUsingRemoteVersion": "v0.8.7+commit.e28d00a7", //配置远程编译版本
       // "solidity.compileUsingRemoteVersion": "latest", //默认最新
   }
   ```

   

