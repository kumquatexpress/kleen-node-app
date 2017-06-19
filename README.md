### Kleen Containerized Node Development
The central `docker-compose.yml` file launches three separate containers for basic services and can be easily modified to be used in swarm. The necessary variables `${HOME_DIR} ${PG_USER} ${PG_PASSWORD}` are read from a file named `.env` in the same directory by default. The main `app` container reads from package.json and installs all dependencies inside of the build, with the default docker image named `docker-node`, which can be built using the included Dockerfile.

Development can be done through a combination of mounted folders (where `$HOME_DIR` points) and the included `sync` command, which will by default pull any new files in `/src` to `/usr/src/app`. This will trigger gulp to restart the app as well. The postgres and redis containers mount volumes that point to a permanent place in the host filesystem, so database state is not lost when the containers are shut down.

Get started:
```bash
# make a .env file to hold some default variables
$ echo "HOME_DIR=$(pwd)" > .env
$ echo "PG_USER=postgres" >> .env
$ echo "PG_PASSWORD=postgres" >> .env

# build our base app image
$ docker build -t docker-node .

# run all of the containers
$ docker-compose -d up
$ docker ps

CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
73417f388383        redis:3.2            "docker-entrypoint..."   10 minutes ago      Up 10 minutes       0.0.0.0:6379->6379/tcp   redis
69c0f3ed9573        docker-node:latest   "npm start"              10 minutes ago      Up 10 minutes       0.0.0.0:3000->3000/tcp   app
43d5281019f4        postgres:9.5         "docker-entrypoint..."   10 minutes ago      Up 10 minutes       0.0.0.0:5432->5432/tcp   postgres

# go into our app container and check out what's running
$ docker exec -it 69c0f3ed9573 bash

root@69c0f3ed9573:/usr/src/app# pm2 status
┌──────────┬────┬──────┬─────┬────────┬─────────┬────────┬─────┬───────────┬──────────┐
│ App name │ id │ mode │ pid │ status │ restart │ uptime │ cpu │ mem       │ watching │
├──────────┼────┼──────┼─────┼────────┼─────────┼────────┼─────┼───────────┼──────────┤
│ server   │ 0  │ fork │ 25  │ online │ 0       │ 11m    │ 0%  │ 44.0 MB   │ disabled │
└──────────┴────┴──────┴─────┴────────┴─────────┴────────┴─────┴───────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app

# to connect to redis using the docker-compose redis service name
root@69c0f3ed9573:/usr/src/app# redis -h redis -p 6379 

# connect to postgres
root@69c0f3ed9573:/usr/src/app# PGPASSWORD=postgres psql -h postgres -U postgres 
```