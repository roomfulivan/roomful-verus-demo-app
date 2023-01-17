const webpack = require('webpack');

module.exports = {
 {...}
    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: {
            process: 'process/browser',
            stream: "stream-browserify",
            zlib: "browserify-zlib",
            buffer: require.resolve("buffer/")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]
}