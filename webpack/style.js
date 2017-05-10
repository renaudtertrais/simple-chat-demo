import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const style = bundleName => {
  const test = /\.s?css$/;
  const loader = ['css-loader', 'postcss-loader', 'sass-loader'];

  if (bundleName && isProduction) {
    return {
      module: {
        rules: [{
          test,
          loader: ExtractTextPlugin.extract({ loader, fallbackLoader: 'style-loader' }),
        }],
      },
      plugins: [new ExtractTextPlugin(bundleName)],
    };
  }

  return {
    module: {
      rules: [{ test, use: ['style-loader', ...loader] }],
    },
  };
};

export default style;
