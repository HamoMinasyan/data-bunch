export function resetMaker (keys = []) {
    const resetKeys = keys.length ? keys : Object.keys(this.initialValues);

    for (let i = 0, len = resetKeys.length; i < len; ++i) {
        const resetKey = resetKeys[i];
        const { subscribers = {}, listeners = {} } = this.dataBunch[resetKey] || {};
        const subscribersKeys = Object.keys(subscribers);
        const listenersKeys = Object.keys(listeners);

        for (let j = 0, sLen = subscribersKeys.length; j < sLen; ++j) {
            const subscriber = subscribers[subscribersKeys[j]];
            subscriber(this.initialValues[resetKey]);
        }

        for (let j = 0, lLen = listenersKeys.length; j < lLen; ++j) {
            const listener = listeners[listenersKeys[j]];
            listener(this.initialValues[resetKey]);
        }

    }
}