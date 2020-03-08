import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { inject, injectable } from 'inversify';

import { TYPES } from './configs/types';
import { ROUTE_HANDLERS } from "./configs/route-handlers.config";

import { ContactController } from "./controllers/contact.controller";

@injectable()
export class Handler {

    constructor(@inject(TYPES.ContactController) private contactController: ContactController) { }

    async entrypoint(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        try {
            const httpMethod = event.httpMethod.toLowerCase();

            let httpResponse: APIGatewayProxyResult = {
                statusCode: 405,
                body: ''
            };

            if (ROUTE_HANDLERS[httpMethod]) {
                const routeHandlers = ROUTE_HANDLERS[httpMethod];
                const routeHandler = routeHandlers.find(rh => rh.resource === event.resource);

                if (routeHandler) {
                    httpResponse = await this[routeHandler.method](event.pathParameters, event.queryStringParameters, event.body);
                } else {
                    throw Error('Http Method Not Allowed or resource not exists');
                }
            }

            return httpResponse;
        } catch (error) {
            console.log(error);
        }
    }

    private async getAll(pathParameters: any, queryStringParameters: any, body: any): Promise<APIGatewayProxyResult> {
        let result = await this.contactController.getAll();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    }

    private async getById(pathParameters: any, queryStringParameters: any, body: any): Promise<APIGatewayProxyResult> {
        let result = await this.contactController.getById(pathParameters);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    }

    private async add(pathParameters: any, queryStringParameters: any, body: any): Promise<APIGatewayProxyResult> {
        await this.contactController.add(body);
        return {
            statusCode: 201,
            body: ''
        };
    }
}