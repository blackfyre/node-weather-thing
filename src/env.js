module.exports = (DotEnvKey, defaultValue) => {
    if (process.env[DotEnvKey]) {
        return process.env[DotEnvKey];
    }

    return defaultValue;
};