# Local Deployment

These steps describe how you can deploy your app locally in production mode if you do not want to deploy your app online for free (see [Deployment](./DEPLOYMENT.md)).

## Requirements

* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
* [MongoDB](https://www.mongodb.com/download-center/community?jmp=nav) (v4) must be running locally on port 27017

## Deploy Locally

> Make sure you have all dependencies installed for the server and client (using `npm install`).

1. Change into the root directory `cd group-00-web`
2. Set the environment variable `NODE_ENV` for the server:
    * macOS/Linux: `export NODE_ENV=production` (check with `echo $NODE_ENV`)
    * Windows: `set NODE_ENV "production"` (check with `echo %NODE_ENV%`)
3. Set the environment variable `MONGODB_URI` for the server (change the database name "animals" according to your project):
    * macOS/Linux: `export MONGODB_URI=mongodb://localhost:27017/animalProductionDB`
    * Windows: `set MONGODB_URI "mongodb://localhost:27017/animalProductionDB"`
4. Set the environment variable `VUE_APP_API_ENDPOINT` for the client production build:
    * macOS/Linux: `export VUE_APP_API_ENDPOINT=http://localhost:5000/api`
    * Windows: `set VUE_APP_API_ENDPOINT "http://localhost:5000/api"`
5. Build the minified Vue.js production assets via `npm run build --prefix client`
6. [Run the Heroku app locally](https://devcenter.heroku.com/articles/heroku-local) via `heroku local`

The terminal output should look like this (Heroku uses port 5000 by default):

```none
➜  group-00-web git:(master) ✗ heroku local
3:03:38 PM web.1 |  Express server listening on port 5000, in production mode
3:03:38 PM web.1 |  Backend: http://localhost:5000/api/
3:03:38 PM web.1 |  Frontend (production): http://localhost:5000/
3:03:38 PM web.1 |  Connected to MongoDB with URI: mongodb://localhost:27017/animals-production
```
