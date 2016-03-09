module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'tictactoe.js'
    },
    eslint: {
        configFile: './.eslintrc'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
