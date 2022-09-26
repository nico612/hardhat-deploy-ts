
import fs from "fs";


export function readJSONFile<T>(path: string): T {
    let json = JSON.parse(fs.readFileSync(path).toString())
    return json
}


export function writeFileSyncToFile(path: string, object: any) {
    let json = JSON.stringify(object);
    fs.writeFileSync(path, json)
}
