const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin  } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const common = require('./webpack.config.js')();

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            warnings: false,
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: {
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
});
