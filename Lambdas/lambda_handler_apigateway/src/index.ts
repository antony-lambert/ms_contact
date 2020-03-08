import "reflect-metadata";
import { container } from './configs/inversify';
import { TYPES } from './configs/types';

import middy from 'middy';
import { jsonBodyParser, httpErrorHandler, doNotWaitForEmptyEventLoop, cors } from 'middy/middlewares';
import { Handler } from "./handler";

const handler = middy(async (event: any, context: any) => {
    let _handler = container.get<Handler>(TYPES.Handler);
    let res = await _handler.entrypoint(event);
    return res;
});

handler
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(doNotWaitForEmptyEventLoop())
    .use(cors());

export { handler };