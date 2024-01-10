#  Hardhat Project

## 常用命令

### 启动hardhat网络

`yarn chain` or `npx hardhat node --network hardhat`

### 编译

`yarn compile` or `npx hardhat compile` 

### 测试

`yarn chain` 启动hardhat网络

` yarn test ./test/测试文件` or `npx hardhat test ./test/测试文件`

### 覆盖测试

`yarn coverage`	or	`npx hardhat clean && npx hardhat coverage --network hardhat`

### 部署

如使用私钥部署（默认使用扫码部署），需要创建 `secret.json`, 填入部署合约的私钥

```json
["private_key"]
```

--network：指定部署网络

执行 `npx hardhat networks `可查看配置的网络列表

默认使用扫码部署，部署命令：

`npx hardhat run ./deploy/合约部署文件 --network lixb`

部署具体合约请查看 [deploy文档](./deploy.md)

### 生成`abi`文件

`yarn generate`

### 生成合约可调用ts文件

`yarn typechain`	or	`npx hardhat typechain`

### 清除

`yarn clean`	or	`npx hardhat clean`

## Tasks

`hardhat`框架提供的`Tasks`命令操作功能，所有`tasks`储存再 `./tasks`目录下, 默认使用的是私钥进行操作

使用私钥执行Tasks命令需要创建 `secret.json`, 填入部署合约的私钥

```json
["private_key"]
```

如果要使用扫码执行，需在命令后面加上`--local`

### 查看task

- 查看所有`task` ：`npx hardhat help`

- 查看具体`task`使用方法：`npx hardhat help task名`

  如查看部署命令：`npx hardhat help deploy`

  ```bash
  Usage: hardhat [GLOBAL OPTIONS] deploy [--a <STRING>] --name <STRING> [--local]
  
  OPTIONS:
  
    --a           the contract constructor args 
    --name        smart contract name 
    --local      whether use local account 
  
  deploy: deploy contract
  ```

### 全局可选参数

- `--network`：指定需要执行的网络
- `--local`：是否使用本地私钥执行，默认为`false`（默认使用扫码）

### `deploy`部署合约

`npx hardhat deploy --name 合约名 --a 构造参数 --network lixb`

- `--name`：合约名
- `--a`：构造参数(可选)

### `deployUUPS`部署合约

`npx hardhat deployUUPS--name 合约名 --a 构造参数 --network lixb`

- `--name`：合约名
- `--a`：初始化参数(可选)

### `upgrade`升级合约

`npx hardhat upgrade --name 合约名 --network lixb`

- `--name`：合约名
- `--addr`：可选，原代理合约地址，不传则根据合约名在`config.json`中查找

### send 发送交易

`npx hardhat send 合约名 --m 方法名 --a 参数 --network lixb`

- `--name` 合约名
- `--m` 方法名
- `--a` 参数(可选)
- `--addr` 合约地址（可选）

### call 查询

`npx hardhat call 合约名 --m 方法名 --a 参数 --network lixb`

- `--name` 合约名
- `--m` 方法名
- `--a` 参数(可选)
- `--addr` 合约地址（可选）