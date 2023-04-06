
## Description


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker
$ docker build -t platzi-store .
$ docker run -d -p 3001:3000 --env-file ./.env platzi-store

# docker-compose
$ docker compose up -d

# podman
$ podman --remote build -t platzi-store .
$ podman --remote run -d -p 3001:3000 --env-file ./.env platzi-store

# podman compose
$ podman-compose --file podman-compose.yml up -d
$ podman-compose --file podman-compose.yml down

# podman pod
$ POD_NAME=platzi-store-pod
$ podman pod create --name $POD_NAME -p 3081:5432  -p 3082:3080 -p 3083:3000
$ podman run --pod $POD_NAME -d --env-file ./.pgadmin.env --name "$POD_NAME-pgadmin" dpage/pgadmin4
$ podman --remote run --pod $POD_NAME -d --env-file ./.postgres.env --name "$POD_NAME-postgres" postgres:alpine
$ podman --remote run --pod $POD_NAME -d --env-file ./.api.env --name "$POD_NAME-api" platzi-store
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
