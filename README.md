# Task Management Service 

## Environment variables
To run the app both on a local machine or in a docker container setup environments variables in `.env` like in `.env-example`

## Running the app in docker container

```bash
$ docker compose up -d 
```

## Running the app on local machine

1. Run development environment
```bash
$ docker compose up -d mongo
```

2. Change connection url's hosts in config.ts accordingly

- mongo.url : `mongodb://localhost:27017/admin`

3. Install all dependencies
```bash
$ npm install
```

4. Build the app
```bash
$ npm run build
```

5. Run the app
```bash
$ npm start
```

