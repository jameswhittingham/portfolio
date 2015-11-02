module.exports = function(grunt) {
  "use strict";

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    connect: {
      server: {
        options: {
          port: 9001,
          base: './app/',
          keepalive: true,
          hostname: 'localhost'
        }
      }
    },

    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: 'app/styles',
        specify: 'app/styles/*.scss'
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: "app/",
          src: ['scripts/**'],
          dest: 'build/'
        }, {
          expand: true,
          cwd: "app/styles/",
          src: ['main.css'],
          dest: 'build/styles'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: 'app/templates',
          src: ['*.html'],
          dest: 'build/templates'
        }, {
          expand: true,
          cwd: 'app/',
          src: ['*.html'],
          dest: 'build/'
        }]
      }
    },

    watch: {
      styles: {
        files: ['**/*.scss'],
        tasks: ['compass'],
        options: {
          nospawn: false,
          livereload: true
        }
      },
      js: {
        files: ['common/scripts/'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['**/*.html'],
        options: {
          livereload: true
        }
      },
      copy: {
        files: ['common/**/*.*'],
        tasks: ['copy']
      }
    },
    concurrent: {
      all: {
        tasks: ['connect:server', 'compass:server', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('default', ['concurrent:all']);
  grunt.registerTask('build', ['copy:main', 'htmlmin']);
};