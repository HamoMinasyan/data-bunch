import { ERR } from "../utils";

export function setMaker (values = {}) {
    const keys = Object.keys(values);
    for (let i = 0, kLen = keys.length; i < kLen; ++i) {
        const key = keys[i];

        if (!this.dataBunch[key]) {
            ERR.initialValues("set", key);
            continue;
        }

        const newValue = values[key];
        const { value: prevValue, subscribers } = this.dataBunch[key];
        const subscribersKeys = Object.keys(subscribers);

        this.dataBunch[key].value = (typeof newValue === "function") ? newValue(prevValue) : newValue;

        for (let j = 0, sLen = subscribersKeys.length; j < sLen; ++j) {
            const subscriber = subscribers[subscribersKeys[j]];
            subscriber(this.dataBunch[key]?.value);
        }
        this.watcher(this.dataBunch, key);
    }
}