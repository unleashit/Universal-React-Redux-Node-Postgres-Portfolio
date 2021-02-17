const {
    SESSION_SECRET,
    SESSION_KEY,
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
    API_BASE,
    AUTO_LOGIN,
    AUTO_LOGIN_START,
    AUTO_LOGIN_END,
    AUTO_LOGIN_EXCLUDE,
} = process.env;

const isClient = typeof window !== 'undefined';

// select env variables (with double underscore) are added
// to the window object via script tag in root.js
const crossEnvVar = (envVar) =>
    typeof window !== 'undefined'
        ? window[`__${envVar}__`]
        : process.env[envVar];

module.exports = {
    __API_URL__: isClient ? `/api` : `${API_BASE}/api`,
    __SOCKET_IO_URL__: isClient ? `/live-chat` : `${API_BASE}/live-chat`,
    __SESSION_SECRET__: SESSION_SECRET,
    __SESSION_KEY__: SESSION_KEY,
    __GOOGLE_ANALYTICS__: crossEnvVar('GOOGLE_ANALYTICS'),

    liveChat: {
        adminName: crossEnvVar('LIVE_CHAT_ADMIN_NAME'),
        adminPerPage: 10, // how many archived chats to load per page in control panel
        saveInterval: 10 * 60 * 1000, // once per 15 mins
        purgeInterval: 20 * 60 * 1000, // min time to persist in ram (1 hr)
        sendSMS: SMS_ACTIVE || false, // send SMS on new user registrations
        autoLogin: AUTO_LOGIN,
        autoLoginStart: AUTO_LOGIN_START,
        autoLoginEnd: AUTO_LOGIN_END,
        autoLoginExclude: AUTO_LOGIN_EXCLUDE,
    },

    mailoptions: {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: EMAIL_SUBJECT,
    },

    smsMailOptions: {
        from: SMS_FROM,
        to: SMS_TO,
        subject: SMS_SUBJECT,
    },

    smtpConfig: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE, // use SSL
        auth: {
            user: SMTP_AUTH_USERNAME,
            pass: SMTP_AUTH_PASSWORD,
        },
    },
};
