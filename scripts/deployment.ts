import { dir } from "console";
import path from "path";
import fs, { mkdir, mkdirSync } from "fs"
import { readJSONFile, writeFileSyncToFile } from "./common/fileUtils";


export interface ConfigInterface {
    [chainId: number] : {
        [contractName: string]: string
    }
}

const configPath = `./deployments`

export const write_config =  (chainId: number, contractName: string, address: string) => {
    let filePath = path.join(configPath, "config.json")
    if(!fs.existsSync(filePath)) {
        fs.mkdirSync(configPath, { recursive: true})
        fs.appendFileSync(filePath, "{}", "utf-8")
    }

    let content =  fs.readFileSync(filePath, 'utf-8');
    let contracts = JSON.parse(content);    
    contracts[chainId] = contracts[chainId] || {};
    contracts[chainId][contractName] = address;

    fs.writeFileSync(filePath, JSON.stringify(contracts));
}

export const read_config = (): ConfigInterface => {
    let config = readJSONFile<ConfigInterface>(configPath, 'utf-8')
    return config 
}


export const read_contract_address = (chainId: number, contractName: string) => {
    if(!fs.existsSync(configPath)) {
        return null
    }

   let config = readJSONFile<ConfigInterface>(configPath, 'utf-8')

   return config[chainId][contractName]

}

