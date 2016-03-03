gulp = require 'gulp'
bundler = require 'gulp-amd-bundler'

gulp.task 'bundle', ->
	gulp.src(['src/yom-form-util.js'])
		.pipe bundler
			beautifyTemplate: true
		.pipe gulp.dest('dist')
		#.pipe gulp.dest('../../ddicar/crm-ui/dist/browser/js/vendor/yom-data-grid')

gulp.task 'default', ['bundle']