# jasongallagher.org
Personal site and portfolio of Jason Gallagher. A nice mix of react, redux, node.js, websockets, postgreSql, docker and the color green.

`Important Note: this code is NOT an open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE.txt file for more details.`

### Prerequisites
Docker and docker-compose.

### App Config
A sample config file exists in `config/APPconfig.sample.js`. Rename it to `config/APPconfig.js` and make changes if desired. 

`mailoptions` and `smtpConfig` are required for the contact form to submit. When configured, it will both send an email and add a new record in the DB. I didn't bother to make a GUI for contacts, but may at some point. `smsMailOptions` can send a text notification when a user starts a new chat.

### App Secrets
Rename `sample.secrets.sh` to `secrets.sh` and make changes as desired. Add to your environment with `source secrets.sh`. The app will run with the defaults but certain features won't work. 

### Npm Scripts
After you clone the project and add the config and secrets files, add a new docker network called jg: `docker network create jg`. Alternatively, you can modify docker-compose.yml to change it to a standard network which will get created automatically. It's external because of my particular needs.

Next run `npm run docker:build` to build the containers and install dependencies. Once that's done, you can either seed the database or just run it in dev or production mode. It won't have any portfolio items until you either seed or add manually. To seed with sample data, run `npm run seed` followed by `npm run build` to process the images with webpack (see below for explanation).

`npm run dev` runs the project in dev mode with webpack and hot module replacement. To view in the browser, go to `http://localhost:3100`

`npm run prod` same as above but in production mode.

`npm run dev:logs` starts the app in undetached mode (steams combined logs from all containers)

`npm run docker:logs` streams the log if the app is already running

`npm run build` rebuilds webpack static assets in production mode

`npm run docker:build` runs `docker-compose build` to build/rebuild the docker images. You need to first comment out the build step in docker-compose.yml.

`npm run stop` and `npm run down` stops the app or stops plus deletes all containers respectively

`npm run docker:attach` attaches terminal to the app container

`npm run docker:attach:db` attaches and logs into database

`npm run test` runs tests (app must already be running)

`npm run seed` runs `db:seed:all` via sequelize-cli to seed the database

`npm run stats` analyzes dependencies and runs webpack-bundle-analyzer

### Administration and Login
To access the admin to manage chats or the portfolio, you need to add a user and then elevate its access level. To create a user, just go to `/signup` and create it. To elevate the user, log into the DB with `npm run docker:attach:db` and change the access level of your new user to 3. Now you can login at `/login` with the user and have administrator access to the control panel.

One caveat with the portfolio that I plan on fixing on some rainy day: you must run `npm run build` in the terminal after you add projects before their images will display. Webpack is needed for now to optimize and copy the uploaded images to the dist folder.

### Notes
If you want to proxy the app and/or run it on standard ports (80 or 443) via nginx, you can uncomment the nginx service in docker-compose.yml. Everything should be good to go.


`Reminder: this code/theme/site is NOT open source. You have DO NOT have permission to use it for any other purpose except for your own personal viewing. Please see LICENSE.txt file for further details.`

