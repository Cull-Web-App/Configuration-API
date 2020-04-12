export const getConfigForEnv = (configsForAllEnvs: any, env?: string): any => configsForAllEnvs[
    (env || (process.env.ENV as string)).toUpperCase()
];
