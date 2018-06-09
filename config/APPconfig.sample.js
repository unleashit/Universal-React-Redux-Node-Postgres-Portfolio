const {
  SESSION_SECRET,
  SESSION_KEY,
  GOOGLE_ANALYTICS,
  EMAIL_FROM,
  EMAIL_TO,
  EMAIL_SUBJECT,
  SMS_ACTIVE,
  SMS_FROM,
  SMS_TO,
  SMS_SUBJECT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_AUTH_USERNAME,
  SMTP_AUTH_PASSWORD,
  API_BASE
} = process.env;

const isClient = typeof window !== 'undefined';

module.exports = {

    __API_URL__: isClient ? `/api` : `${API_BASE}/api`,
    __SOCKET_IO_URL__: isClient ? `/live-chat` : `${API_BASE}/live-chat`,
    __SESSION_SECRET__: SESSION_SECRET,
    __SESSION_KEY__: SESSION_KEY,
    __GOOGLE_ANALYTICS__: isClient ? window.__GOOGLE_ANALYTICS__ : (GOOGLE_ANALYTICS || ''),

    liveChat: {
        adminName: '[your name]',
        adminPerPage: 10, // how many archived chats to load per page in control panel
        saveInterval: 10*60*1000, // how often to save to DB (ex: every 10 mins)
        purgeInterval: 20*60*1000, // min time to persist in ram (ex: every 20 mins)
        sendSMS: SMS_ACTIVE || false // send SMS on new user registrations
    },

    mailoptions: {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: EMAIL_SUBJECT
    },

    smsMailOptions: {
        from: SMS_FROM,
        to: SMS_TO,
        subject: SMS_SUBJECT
    },

    smtpConfig: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE, // use SSL
        auth: {
          user: SMTP_AUTH_USERNAME,
          pass: SMTP_AUTH_PASSWORD
        }
    },

};