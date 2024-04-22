const path = require('path');

module.exports = {
  entry: './app.js', // Specify the entry point of your JavaScript code
  output: {
    path: path.resolve(__dirname, 'dist'), // Specify the output directory
    filename: 'bundle.js' // Specify the name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the babel-loader only to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JavaScript files
          options: {
            presets: ['@babel/preset-env'], // Use the @babel/preset-env preset
            plugins: [
              ['@babel/plugin-proposal-decorators', { 'legacy': true }],
              ['@babel/plugin-proposal-class-properties', { 'loose': true }]
            ]
          }
        }
      }
    ]
  }
};
