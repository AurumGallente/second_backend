module.exports = {
    "admin": {
        '/muscule/': {
            "GET": true,
            "POST": true
        },
        '/muscule/:id': {
            "GET": true,
            "POST": true,
            "PUT": true,
            "DELETE": true
        },
        '/login': {
            "POST": false
        },
        '/user': {
            "POST": false,
            "GET": true,
            "PUT": true,
            "DELETE": true
        },
        '/exercise/': {
            "GET": true,
            "POST": true
        },
        '/exercise/:id': {
            "GET": true,
            "POST": true,
            "PUT": true,
            "DELETE": true
        },
        '/muscule/:musculeId/exercise/': {
            "GET": true,
            "POST": true,
            "PUT": true,
            "DELETE": true
        },
        '/exercise/:exerciseId/muscule/': {
            "GET": true,
            "POST": true,
            "PUT": true,
            "DELETE": true
        }
    },
    "guest": {
        '/muscule/': {
            "GET": true
        },
        '/muscule/:id': {
            "GET": true
        },
        '/exercise/': {
            "GET": true
        },
        '/exercise/:id': {
            "GET": true
        },
        '/login': {
            "POST": true
        },
        '/user': {
            "POST": true,
            "GET": true
        },
        '/muscule/:musculeId/exercise/': {
            "GET": true,
            "POST": false,
            "PUT": false,
            "DELETE": false
        },
        '/exercise/:exerciseId/muscule/': {
            "GET": true,
            "POST": false,
            "PUT": false,
            "DELETE": false
        }
    }
};