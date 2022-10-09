
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

# podman
$ podman --remote build -t platzi-store .
$ podman --remote run -d -p 3001:3000 --env-file ./.env platzi-store
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
