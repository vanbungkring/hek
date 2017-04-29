module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            target: {
                files: {
                    'public/stylesheets/app.min.css': [
                        'public/stylesheets/app.css',
                        'public/stylesheets/font.css',
                        'public/stylesheets/animate.css/animate.css',
                        'public/stylesheets/font-awesome/css/font-awesome.css',
                        'public/stylesheets/custom/index.css',
                        'public/stylesheets/custom.css',
                    ]
                }
            },
            options: {
                livereload: true,
                keepSpecialComments: 0
            },
        },
        concat: {
            js: {
                src: [
                  'public/javascripts/common.function.js',
                  'public/javascripts/ui-load.js',
                    'public/javascripts/ui-jp.config.js',
                    'public/javascripts/ui-common.js',
                    'public/javascripts/ui-jp.js',
                    'public/javascripts/ui-nav.js',
                    'public/javascripts/ui-toggle.js',
                    'public/javascripts/ui-client.js',
                    'public/javascripts/ui-base.js',
                    'public/javascripts/ui-ajax.js',
                    'public/javascripts/dashboard.js',
                    'public/javascripts/custom/index.js',
                ],
                dest: 'public/javascripts/app.src.js'
            },
        },
        uglify: {
            bundle: {
                'public/js/app.src.min.js': ['public/js/app.src.js'],
            }
        },
        watch: {
            js: {
                files: [
                  'public/javascripts/**/*.js',
                  'public/javascripts/custom/**/*.js',
                ],
                tasks: ['concat:js'],
            },
            stylesheets: {
                files: ['public/stylesheets/**/*.css'],
                tasks: ['cssmin:target']
            }
        },
        imagemin:{
          dynamic: {
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'public',             // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'public'                  // Destination path prefix
            }]
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default',
    [
      'imagemin',
      'cssmin:target',
      'concat:js',
      'watch',
      'uglify',
    ]);
};
