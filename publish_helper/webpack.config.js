module.exports = {
    entry: {
        'bundle': ['./modules/cap-app.js'],
    },
    output: {
        path: './static/js',
        filename: '[name].js'
    }
}
