module.exports = {

    __API_URL__: '/api',
    __SOCKET_IO_URL__: '/live-chat', // using a socket.io namespace
    __SESSION_SECRET__: '[anything_you_like]',
    __SESSION_KEY__: 'helpdesk_session',
    __GOOGLE_ANALYTICS__: '',

    liveChat: {
        adminName: '[your name]',
        adminPerPage: 10, // how many archived chats to load per page in control panel
        saveInterval: 10*60*1000, // how often to save to DB (ex: every 10 mins)
        purgeInterval: 20*60*1000, // min time to persist in ram (ex: every 20 mins)
        sendSMS: false // send SMS on new user registrations
    },

    smtpConfig: {
        host: '',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '',
            pass: ''
        }
    },

    mailoptions: {
        from: '[from_email]',
        to: '[to_email]',
        subject: 'New contact'
    },

    smsMailOptions: {
        from: '[from_email]',
        to: '[to_email]',
        subject: 'New helpdesk registration'
    }
};