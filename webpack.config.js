const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopywebpackPlugin = require('copy-webpack-plugin');
// Cesium源码所在目录
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';


module.exports = {
    stats: { children: false },//解决html-webpack-plugin Entrypoint undefined = index.html
	devtool: 'eval',//不推荐在最终产品代码里添加Source maps（容易被破解呗）
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        //需要编译Cesium中的多行字符串 
        sourcePrefix: ''
    },
    amd: {
        //允许Cesium兼容 webpack的require方式 
        toUrlUndefined: true
    },
    node: {
        // 解决fs模块的问题（Resolve node module use of fs）
        fs: 'empty'
    },
    module: {
        
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                    },
            
        {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        },      {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
    ],
            // 解决：Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
    unknownContextCritical: false,
    },
    plugins: [
        new VueLoaderPlugin(),
            // 解决：Unable to determine Cesium base URL automatically,…efining a global variable called CESIUM_BASE_URL.
    new webpack.DefinePlugin(
        new HtmlWebpackPlugin({
            template: 'index.html'
        })),
        //解决CESIUM_BASE_URL.错误
      new webpack.DefinePlugin(
      {
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify(''),
      }),

        // 拷贝Cesium 资源、控价、web worker到静态目录 
        new CopywebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
        new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
        new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ])
    ],
	    // 开发服务器配置
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    
	resolve: {
        alias: {
            // Cesium模块名称
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
	
};