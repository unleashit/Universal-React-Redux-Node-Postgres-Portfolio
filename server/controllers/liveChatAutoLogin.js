const clientIo = require ('socket.io-client');
const crypto = require('crypto');
const config = require('../../config/APPconfig');

const { liveChat: {
    autoLogin = 'false', autoLoginStart, autoLoginEnd, autoLoginExclude
} } = config;

let socket;
let adminConnected = false;
const token = crypto.randomBytes(24).toString('base64');

if (autoLogin.toLowerCase() === 'true') {
    socket = clientIo.connect(config.__SOCKET_IO_URL__);

    socket.on('connect', cronJob);
    socket.on('disconnect', () => {
        adminConnected = false;
    });
}

function cronJob() {
    console.log('ADMIN AUTOLOGIN CRON');
    const open = isOpen(autoLoginStart, autoLoginEnd, autoLoginExclude);

    if (!adminConnected && open) {
        adminLogin();
    }

    if (adminConnected && !open) {
        socket.disconnect();
    }
    setTimeout(cronJob, 1000 * 60 * 4);
};


function adminLogin() {
    let tries = 10;

    const conn = () => {
        if (adminConnected === false && tries > 0) {
            setTimeout(() => {
                socket.emit('admin login', { token }, id => {
                    if (!id || id === 'unauthorized') {
                        tries--;
                        console.log(`ADMIN AUTO LOGIN attempts left: ${tries}`);
                        conn();
                    } else {
                        adminConnected = true;
                        console.log(`socket.io connected. Id: ${id}`);
                    }
                })
            }, 3000);
        } else {
            console.log('auto admin login could not connect.');
        }
    }

    conn();
}

function isOpen(startTime = '9:00:00', endTime = '17:00:00', exclude = [6, 7]) {
    if (typeof exclude === 'string') {
        exclude = exclude.trim().split(',');
    }
    const [startH, startM, startS] = startTime.split(':');
    const [endH, endM, endS] = endTime.split(':');

    const PST = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    const currentDate = new Date(PST);

    if (exclude.includes(currentDate.getDay())) {
        return false;
    }

    const startDate = new Date(currentDate.getTime());
    startDate.setHours(startH);
    startDate.setMinutes(startM);
    startDate.setSeconds(startS);

    const endDate = new Date(currentDate.getTime());
    endDate.setHours(endH);
    endDate.setMinutes(endM);
    endDate.setSeconds(endS);

    return startDate <= currentDate && endDate > currentDate
}

exports.getAutoLoginToken = function() {
    return token;
};

