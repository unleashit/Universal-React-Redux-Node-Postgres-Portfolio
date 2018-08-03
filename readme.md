# jasongallagher.org
Personal site and portfolio of Jason Gallagher. A nice mix of react, redux, node.js, websockets, postgreSql, docker and the color green.

`Important Note: this code is NOT an open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE.txt file for more details.`

### Prerequisites
Docker and docker-compose.

### App Secrets and Config
Copy `sample.env` to `.env` and make changes as desired.

The app will run with the defaults but certain features won't work. Email and SMTP info are required for the contact form to submit. When configured, it will both send an email and add a new record in the DB. SMS options if configured will send a text notification when a user initiates a new chat.

A few misc settings that aren't important for running the app can also be found in `/config/APPconfig.js`.

### Running

After you clone the project and configure the secrets, add a new docker network called jg: `docker network create jg`. Alternatively, you can modify docker-compose.yml to change it to a standard network which will get created automatically. It's external because of my particular needs.

Next run `npm run build:docker` to build the images and install dependencies. Once that's done, if you want to add sample content you can seed the database with `npm run seed`. Because user submitted content (images in this case) are gitignored, next copy or move the images from /app/images/sample_portfolio into /public/images/portfolio so they can display.

After building the images and seeding, run it with `npm run dev` or `npm run prod`.

### Npm commands

Note: if you don't have node installed, just copy and run the scripts from package.json.

`npm run dev` runs and streams the combined logs in dev mode with webpack and hot module replacement. To view in the browser, go to `http://localhost:3100`

`npm run prod` same as above but in production mode.

`npm run dev:detached` starts the app in detached mode (no logs)

`npm run logs` streams the log if the app is running in the background

`npm run test` runs tests (app must already be running in dev mode)

`npm run build` runs webpack and rebuilds static assets within the image

`npm run build:docker` runs `docker-compose build` to build/rebuild the docker images.

`npm run stop` and `npm run down` stops the app or stops plus deletes all containers respectively

`npm run attach` attaches terminal to the app container

`npm run attach:db` attaches and logs into the database

`npm run seed` runs `db:seed:all` via sequelize-cli to seed the database

`npm run stats` analyzes dependencies and runs webpack-bundle-analyzer

### Administration and Login
To access the admin to manage chats or the portfolio, you need to add a user and then elevate its access level. To create a user, just go to `/signup` and create it. To elevate the user, log into the DB with `npm run docker:attach:db` and change the `accesslevel` field of your new user to 3. Now you can login at `/login` with the user and have administrator access to the control panel.


`Reminder: this code/theme/site is NOT open source. You have DO NOT have permission to use it for any other purpose except for your own personal viewing. Please see LICENSE.txt file for further details.`

