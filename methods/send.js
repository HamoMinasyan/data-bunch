import { ERR } from "../utils";

export function sendMaker (values = {}) {
    const keys = Object.keys(values);
    for (let i = 0, len = keys.length; i < len; ++i) {
        const key = keys[i];

        if (!this.dataBunch[key]) {
            ERR.initialValues("send", key);
            continue;
        }

        const newValue = values[key];
        const { listeners } = this.dataBunch[key];
        const listenersKeys = Object.keys(listeners);

        for (let j = 0, lLen = listenersKeys.length; j < lLen; ++j) {
            const listener = listeners[listenersKeys[j]];
            listener(newValue);
        }

        this.watcher(this.dataBunch, key);
    }
}