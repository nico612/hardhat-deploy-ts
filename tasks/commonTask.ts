import { types, task, HardhatUserConfig } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";
import { Interface } from "@ethersproject/abi";
import { read_contract_address, write_config } from "../scripts/deployment";
import { ethers } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { getSigner } from "../scripts/helper";


task("deploy", "deploy contract")
    .addParam('name', 'smart contract name', undefined, types.string)
    .addOptionalParam('a', 'the contract constructor args', undefined, types.string)
    .addFlag('local', 'whether use local account')
    .setAction(deploy)

task("deployUUPS", "deploy contract")
    .addParam('name', 'smart contract name', undefined, types.string)
    .addOptionalParam('a', 'the contract constructor args', undefined, types.string)
    .addFlag('local', 'whether use local account')
    .setAction(deployUUPS)

task("upgrade", "upgrade uups contract")
    .addParam('name', 'smart contract name', undefined, types.string)
    .addOptionalParam('addr', 'smart contract addr or proxy addr')
    .addFlag('local', 'whether use local account')
    .setAction(upgradeUUPS)

task("send", "send transaction to contract")
    .addParam('name', 'smart contract name', undefined, types.string)
    .addParam('m', 'the method of contract', undefined, types.string)
    .addOptionalParam('addr', 'the smart contract address', undefined, types.string)
    .addOptionalParam('a', 'the method args', undefined, types.string)
    .addFlag('local', 'whether use local account')
    .setAction(send)

task("call", "call data from contract")
    .addParam('name', 'smart contract name', undefined, types.string)
    .addParam('m', 'the method of contract', undefined, types.string)
    .addOptionalParam('addr', 'the smart contract address', undefined, types.string)
    .addOptionalParam('a', 'the method args', undefined, types.string)
    .addFlag('local', 'whether use local account')
    .setAction(call)
    
task("transferMainCoin", "transfer chain Main Coin")
    .addParam('to', 'the eth reciver', undefined, types.string)
    .addParam('amount', "transfer amount", undefined, types.string)
    .addFlag('local', 'whether use local account')
    .setAction(transferMainCoin)


async function deploy(params: any, hre: HardhatRuntimeEnvironment) {

    const {contractName, args, factory, chainId} = await parseDeployParmas(params, hre)

    const instance = await factory.deploy(args)
    await instance.deployed()

    console.log(`deployed ${contractName} address = ${instance.address}`);
    
    write_config(chainId, contractName, instance.address)

}

async function deployUUPS(params: any, hre: HardhatRuntimeEnvironment) {

    const {contractName, args, factory, chainId} = await parseDeployParmas(params, hre)

    const proxy = await hre.upgrades.deployProxy(factory, args)
    await proxy.deployed()

    write_config(chainId, contractName, proxy.address)

    console.log(`deploy ${contractName} address = ${proxy.address} `);

}

async function upgradeUUPS(params: any, hre: HardhatRuntimeEnvironment) {

    const {contractName, factory, chainId} = await parseDeployParmas(params, hre)

    let proxyAddr = params.addr;
    if (!proxyAddr) {
        proxyAddr = read_contract_address(chainId, contractName)
    }
    if (!proxyAddr) throw new Error("not found proxyAddr");

    const upgrade = await hre.upgrades.upgradeProxy(proxyAddr, factory)

    console.log(`upgrades success address = ${upgrade.address}`);
}


async function send(params: any, hre: HardhatRuntimeEnvironment) {

    const { signer, from, contractAddr, data} = await parseCallParams(params, hre);

    console.log(`send from ${from} to ${contractAddr} data ${data}`);
    
    const recipt = await signer.sendTransaction({
        from: from,
        to: contractAddr,
        data: data
    }).then(tx => tx.wait())

    console.log(`send success tx = ${recipt}`);
}

async function call(params: any, hre: HardhatRuntimeEnvironment) {
    const { signer, from, contractAddr, data} = await parseCallParams(params, hre);

    console.log(`call from ${from} to ${contractAddr} data ${data}`);

    const recipt = await signer.call({
        from: from,
        to: contractAddr,
        data: data
    })
    console.log("call success recipt = ", recipt);
}


async function transferMainCoin(params: any, hre: HardhatRuntimeEnvironment) {
    const signer = await getSigner(hre, params.local)
    const to = params.to;
    const amount = params.amount
    const tx = await signer.sendTransaction({to:  to, value: amount}).then(tx => tx.wait())
    console.log(`transfer success tx = ${tx}`);
}


async function parseDeployParmas(params: any, hre: HardhatRuntimeEnvironment) {
    const contractName = params.name
    if (!contractName) throw new Error("contract name not found");
    
    const args = params.a == null ? [] : params.a.trim().split(",")

    const signer = await getSigner(hre, params.local)

    const factory = await hre.ethers.getContractFactory(contractName, signer)

    const chainId = await signer.getChainId()

    return {contractName, args, factory, chainId}
}


async function parseCallParams(params: any, hre: HardhatRuntimeEnvironment) {

    let signer: SignerWithAddress | ethers.providers.JsonRpcSigner;
    
    signer = await getSigner(hre, params.local)

    const from = await signer.getAddress()
    
    const contractName = params.name
    if (!contractName) throw new Error("no contract name");

    const method = params.m
    if (!method) throw new Error("no method");

    const args = params.a == null ? [] : params.a.trim().split(",")

    const chainId = await signer.getChainId()
    let contractAddr = params.addr;
    if (!contractAddr) {
         contractAddr = read_contract_address(chainId, contractName)
    }
    if (!contractAddr) throw new Error("contract address not found");

    const abi = (await hre.artifacts.readArtifact(contractName)).abi
    
    const iface = new Interface(abi)

    const data = iface.encodeFunctionData(method, args)

    return {signer, from, contractAddr, data}
}
