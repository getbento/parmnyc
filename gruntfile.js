module.exports = function (grunt) {

    var path = require('path');
    var currentPath = path.resolve();
    var siteName = path.basename(currentPath);

    console.log('Running grunt for ' + siteName);

    grunt.initConfig({
        root: '.',
        siteName: siteName,
        currentPath: currentPath,

        watch: {
            templates: {
                files: '<%= root %>/templates/**/*',
                tasks: [ 'sftp-deploy']
            }
        },

        "sftp-deploy": {
              build: {
                auth: {
                  host: '104.236.34.179',
                  port: 22,
                  authKey: 'bento-preview'
                },
                cache: 'sftpCache.json',
                src: '<%= currentPath %>',
                dest: '/sites/<%= siteName %>',
                exclusions: [
                    '.git',
                    '*.scss',
                    'scss',
                    'js/src',
                    '.sass-cache',
                    'config',
                    'assets/files',
                    'assets/*.map',
                    'assets/js/src',
                    'node_modules'
                ],
                serverSep: '/',
                concurrency: 4,
                progress: true
              }
        }

    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    // register at least this one task
    grunt.registerTask('default', [
        'sftp-deploy',
    ]);
};
