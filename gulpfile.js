// ==========
// Используемые npm-пакеты
// Общие
const gulp = require('gulp');
const del = require('del');
const gulpIf = require('gulp-if');
// Статика
const stylus = require('gulp-stylus');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');


const mode = process.env.NODE_ENV;
const isDevelopment = (mode === 'development');

// ==========
// Base tasks
// ==========

// Clean Build-directory
gulp.task('clean', () => {
  return del('./build/');
});


// Build css styles
gulp.task('css', () => {
  return gulp.src('./src/css/style.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(autoprefixer('>1% and last 2 versions and not IE 11'))
    .pipe(gulpIf(!isDevelopment, cssnano()))
    .pipe(gulp.dest('./build'));
});


// Copy html
gulp.task('html', () => {
  return gulp.src('./src/pages/*.html')
    .pipe(gulp.dest('./build'));
});

// Copy fonts
gulp.task('font', () => {
  return gulp.src('./src/font/**/*')
    .pipe(gulp.dest('./build/font'));
});


// ==========
// Composed tasks
// ==========
gulp.task('build', gulp.series('clean', 'css', 'html', 'font'));

gulp.task('watch', () => {
  gulp.watch('./src/css/**/*.styl', gulp.series('css'));
});



// ==========
// Пример конфига для создания спрайта
//==========
// Дополнительно требуется установить пакет gulp-svg-sprite
// const svgSprite = require('gulp-svg-sprite');
//
// const configSprite = {
//   shape: {
//     spacing: { // Add padding
//       padding: 2
//     }
//   },
//   mode: {
//     css: {
//       dest: 'src',
//       render: {
//         styl: {
//           dest: 'css/icons.styl'
//         }
//       },
//       sprite: 'img/icons.svg',
//       prefix: '.',
//       dimensions: true
//     }
//   }
// };
//
// gulp.task('sprite', () => {
//   return gulp.src('./src/assets/*.svg')
//     .pipe(svgSprite(configSprite))
//     .pipe(gulp.dest('.'));
// });


// ==========
// Пример сборки js с использованием webpack
//==========
// Дополнительно требуется установить пакеты babel-loader и webpack-stream
// const webpackStream = require('webpack-stream');
//
// Webpack config
// const configWebpack = {
//   mode: mode,
//   output: {
//     filename: './script.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       },
//     ],
//   },
// };
//
// // Build scripts
// gulp.task('js', () => {
//   return gulp.src('./src/js/script.js')
//     .pipe(webpackStream(configWebpack))
//     .pipe(gulp.dest('./build'));
// });
