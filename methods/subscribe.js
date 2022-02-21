import { ERR, subscriptionTypes, buildUniqueKeyName } from "../utils";

export function subscribeMaker (values = {}, type = 1) {
    this.uniqueKey += 1;
    const [subscriptionType, unsubscribeType] = subscriptionTypes[type];
    const keys = Object.keys(values);
    const uniqueKey = buildUniqueKeyName(this.uniqueKey);

    for (let i = 0, len = keys.length; i < len; ++i) {
        const key = keys[i];
        if (!this.dataBunch[key]) {
            ERR.initialValues(subscriptionType, key);
            continue;
        }

        this.dataBunch[key][subscriptionType][uniqueKey] = values[key];
        if (type === 1) {
            values[key](this.dataBunch[key].value);
        }
    }
    return {
        [unsubscribeType]: (...customKeys) => {
            const unsubscribeKeys = customKeys.length ? customKeys : keys;
            for (let i = 0, len = unsubscribeKeys.length; i < len; ++i) {
                const key = unsubscribeKeys[i];
                delete this.dataBunch[key][subscriptionType][uniqueKey];
            }
        }
    };
}