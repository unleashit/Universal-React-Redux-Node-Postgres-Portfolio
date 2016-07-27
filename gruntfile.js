var source = 'app/images/grunt/Source/',
    dest = 'app/images/grunt/Dest/';

module.exports = function(grunt) {
    //require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // copy: {
        //     main: {
        //         files: [
        //             // copy bootstrap sass
        //             {expand: true, cwd: bootstrap_csspath, src: ['**'], dest: dest_stylesheets + 'bootstrap/'}
        //         ]
        //     }
        // },

        // responsive_images: {
        //     myTask: {
        //         options: {
        //             engine: 'im',
        //             sizes: [{
        //                 name: 'small',
        //                 width: "25%",
        //                 quality: 80
        //             },{
        //                 name: "medium",
        //                 width: "65%",
        //                 quality: 65
        //             },{
        //                 name: "large",
        //                 width: "100%",
        //                 quality: 60
        //             }]
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'images/source',
        //             src: ['**/*.{png,jpg,gif}'],
        //             custom_dest: 'images/resized/{%= name %}/'
        //         }]
        //     }
        // },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: source,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: dest
                }]
            }
        },

        // imagemin: {                          // Task
        //     static: {                          // Target
        //         options: {                       // Target options
        //             optimizationLevel: 3,
        //             svgoPlugins: [{ removeViewBox: false }]
        //         }
        //     },
        //     dynamic: {                         // Another target
        //         files: [{
        //             expand: true,                  // Enable dynamic expansion
        //             cwd: source,                   // Src matches are relative to this path
        //             src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        //             dest: dest                  // Destination path prefix
        //         }]
        //     }
        // },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: source + 'svg',
                    src: ['**/*.svg'],
                    dest: dest + 'svg'
                }]
            }
        },
        sprite:{
            all: {
                src: source + 'logos/*.png',
                dest: dest + 'spritesheet.png',
                destCss: dest + '_sprites.scss',
                imgPath: 'spritesheet.png',
                cssVarMap: function (sprite) { sprite.name = 'icon-' + sprite.name;}
            }
        }
    });

    grunt.loadNpmTasks('grunt-spritesmith');

    // grunt.registerTask('firstrun', ['copy', 'sass', 'concat', 'uglify']);
    grunt.registerTask('images', ['imagemin', 'svgmin', 'sprite']);
};