import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';
import * as envConfigs from './config/env.config.json';
import { HTTP_STATUS_CODES } from './constants';

export const getConfigForEnv: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const { env } = Object(event.queryStringParameters);

    // Use the passed config or by default the config that this lambda is running in
    return {
        statusCode: HTTP_STATUS_CODES.SUCCESS,
        body: JSON.stringify({
            config: envConfigs[(env || (process.env.ENV as string)).toUpperCase()]
        })
    };
};
