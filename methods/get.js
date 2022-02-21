import { ERR } from "../utils";

export function getMaker (keys = []) {
    const acc = {};
    for (let i = 0, len = keys.length; i < len; ++i) {
        if (!this.dataBunch[keys[i]]) {
            ERR.initialValues("get", keys[i]);
            continue;
        }

        acc[keys[i]] = this.dataBunch[keys[i]].value;
    }
    return acc;
}