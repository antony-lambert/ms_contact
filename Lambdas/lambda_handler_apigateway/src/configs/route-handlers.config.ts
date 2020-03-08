export const ROUTE_HANDLERS = {
    get: [
        {
            resource: '/contacts',
            method: 'getAll'
        },
        {
            resource: '/contacts/{id}',
            method: 'getById'
        }
    ],
    post: [
        {
            resource: '/contacts',
            method: 'add'
        }
    ]
};