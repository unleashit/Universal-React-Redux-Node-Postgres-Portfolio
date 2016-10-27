# jasongallagher.org
Personal site and portfolio of Jason Gallagher

`Important Note: this code is NOT an open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE file for more details.`

Once you clone the project, you should first run `npm install` to download dependencies. Next run `npm run build` to run the build process and produce the public (dist) folder.

### Database
In order to actually run the project you need to create a database (see Sequelize docs for DB options) and a configuration file. For the config file, make a new directory called "config" under "server" and add a file called config.json. Here's the boiler plate which you can fill in with your credentials:

```
{
  "development": {
    "username": "{db_username}",
    "password": "{db_password}",
    "database": "{db_name}",
    "host": "{host}",
    "dialect": "{mysql|postgres|etc}",
    "charset": "utf8",
    "collate": "utf8_unicode_ci"
  },
  "test": {
    "username": "{db_username}",
    "password": "{db_password}",
    "database": "{db_name}",
    "host": "{host}",
    "dialect": "mysql|postgres|etc",
    "charset": "utf8",
    "collate": "utf8_unicode_ci"
  },
    "username": "{db_username}",
    "password": "{db_password}",
    "database": "{db_name}",
    "host": "{host}",
    "dialect": "mysql|postgres|etc",
    "charset": "utf8",
    "collate": "utf8_unicode_ci"
  }
}
```
To automatically add the database schema to your empty DB, open up /server/app.js. In the bottom of the file, under the models.sequelize.sync call, TEMPORARILY change "force" to "true". The first time you run the project via `npm start` or `npm run prod`, if all goes well, it will add the tables. IMPORTANT: don't forget to change "force" back to "false" after you successfully add the schema or else next time your run it will wipe your DB clean!

After this, you can now run the project in dev mode via `npm start` (a browser-sync will automatically launch a browser with webpack hot reload) or in production via `npm run prod`. The URL for the production build is http://localhost:3100 (instead of port 3000 for browser-sync).

### Administration and Login

To acess the admin and add portfolio projects, you need to add a user and then elevate its access level. To create a user, just go to /signup and create it. To elevate the user, go into the DB and change the access level to 3. Now you can login at /login with your user and manage the portfolio. One caveat that I plan on fixing on some rainy day: you must run `npm run build` or `npm run prod` in the terminal after you add projects to view the images. Webpack is needed for now to optimize and copy the uploaded images to the public (dist) folder.

### Other Config

For the site to function, you'll also need to make a second config file inside the server/config folder called appConfig.js. The contents of it should be (with your SMTP credentials):

```
module.exports = {

    sessionSecret: 'Not Keyboard Cat!',

    mailoptions: {
        from: '{from_email}',
        to: '{to_email}',
        subject: '{subject}'
    },
    
    smtpConfig: {
        host: '{host}',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '{auth_email}',
            pass: '{auth_password}'
        }
    },
};
```
`sessionSecret` can be any string, but it must exist. `mailoptions` and `smtpConfig` are for the contact form and are optional. The contact form will both send an email to the creditials provided and add a new record in the DB. I didn't bother to make a GUI for contacts, but may at some point.

`Reminder: this code/theme/site is NOT open source. You have DO NOT have permission to use it for any other purpose except for your own personal viewing. Please see license file for further details.`

