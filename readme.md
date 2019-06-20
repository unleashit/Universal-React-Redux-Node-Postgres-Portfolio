# jasongallagher.org
My personal site and portfolio. A nice mix of react, redux, node.js, websockets, postgreSql, docker and the color green.

Features a custom control panel for managing the portfolio and help desk.

`Important Note: this code is NOT an open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE.txt file for more details.`

### Prerequisites
Docker and docker-compose.

### Secrets and Config
Inside the config directory, copy `sample.env.staging` to `.env.staging` and `sample.env.database-init.staging` to `.env.database-init.staging` and make changes as desired. The former contains the app secrets and the latter is for the database container. 

The app will run with the defaults but certain features won't work. Email and SMTP info are required for the contact form to submit. When configured, it will both send an email and add a new record in the DB. SMS options if configured will send a text notification when a user initiates a new chat.

A few misc settings that aren't important for running the app can also be found in `/config/APPconfig.js`.

### Building and Running

After you clone the project and configure the secrets, add a new docker network called jg: `docker network create jg`. Alternatively, you can modify docker-compose.yml to change it to a standard network which will get created automatically. It's external because of my particular needs.

Next run `npm run build:docker` to build the images and install dependencies. Finally, run it with `npm run dev` to run in dev mode.

If you want to add sample content, while the containers are runnning you can seed the database with `npm run seed`. Because user submitted content (images in this case) are gitignored, you must manually copy the images from /app/images/sample_portfolio into /public/images/portfolio so they can display.

### Production mode and environments

You get both production and staging environments at the same time (two dbs and apps) by running `npm run prod`. To make it work you'll need to first add a production config and build the staging image or you'll get errors. To do this, create `config/.env.database-init.prod` and `config/.env.prod` (copy/change values from staging) and run `npm run build:docker:staging`.  

Note: for simplicity, dev mode shares the staging database.

### Npm commands (partial)

Note: node/npm not required. If you don't have them installed, just copy and run the scripts from package.json.

`npm run dev` runs and streams the combined logs in dev mode with webpack and hot module replacement. To view in the browser, go to `http://localhost:3200`

`npm run dev:detached` starts the app in detached mode (no logs)

`npm run prod` Launches both staging and prod environments at `http://localhost:3200` and `http://localhost:3100`

`npm run logs` streams the app logs if it's running in the background

`npm run logs:prod` streams the combined logs in prod mode

`npm run test` runs tests. App must already be running in dev mode

`npm run build` runs webpack and rebuilds static assets within the app container (dev mode)

`npm run build:docker` runs `docker-compose build` to build/rebuild the docker images for dev and prod environments.

`npm run build:docker:staging` build/rebuild the staging environment.

`npm run stop` and `npm run down` stops the app or stops plus deletes all containers respectively when in dev mode

`npm run attach` attaches terminal to the app container when in dev mode

`npm run attach:db` attaches and logs into the dev(staging) database

`npm run seed` runs `db:seed:all` via sequelize-cli to seed the dev(staging) database

`npm run stats` analyzes dependencies and runs webpack-bundle-analyzer in dev mode

### Administration and Login
To access the admin to manage chats or the portfolio, you need to add a user and then elevate its access level. To create a user, just go to `/signup` and create it. To elevate the user, log into the DB with `npm run attach:db` and change the `accesslevel` field of your new user to 3. Now you can login at `/login` with the user and have administrator access to the control panel.


`Reminder: this code/theme/site is NOT open source. You have DO NOT have permission to use it for any other purpose except for your own personal viewing. Please see LICENSE.txt file for further details.`

