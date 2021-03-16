//----------------------------------------------------------------------
//  mode
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  変数宣言
//----------------------------------------------------------------------
const gulp = require("gulp");
const { series, parallel } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const autoprefixer = require("autoprefixer");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins(); //  postcss,purgecss,imagemin,plumber,sass,sass-glob,connect-php,notify,rename,clean-css,uglify,changed,diff-build

const paths = {
	src: "./src",
	dist: "./dist",
};

//  clean
const clean = {
	src: [paths.dist + "/**", "!" + paths.dist],
};

//  copy
const copy = {
	src: paths.src + "/**",
	dest: paths.dist,
};

//  minify
const minify = {
	content: [paths.src + "/*.html", paths.src + "/js/**/*.js"],

	css: {
		src: paths.src + "/css/styles.css",
		dest: paths.dist + "/css",
	},

	fontawesome: {
		src: paths.src + "/vender/fontawesome/css/*.css",
		dest: paths.dist + "/vender/fontawesome/css",
	},

	swiper: {
		src: paths.src + "/vender/swiper/css/*.css",
		dest: paths.dist + "/vender/swiper/css",
	},

	tailwind: {
		src: paths.src + "/vender/tailwind/css/*.css",
		dest: paths.dist + "/vender/tailwind/css",
	},

	js: {
		src: paths.src + "/js/**",
		dest: paths.dist + "/js",
	},

	image: {
		src: paths.src + "/image/**/*.{png,jpg,JPG,gif,svg,ico}",
		dest: paths.dist + "/image",
	},
};

//  watch
const watchSrc = [paths.src + "/**", "!" + paths.src + "/css/**"];

//  build
const build = {
	sass: {
		src: paths.src + "/scss/**/*.scss",
		dest: paths.src + "/css",
	},
};

//  browser-sync
const bs = {
	port: 5500,
	base: paths.src,
	html: "index.html",
};

//----------------------------------------------------------------------
//  task処理
//----------------------------------------------------------------------
//  clean
gulp.task("clean", function (done) {
	del(clean.src);
	done();
});

//  copy
gulp.task("copy", function (done) {
	gulp.src(copy.src).pipe(gulp.dest(copy.dest));
	done();
});

//  minify
gulp.task("minify", function (done) {
	gulp
		.src(minify.css.src)
		.pipe($.plumber())
		.pipe($.purgecss({ content: minify.content }))
		.pipe($.cleanCss())
		.pipe(gulp.dest(minify.css.dest));

	gulp
		.src(minify.fontawesome.src)
		.pipe($.plumber())
		.pipe($.purgecss({ content: minify.content }))
		.pipe($.cleanCss())
		.pipe(gulp.dest(minify.fontawesome.dest));

	gulp
		.src(minify.swiper.src)
		.pipe($.plumber())
		.pipe($.purgecss({ content: minify.content }))
		.pipe($.cleanCss())
		.pipe(gulp.dest(minify.swiper.dest));

	gulp
		.src(minify.tailwind.src)
		.pipe($.plumber())
		.pipe(
			$.purgecss({
				content: minify.content,
				defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
			})
		)
		.pipe($.cleanCss())
		.pipe(gulp.dest(minify.tailwind.dest));

	gulp
		.src(minify.js.src)
		.pipe($.plumber())
		.pipe($.uglify())
		.pipe(gulp.dest(minify.js.dest));

	gulp
		.src(minify.image.src)
		.pipe($.changed(minify.image.dest))
		.pipe($.imagemin())
		.pipe(gulp.dest(minify.image.dest));
	done();
});

//  build
gulp.task("build", function (done) {
	gulp
		.src(build.sass.src)
		.pipe($.diffBuild())
		.pipe($.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>") }))
		.pipe($.sassGlob())
		.pipe($.sass())
		.pipe(
			$.postcss([
				autoprefixer({
					cascade: false,
				}),
			])
		)
		.pipe(gulp.dest(build.sass.dest));
	done();
});

//  browser-sync
gulp.task("bs", function (done) {
	$.connectPhp.server(
		{
			port: bs.port,
			base: bs.base,
		},
		function (done) {
			browserSync({
				notify: false,
				proxy: `localhost:${bs.port}/${bs.html}`,
				open: "external",
			});
		}
	);
	done();
});

gulp.task("bs-reload", function (done) {
	browserSync.reload();
	done();
});

//----------------------------------------------------------------------
//  watch task
//----------------------------------------------------------------------
//  watch
gulp.task("dev:watch", function (done) {
	gulp.watch(watchSrc, gulp.series(parallel("build"), "bs-reload"));
});

//----------------------------------------------------------------------
//  multi task
//----------------------------------------------------------------------
gulp.task("start", gulp.series("clean", "copy"));

gulp.task("dev:default", gulp.series(parallel("bs", "build"), "bs-reload", "dev:watch"));

gulp.task("pro:default", gulp.series(parallel("build"), "minify"));

/************************************************************************/
/*  END OF FILE                                       									*/
/************************************************************************/
