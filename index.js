import { ERR, buildUniqueKeyName } from "./utils";

class DataBunch {
    constructor (props = {}) {
        const { initialValues  = {}, watcher = () => null } = props;
        this.initialValues = initialValues;
        this.watcher = watcher;

        this.uniqueKey = 0;
        this.dataBunch = {};

        this.reset();
    };

    set = (values = {}) => {
        const keys = Object.keys(values);
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (!this.dataBunch[keys[i]]) return ERR.initialValues("set", keys[i]);

            const key = keys[i];
            const newValue = values[key];
            const { value: prevValue, subscribers } = this.dataBunch[key];
            const subscribersKeys = Object.keys(subscribers);
            this.dataBunch[key].value = (typeof newValue === "function") ? newValue(prevValue) : newValue;

            for (let i = 0, len = subscribersKeys.length; i < len; ++i) {
                const subscriber = subscribers[subscribersKeys[i]];
                subscriber(this.dataBunch[key]?.value);
            }
            this.watcher(this.dataBunch);
        }
    };

    get = (...keys) => {
        const acc = {};
        for (let i = 0, len = keys.length; i < len; ++i) {
            if (!this.dataBunch[keys[i]]) return ERR.initialValues("get", keys[i]);

            acc[keys[i]] = this.dataBunch[keys[i]].value;
        }
        return acc;
    };

    subscribe = (values = {}) => {
        this.uniqueKey += 1;
        const keys = Object.keys(values);
        const uniqueKey = buildUniqueKeyName(this.uniqueKey);

        for (let i = 0, len = keys.length; i < len; ++i) {
            const key = keys[i];
            if (!this.dataBunch[key]) return ERR.initialValues("subscribe", key);

            this.dataBunch[key].subscribers[uniqueKey] = values[key];
            values[key](this.dataBunch[key].value);
        }
        return {
            unsubscribe: (...customKeys) => {
                const unsubscribeKeys = customKeys || keys;
                for (let i = 0, len = unsubscribeKeys.length; i < len; ++i) {
                    const key = unsubscribeKeys[i];
                    delete this.dataBunch[key].subscribers[uniqueKey];
                }
            }
        };
    };

    reset = (...keys) => {
        const resetKeys = keys.length ? keys : Object.keys(this.initialValues);
        for (let i = 0, len = resetKeys.length; i < len; ++i) {
            const resetKey = resetKeys[i];
            if (!this.dataBunch[resetKey]) return ERR.initialValues("reset", resetKey);

            this.dataBunch[resetKey] = {
                value: this.initialValues[resetKey],
                subscribers: {}
            };
        }
    };
}

export default DataBunch;