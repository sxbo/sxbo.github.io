var webpack = require('webpack');//引入刚刚安装好的模块webpack
var path = require ('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    //入口文件定义
    entry:['./client/index.js'],
    //项目构建后文件的输出目录
    output:{
        path:path.resolve(__dirname,'app'),
        filename:'[name].js'
    },
    //关于模块加载的规则的配置anything to js
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node-modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','stage-0','react'],
                    plugins:[['import',[{libraryName:"antd",style:'css'}]]]
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(jpg|png|gif|svg)$/,
			    loader:'url-loader',
				query:{
					limit:8192,
					name:'res/img/[name].[ext]'
				} 
            },
            {
                test:/\.(ttf|woff|eot)$/,
				loader:'url-loader',
				query:{
					limit:8192,
					name:'res/font/[name].[ext]'
				}
            }
        ]
    },
    
    plugins:[
        //告诉webpack在输出目录自动生成该文件index.html
        //前提是在client下边要先手动新建一个index.html
        new HtmlWebpackPlugin({
			template:__dirname+"/client/index.html",
            filename:'index.html'
		}),
    ]
}