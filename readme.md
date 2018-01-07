# jasongallagher.org
Personal site and portfolio of Jason Gallagher

`Important Note: this code is NOT an open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE.txt file for more details.`

Once you clone the project, you should first run `npm install` to download dependencies. Next run `npm run build` to run the build process and produce the public (dist) folder.

### Database
In order to actually run the project you need to create a database (see Sequelize docs for DB options) and edit two configuration files. For database credentials, rename `config/DBconfig.sample.json` to `config/DBconfig.json` and make your changes.

### App Config
A second config file exists in `config/APPconfig.sample.js`. Rename it to `config/APPconfig.js` and make changes as needed.

All keys should exist, but some are optional and can have any value. `mailoptions` and `smtpConfig` are for the contact form and are optional unless you want it to actually work...  The contact form will both send an email and add a new record in the DB. I didn't bother to make a GUI for contacts, but may at some point. `smsMailOptions` can send a text notification when a user start a new chat.

The first time you run the project via `npm start` or `npm run prod`, if all goes well it will add the database tables.

`npm start` runs the project in dev mode and webpack. Browser-sync will automatically launch a tab with webpack and hot reload.

`npm run prod` first compiles assets then runs the project from the dist folder in production mode. The URL for the production build is http://localhost:3100.

### Administration and Login

To access the admin to manage chats or the portfolio, you need to add a user and then elevate its access level. To create a user, just go to `/signup` and create it. To elevate the user, go into the DB and change the access level to 3. Now you can login at `/login` with your user and access the control panel.

One caveat with the portfolio that I plan on fixing on some rainy day: you must run `npm run build` or `npm run prod` in the terminal after you add projects before their images will display. Webpack is needed for now to optimize and copy the uploaded images to the public folder.


`Reminder: this code/theme/site is NOT open source. You have DO NOT have permission to use it for any other purpose except for your own personal viewing. Please see LICENSE.txt file for further details.`

