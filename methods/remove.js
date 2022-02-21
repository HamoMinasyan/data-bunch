export function removeMaker (keys = []) {
    const resetKeys = keys.length ? keys : Object.keys(this.initialValues);

    for (let i = 0, len = resetKeys.length; i < len; ++i) {
        const resetKey = resetKeys[i];
        this.dataBunch[resetKey] = {
            value: this.initialValues[resetKey],
            subscribers: {},
            listeners: {}
        };
    }
}