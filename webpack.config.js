var path = require('path'),
    ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: path.resolve(ROOT_PATH,'app/main'),
    output: {
        path: path.resolve(ROOT_PATH,'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ['style','css']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};