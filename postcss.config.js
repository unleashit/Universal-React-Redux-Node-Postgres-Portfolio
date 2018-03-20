module.exports = {
    plugins: {
        'postcss-import': {
            root: __dirname,
        },
        autoprefixer: {
            browsers: ['last 5 versions', 'ie >= 11']
        }
    },
};
