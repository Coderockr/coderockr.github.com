
import { join } from 'path';
import babelify from 'babelify';

const sourceFolder = 'site';
const distFolder = '../dist';

module.exports = {
  // ----------------------------
  // LIBRARIES module
  // ----------------------------
  libraries: {
    js: [
      join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'),
      join(__dirname, 'node_modules', 'fotorama', '*.js'),
      join(__dirname, 'node_modules', 'jquery.maskedinput', 'src', '*.js'),
      join(__dirname, 'source', 'scripts', 'lib', '**', '*.js'),
    ],
    scss: [
      join(__dirname, 'node_modules', 'bootstrap', 'scss'),
      join(__dirname, 'node_modules', 'fotorama', '*.css'),
      join(__dirname, 'node_modules', 'nouislider', 'distribute', 'nouislider', '*.css')
    ],
  },

  // ----------------------------
  // RSYNC module
  // ----------------------------
  rsync: {
    src: `${distFolder}/`,
    dest: 'user@host:folder/to/script',
    ssh: true,
    recursive: true,
    deleteAll: true,
    exclude: ['.DS_Store'],
  },

  // ----------------------------
  // IMAGEMIN module
  // ----------------------------
  imagemin: {},

  // ----------------------------
  // WATCH module
  // ----------------------------
  watch: {
    images: join(sourceFolder, 'images', '**/*'),
    scss: join(sourceFolder, 'styles', '**/*.{scss,sass}'),
    js: undefined,
    html: join(sourceFolder, 'html', '**/*.ejs'),
    fonts: join(sourceFolder, 'fonts', '**/*'),
  },

  // ----------------------------
  // SERVER module
  // ----------------------------
  server: {
    src: `${sourceFolder}/`,
    dest: `${distFolder}/`,

    // ----------------------------
    // BROWSERSYNC module
    // ----------------------------
    browserSync: {
      port: 3000,
      notify: false,
      server: {
        baseDir: distFolder,
      },
    },
  },

  // ----------------------------
  // BROWSERSYNC module
  // ----------------------------
  browserify: {
    entries: join(sourceFolder, 'scripts', 'main.js'),
    extensions: ['.js'],
    debug: process.env.NODE_ENV === 'development',
    transform: [
      babelify,
    ],
    shim: {
      jQuery: {
        path: './node_modules/jquery/dist/jquery.js',
        exports: '$'
      }
    }
  },
}
