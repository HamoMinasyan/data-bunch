import { setMaker } from "./methods/set";
import { getMaker } from "./methods/get";
import { subscribeMaker } from "./methods/subscribe";
import { sendMaker } from "./methods/send";
import { resetMaker } from "./methods/reset";
import { removeMaker } from "./methods/remove";

class DataBunch {
    constructor (props = {}) {
        const { initialValues  = {}, watcher = () => null } = props;
        this.initialValues = initialValues;
        this.watcher = watcher;

        this.uniqueKey = 0;
        this.dataBunch = {};

        this.remove();
    };

    set = (values = {}) => setMaker.apply(this, [values]);

    get = (...keys) => getMaker.apply(this, [keys]);

    subscribe = (values = {}) => subscribeMaker.apply(this, [values, 1]);

    send = (values = {}) => sendMaker.apply(this, [values]);

    listen = (values = {}) => subscribeMaker.apply(this, [values, 2]);

    reset = (...keys) => resetMaker.apply(this, [keys]);

    remove = (...keys) => removeMaker.apply(this, [keys]);
}

export default DataBunch;