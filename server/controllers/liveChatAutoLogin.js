const clientIo = require ('socket.io-client');
const crypto = require('crypto');
const config = require('../../config/APPconfig');

const { liveChat: {
    autoLogin = 'false', autoLoginStart, autoLoginEnd, autoLoginExclude
} } = config;

let socket;
let adminConnected = false;
let tries = 5;
const AUTOLOGIN_INTERVAL = 1000 * 60 * 4;
const LOGOUT_TIME = 1000 * 60 * 15;

// generate a basic random number to verify we're the admin
const token = crypto.randomBytes(24).toString('base64');

if (autoLogin.toLowerCase() === 'true') {
    socket = clientIo.connect(config.__SOCKET_IO_URL__);

    socket.on('connect', cronJob);
    socket.on('chatDisconnected', () => {
        adminConnected = false;
        tries = 0;

        // after admin manually logs out,
        // set period before autologin connects again
        setTimeout(() => {
            tries = 5;
        }, LOGOUT_TIME)
    });
}

function cronJob() {
    console.log('ADMIN AUTOLOGIN CRON');

    const open = isOpen(autoLoginStart, autoLoginEnd, autoLoginExclude);

    if (!adminConnected && open && tries > 0) {
        tryToConnect(() => {
            return new Promise((resolve) => {
                socket.emit('admin login', { token }, id => {
                    if (!id || id === 'unauthorized') {
                        adminConnected = false;
                        resolve(false);
                    } else {
                        console.log(`socket.io connected. Id: ${id}`);
                        adminConnected = true;
                        resolve(true);
                    }
                })
            });
        }, tries)
    }

    if (adminConnected && !open) {
        socket.disconnect();
    }
    setTimeout(cronJob, AUTOLOGIN_INTERVAL);
}

function tryToConnect(cb, tries = 5, waitFor = 3000) {
    let connected = false;
    let timer;
    const originalTries = tries;

    const connect =  async () => {
        clearTimeout(timer);

        if (connected === false && tries > 0) {
            const result = await cb();

            if (result) {
                connected = true;
                tries = originalTries;
            } else {
                tries--;
                console.log(`tryToConnect attempts left: ${tries}`);
                timer = setTimeout(connect, waitFor);
            }

        } else {
            console.log('tryToConnect could not connect.');
        }
    }

    connect();
}

function isOpen(
    startTime = '9:00:00',
    endTime = '17:00:00',
    exclude = [6, 7],
    timeZone = 'America/Los_Angeles',
) {
    if (typeof exclude === 'string') {
        exclude = exclude.trim().split(',');
    }

    const [startH, startM, startS] = startTime.split(':').map(Number);
    const [endH, endM, endS] = endTime.split(':').map(Number);

    const PST = new Date().toLocaleString("en-US", { timeZone });
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

