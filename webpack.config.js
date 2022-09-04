
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // Server bundle.
    entry: {
        index: './src/js/index.js',
        modal: './src/js/modal.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'FrontEnd Project',
            filename: 'index.html',
            template: './src/views/index.html'
        })
    ],
    //Server configuration
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3001,
        open: true,
        hot: true

    },
    module: {
        rules: [
            {
                //Style
                test: /\.scss$/,
                use: [{
                     // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                }, {
                     // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                }, {
                     // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        }
                    }
                },
                {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                }
                ],
            },
            {
                //Babel
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    performance: {
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        },
    }
}