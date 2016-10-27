function getElemScrollPos(elem) {
    return document.getElementById(elem).getBoundingClientRect().top;
}

export function getEnvironment(type) {
    if (type === 'client') return typeof window !== 'undefined';
    if (type === 'production') return process.env.NODE_ENV === 'production';

    return {
        env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
        loc: typeof window === 'undefined' ? 'server' : 'client'
    }
}

export function getFullWindowHeight() {
    if (getEnvironment().loc === 'server') return 0;

    var body = document.body,
        html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight ) || 0;
}

export function animation(animationArea, animateOff, animationType='zoomInUp') {
    return !animateOff ?
        (animationArea ? `animated ${animationType} ` : ` invisible `)
            : '';
}