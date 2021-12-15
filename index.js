class DataBunch {
    constructor (props = {}) {
        const { initialValues  = {}, watcher = () => null } = props;
        this.initialValues = initialValues;
        this.watcher = watcher;

        this.uniqueKey = 0;
        this.dataBunch = {};

        this.reset();
    }

    set = (values = {}) => {
        const keys = Object.keys(values);
        for (let i = 0, len = keys.length; i < len; ++i) {
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
            acc[keys[i]] = this.dataBunch[keys[i]].value;
        }
        return acc;
    };

    subscribe = (values = {}) => {
        const keys = Object.keys(values);
        for (let i = 0, len = keys.length; i < len; ++i) {
            const key = keys[i];
            this.uniqueKey += 1;
            this.dataBunch[key].subscribers[`key-${this.uniqueKey}`] = values[key];
            values[key](this.dataBunch[key].value);
        }

        return {
            unsubscribe: (...customKeys) => {
                const unsubscribeKeys = customKeys || keys;
                for (let i = 0, len = unsubscribeKeys.length; i < len; ++i) {
                    const key = unsubscribeKeys[i];
                    delete this.dataBunch[key].subscribers[`key-${this.uniqueKey}`];
                }
            }
        };
    };

    reset = (...keys) => {
        const resetKeys = keys.length ? keys : Object.keys(this.initialValues);
        for (let i = 0, len = resetKeys.length; i < len; ++i) {
            const resetKey = resetKeys[i];
            this.dataBunch[resetKey] = {
                value: this.initialValues[resetKey],
                subscribers: {}
            };
        }
    };
}

export default DataBunch;