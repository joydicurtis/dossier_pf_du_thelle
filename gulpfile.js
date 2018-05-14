var gulp = require('gulp'),
	watch = require('gulp-watch'),
	preFixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	csso = require('gulp-csso'),
	connectPHP = require('gulp-connect-php'),
	browserSync = require('browser-sync').create(),
	rigger = require('gulp-rigger'),
	reload = browserSync.reload;

var path = {
		public:{
			fonts: '../lemonier/fonts',
			css: '../lemonier/css',
			js: '../lemonier/js',
			images: '../lemonier/images',
			html: '../lemonier',
			php: '../lemonier'
		},
		src:{
			fonts: 'build/fonts/**/*.*',
			css: 'build/css/**/*.css',
			js: 'build/js/**/*.js',
			images: ['build/images/**/*.jpg', 'build/images/**/*.jpeg', 'build/images/**/*.png', 'build/images/**/*.svg'],
			html: 'build/*.html',
			php: 'build/*.php'
		},
		watch:{
			fonts: 'build/fonts/**/*.*',
			css: 'build/css/**/*.css',
			js: 'build/js/**/*.js',
			images: ['build/images/**/*.jpg', 'build/images/**/*.jpeg', 'build/images/**/*.png', 'build/images/**/*.svg'],
			html: 'build/*.html',
			php: 'build/*.php'
		}
	};

gulp.task('phpServer', function(){
	connectPHP.server({
		base: '../lemonier/',
		keepalive: true,
		hostname: 'lemonier',
		port: 3000,
		open: false
	});
});
gulp.task('webserver', function(){
	browserSync.init({
		proxy: 'lemonier',
		port: 3000
	})
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.public.html))
		.pipe(reload({stream:true}));
});

gulp.task('php:build', function () {
	gulp.src(path.src.php)
		.pipe(gulp.dest(path.public.php))
		.pipe(reload({stream:true}));
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		//.pipe(uglify())
		.pipe(gulp.dest(path.public.js))
		.pipe(reload({stream:true}));
});

gulp.task('css:build', function () {
	gulp.src(path.src.css)
		.pipe(rigger())
		// .pipe(sourcemaps.init())
		.pipe(preFixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		//.pipe(csso())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.public.css))
		.pipe(reload({stream:true}));
});

gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.public.fonts))
		.pipe(reload({stream:true}));
});

gulp.task('img:build', function () {
	gulp.src(path.src.images)
		.pipe(gulp.dest(path.public.images))
		.pipe(reload({stream:true}));
});

gulp.task('watch', function () {
	watch([path.watch.html], function(){
		gulp.start('html:build');
	});
	watch([path.watch.php], function(){
		gulp.start('php:build')
	});
	watch([path.watch.js], function(){
		gulp.start('js:build')
	});
	watch([path.watch.css], function(){
		gulp.start('css:build')
	});
	watch([path.watch.fonts], function(){
		gulp.start('fonts:build')
	});
	watch(path.watch.images, function(){
		gulp.start('img:build')
	});
});

gulp.task('build', ['html:build', 'php:build', 'js:build', 'css:build', 'img:build', 'fonts:build']);

gulp.task('starting', ['phpServer', 'webserver', 'watch', 'build']);