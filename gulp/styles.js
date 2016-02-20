import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import rupture from 'rupture';
import stylint from 'gulp-stylint';
import stylus from 'gulp-stylus';
// import autoprefixer from 'autoprefixer-stylus';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import cssgrace from 'cssgrace';
import rgbaFallback from 'postcss-color-rgba-fallback';
import fontWeight from 'postcss-font-weights';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
import { browsers } from '../package.json';

gulp.task('styles', () => (
	gulp.src('app/styles/*.styl')
		.pipe(plumber({errorHandler: errorHandler('Error in \'styles\' task')}))
		.pipe(gulpif(gutil.env.debug, sourcemaps.init()))
		// .pipe(stylus({
		// 	use: [
		// 		rupture(),
		// 		autoprefixer()
		// 	],
		// 	'include css': true
		// }))
		.pipe(stylus({
			use: [
				rupture()
			],
			'include css': true
		}))
		.pipe(postcss([
			rgbaFallback(),
			autoprefixer(
					'Android >= ' + browsers.android,
					'Chrome >= ' + browsers.chrome,
					'Firefox >= ' + browsers.firefox,
					'Explorer >= ' + browsers.ie,
					'iOS >= ' + browsers.ios,
					'Opera >= ' + browsers.opera,
					'Safari >= ' + browsers.safari
				),
			fontWeight()
			]
		))
		.pipe(gulpif(!gutil.env.debug, gcmq()))
		// .pipe(gulpif(!gutil.env.debug, nano()))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpif(gutil.env.debug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
));

gulp.task('styles:lint', () => (
	gulp.src(['app/**/*.styl', '!app/styles/**'])
		.pipe(stylint({
			reporter: {
				reporter: 'stylint-stylish',
				reporterOptions: {verbose: true}
			}
		}))
		.pipe(stylint.reporter())
));
