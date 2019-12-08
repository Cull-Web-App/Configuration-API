import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';
import { HTTP_STATUS_CODES } from './constants';

const envConfigs = require('./config/env.config.json');

export const getConfigForEnv: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    if (!event.queryStringParameters)
    {
        return {
            statusCode: HTTP_STATUS_CODES.CLIENT_ERROR,
            body: JSON.stringify({
                message: 'No query parameters were passed'
            })
        };
    }

    const { env } = event.queryStringParameters;
    return {
        statusCode: HTTP_STATUS_CODES.SUCCESS,
        body: JSON.stringify({
            config: envConfigs[env]
        })
    };
};
