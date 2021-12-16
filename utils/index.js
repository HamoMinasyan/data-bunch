export const ERR = {
    initialValues: (method, dataKey) => console.error(`[${dataKey}] key is not defined in initial values! (method: ${method})`)
};

export const buildUniqueKeyName = uniqueKey => `subscriberKey-${uniqueKey}`;