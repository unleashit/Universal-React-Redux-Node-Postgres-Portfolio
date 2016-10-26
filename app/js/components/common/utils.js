export function animation(animationArea, animationType="fadeInUp") {

    if (typeof window === 'undefined') return;

    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;

    return !window.location.hash && window.pageYOffset < viewportHeight * 0.8 ?
        (animationArea ? `animated ${animationType} ` : ` invisible `)
            : '';
}