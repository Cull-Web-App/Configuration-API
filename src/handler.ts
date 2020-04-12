import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';
import * as apiConfigs from './config/api.config.json';
import * as envConfigs from './config/env.config.json';
import { HTTP_STATUS_CODES } from './constants';
import { getConfigForEnv } from './utils';

export const getEnvConfigForEnv: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const { env } = Object(event.queryStringParameters);

    // Use the passed config or by default the config that this lambda is running in
    return {
        statusCode: HTTP_STATUS_CODES.SUCCESS,
        body: JSON.stringify({
            config: getConfigForEnv(envConfigs, env)
        })
    };
};

export const getApiConfigForEnv: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const { env } = Object(event.queryStringParameters);

    return {
        statusCode: HTTP_STATUS_CODES.SUCCESS,
        body: JSON.stringify({
            config: getConfigForEnv(apiConfigs, env)
        })
    };
};

export const getAllConfigsForEnv: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(event);

    // Call the other handler methods (just as functions, not as lambda)
    const configResponses: APIGatewayProxyResult[] = await Promise.all([
        await getEnvConfigForEnv(event, context, () => console.log()),
        await getApiConfigForEnv(event, context, () => console.log())
    ]);

    return {
        statusCode: HTTP_STATUS_CODES.SUCCESS,
        body: JSON.stringify({
            envConfig: configResponses[0],
            apiConfig: configResponses[1]
        })
    };
};
