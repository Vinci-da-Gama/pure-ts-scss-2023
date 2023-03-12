// import type { PostcssPlugin } from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

const plugins = [
  postcssPresetEnv({
    browsers: 'last 2 versions',
  }),
  autoprefixer({}),
];

export default {
  plugins,
};
