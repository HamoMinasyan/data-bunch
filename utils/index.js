export const ERR = {
    initialValues: (method, dataKey) => console.error(`DataBunch: [ ${dataKey} ] is not defined in initial values! (method: ${method})`)
};

export const buildUniqueKeyName = uniqueKey => `subscriberKey-${uniqueKey}`;