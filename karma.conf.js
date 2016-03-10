module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine', 'es5-shim'],
        autoWatch: false,
        basePath: 'tests',
        files: ['bootstrap.js'],
        preprocessors: {
            'bootstrap.js': ['webpack', 'sourcemap']
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ]
            },
            watch: true
        },
        reporters: ['dots'],
        singleRun: true,
        webpackServer: {
            noInfo: true
        },
        browserNoActivityTimeout: 60000
    });
};