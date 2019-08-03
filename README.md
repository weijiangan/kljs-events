# Starting Guide

## Installation

```sh
yarn install # preferred
npm install # alternative
```

## Start Database with prisma

Install [Prisma](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/) version 1.32.2

Then, run prisma with docker

```sh
docker-compose up # for running prisma
docker-compose up -d # for running in background
docker-compose down # for shutting down server
```

## Setup .env

```sh
mv .env.sample .env
```

## Start Prisma

Install specific version of prisma (refer to image prismagraphql/prisma in [docker-compose.yml](docker-compose.yml))

```sh
npm install -g prisma@1.32.2 # Check docker-compose.yml
```

Then, deploy using Prisma CLI

```sh
prisma deploy
```

To run dev server

```sh
npm run start:dev
```
