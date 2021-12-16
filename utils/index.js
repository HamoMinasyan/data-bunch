export const ERR = {
    initialValues: (method, dataKey) => throw new Error(`[${dataKey}] key is not defined in initial values! (method: ${method})`)
};

export const buildUniqueKeyName = uniqueKey => `subscriberKey-${uniqueKey}`;