const path = require("path");
const paths = require("./paths");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + "/main.ts"],

  resolve: {
    extensions: [".js", ".vue", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      components: path.resolve(__dirname, "../src/components/"),
      images: path.resolve(__dirname, "../src/images/"),
      styles: path.resolve(__dirname, "../src/styles/"),
    },
  },

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  // Customize the webpack build process
  plugins: [
    // Vue plugin for the magic
    new VueLoaderPlugin(),

    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html", // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },

      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
};
