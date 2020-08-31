# Deployment

These steps describe how you can deploy your app online for free (**NO** credit card required).

## Requirements

* Free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
* Free [Heroku](https://www.heroku.com/) account
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (Windows users might need to restart their VSCode and/or computer to ensure that Heroku is in their PATH. For `bash: heroku: command not found`, checkout [this](https://stackoverflow.com/a/38746507/6875981) StackOverflow answer.)

> All these services have a **free** tier and can be used **WITHOUT** a credit card.

## Setup Hosted MongoDB

1. Sign up for a free [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
2. You will be forwarded to the *Create New Cluster* view. Otherwise, navigate to Clusters > Build a Cluster.<br/> NOTE: Maybe you need to create an organization and project first.
3. Choose the cloud provider *aws* and the region *Ireland (eu-west-1)* (important for compatibility with Heroku!). Keep all other default settings (e.g., M0 Sandbox free tier, cluster name *Cluster0*) and click *Create Cluster* (takes a few minutes).
4. Click the *Connect* button
5. Click the *Add a Different IP Address* button, enter `0.0.0.0/0` for the IP Address and click *Add IP Address* button.<br/> (**Warning:** limit IP addresses in real production deployments!)
6. Create a new MongoDB user by entering *Username* and *Password* (avoid special characters for mongoose compatibility) and clicking the button *Create MongoDB User*.
7. Continue with *Choose a connection method*
8. Choose *Connect Your Application*
9. Keep the default driver version (Node.js, 3.0 or later) and click the *Copy* button for the Connection String only.
10. Replace the placeholders `<password>` with your MongoDB user password (created in step 6.) and the database name `<dbname>` with a sensible name for your application domain. Example:

    ```none
    mongodb+srv://myUser:mySecurePassword@cluster0-a1bc2.mongodb.net/animalProductionDB?retryWrites=true&w=majority
    ```

Find a more detailed tutorial [here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Setting_up_the_MongoDB_database).

## Deploy to Heroku

### Setup

Sign up for a free [Heroku account](https://signup.heroku.com/).

Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), login via `heroku login`, and follow these steps:

```bash
cd group-00-web
# Optional app name: heroku apps:create my-app-name --region eu
heroku apps:create --region eu
heroku config:set MONGODB_URI="mongodb+srv://myUser:mySecurePassword@cluster0-a1bc2.mongodb.net/animalProductionDB?retryWrites=true&w=majority"
heroku config:set NODE_ENV="production"

# MacOS, Linux
export API_ENDPOINT="$(heroku apps:info -s  | grep web_url | cut -d= -f2)api"
heroku config:set VUE_APP_API_ENDPOINT=$API_ENDPOINT
# Windows
heroku config:set VUE_APP_API_ENDPOINT=web_url_to_your_herokuapp/api
```

To set the API_ENDPOINT, you can also manually extract the `web_url` from `heroku apps:info -s`. For example: `API_ENDPOINT=https://aqueous-crag-12345.herokuapp.com/api`

> The app needs to be re-deployed whenever `VUE_APP_API_ENDPOINT` is updated (e.g., when the Heroku app name changed).

### Deploy

```bash
git push heroku master
heroku open
```

### Debugging Heroku

```bash
heroku logs  # Show current logs
heroku logs --tail # Show current logs and keep updating with any new results
heroku ps   #Display dyno status
```

## Automatically Deploy to Heroku with Gitlab

This setup automatically deploys the latest version to Heroku after each successful pipeline of the master branch.

1. Open the GitLab settings `Settings > Environment Variables` (e.g., https://git.ita.chalmers.se/courses/dit341/group-00-web/settings/ci_cd)
2. Add the key `HEROKU_APP_NAME` with the value: `Name` of your app visible in the Heroku app settings https://dashboard.heroku.com/apps/your-app-name/settings
3. Add the key `HEROKU_API_KEY` with value: `API Key` of your Heroku account in the Heroku account settings: https://dashboard.heroku.com/account
4. Save variables

> Deployment will only be triggered for the master branch and when both HEROKU keys are configured.

A HelloWorld tutorial can be found here: [Deploy Node.js App with GitLab CI/CD](https://medium.com/@seulkiro/deploy-node-js-app-with-gitlab-ci-cd-214d12bfeeb5)

## Further Readings on Production Deployment

* [Express Tutorial Part 7: Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
* [Vue.js Production Deployment](https://vuejs.org/v2/guide/deployment.html)
