## Kleen Node API Server

The docker compose stack and skeleton utils for this are taken from https://github.com/kumquatexpress/kleen-node.

To start up all docker services, you must first have docker installed. Then, `docker-compose up -d`. Running `docker exec [server-container id] bash` will SSH into the server container, and from there `pm2 logs` will stream logs. Logging is provided by winston and koa-morgan. Running `sync` in the container will rsync all files from your local root directory and hotreload the server.

### Routes
Routes are defined as in the examples in `server/routes/api.js` as objects with a `path`, `controller`, `methods`, `action`, and an optional `args`.

`args` is an object extracting the request parameters, only keys inside of each argument object will be passed to the controller function, and values set on these keys will be sent as default values.

For a given `path`, sending `{method}` to `/api/{controller}/{action}` will invoke the function specified in `controllers/{controller}.js`.
