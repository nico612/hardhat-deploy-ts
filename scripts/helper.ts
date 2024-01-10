
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { IRPCMap } from "@walletconnect/types";
import { HardhatRuntimeEnvironment, HardhatUserConfig, HttpNetworkUserConfig } from "hardhat/types";
import { ethers } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export async function getSigner(hre: HardhatRuntimeEnvironment, isLocal: boolean = true) {
    if (isLocal) {
        return (await hre.ethers.getSigners())[0]
    }
    const web3Provider = await getWeb3Provider(hre.userConfig)
    return SignerWithAddress.create(web3Provider.getSigner())
}   

export async function getWeb3Provider(config: HardhatUserConfig): Promise<ethers.providers.Web3Provider> {

    if (!config) throw new Error("not found config");
    const walletConnectProvider = await getWalletConnectProvider(config)
    await walletConnectProvider.enable()
    const web3Provider = new ethers.providers.Web3Provider(walletConnectProvider, "any")
    return web3Provider
}

export async function getWalletConnectProvider(config: HardhatUserConfig) {
    const provider = new WalletConnectProvider(
        {
            rpc: walletConnectRPC(config),
            qrcodeModal: WalletConnectQRCodeModal,
            pollingInterval: 60,
            clientMeta: {
                description: "Smart constract Migration",
                url: "https://github.com/hurry-sea/ss-contract",
                icons: ["https://sevensea.s3.ap-southeast-1.amazonaws.com/sevensea/hideoutWallet/token/ETH_2.svg"],
                name: "Migration"
            }
        }
    )
    provider.on("connect", (error: Error) => {
        if (error) {
            console.log(error);
        }
    });

    provider.on("accountsChanged", (accounts: string[]) => {
        console.log("connect accounts = ", accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
        console.log(chainId);
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code: number, reason: string) => {
        console.log(code, reason);
    });

    return provider

}

function walletConnectRPC(config: HardhatUserConfig) {
    let networks = config.networks;
    let rpc: IRPCMap = {}
    for (const key in networks) {
        const element = networks[key] as HttpNetworkUserConfig;
        const chainId = element.chainId
        if (chainId != null && element.url != null) {
            rpc[chainId] = element.url
        }
    }    
    return rpc
}

export const MINTER_ROLE =         "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
export const ADMIN_ROLE =          "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775"
export const EMPLOY_ROLE =         "0x6da4fe5b86fc4445298f94aa6d4a6e32f86ffe9b8bd1731f5c37ddb577988bf2"
export const UPGRADER_ROLE =       "0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3"
export const DEFAULT_ADMIN_ROLE =  "0x0000000000000000000000000000000000000000000000000000000000000000"
