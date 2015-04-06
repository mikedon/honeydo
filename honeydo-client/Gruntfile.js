module.exports = function ( grunt ) {
  
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks("grunt-protractor-runner");
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-constant');

    var userConfig = require( './build.config.js' );

    var taskConfig = {
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    keepalive: true
                }
            }
        },
        ngconstant: {
            options: {
                name: 'config',
                dest: 'config.js'
            },
            development: {
                options: {
                    dest: '<%= build_dir %>/src/app/config.js'
                },
                constants: {
                    apiUrl: 'http://localhost\\:8080/honeydo/', //escape colon for angular https://groups.google.com/forum/#!topic/angular/18aO0bIlEm0
                    authenticationUrl: 'http://localhost:8080/honeydo/' //for some reason injection into the UserService escapes the colon
                }
            }
            /*production: {
                options: {
                    dest: '<%= yeoman.dist %>/scripts/config.js',
                },
                constants: {
                    ENV: 'production'
                }
            }*/
        },
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: 
                '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },
        clean: [ '<%= build_dir %>', '<%= compile_dir %>'],
        copy: {
            build_app_assets: {
                files: [{ 
                    src: [ '**' ],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets',
                    expand: true
                }]   
            },
            build_vendor_assets: {
                files: [{ 
                    src: [ '<%= vendor_files.assets %>' ],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.',
                    expand: true,
                    flatten: true
                }]   
            },
            build_appjs: {
                files: [{
                    src: [ '<%= app_files.js %>' ],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorjs: {
                files: [{
                    src: [ '<%= vendor_files.js %>' ],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            compile_assets: {
                files: [{
                    src: [ '**' ],
                    dest: '<%= compile_dir %>/assets',
                    cwd: '<%= build_dir %>/assets',
                    expand: true
                }]
            }
        },
        concat: {
            build_css: {
                src: ['<%= vendor_files.css %>','<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            compile_js: {
                src: [ 
                    '<%= vendor_files.js %>', 
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>', 
                    '<%= html2js.common.dest %>'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        ngmin: {
            compile: {
                files: [{
                    src: [ '<%= app_files.js %>' ],
                    cwd: '<%= build_dir %>',
                    dest: '<%= build_dir %>',
                    expand: true
                }]
            }
        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'build/src/app/honeydo.js',
                options: {
                    target: 'es5'
                }  
            }
        },
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },
        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
                }
            },
            compile: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
                },
                options: {
                    cleancss: true,
                    compress: true
                }
            }
        },
        jshint: {
            src: [ '<%= app_files.js %>'],
            test: ['<%= app_files.jsunit %>'],
            gruntfile: ['Gruntfile.js'],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: [ '<%= app_files.atpl %>' ],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },
        karma: {
            options: {
                configFile: '<%= build_dir %>/karma-unit.js'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/app/honeydo.js',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            }
        },
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [ 
                    '<%= vendor_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= test_files.js %>'
                ]
            }
        },
        delta: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'jshint:gruntfile' ],
                options: {
                    livereload: false
                }
            },
            jssrc: {
                files: [ '<%= app_files.js %>'],
                tasks: [ 'jshint:src', 'karma:unit:run', 'copy:build_appjs' ]
            },
            assets: {
                files: [ 'src/assets/**/*'],
                tasks: [ 'copy:build_app_assets', 'copy:build_vendor_assets' ]
            },
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'index:build' ]
            },
            tpls: {
                files: [ '<%= app_files.atpl %>', '<%= app_files.ctpl %>'],
                tasks: [ 'html2js' ]
            },
            less: {
                files: [ 'src/**/*.less' ],
                tasks: [ 'less:build' ]
            },
            jsunit: {
                files: ['<%= app_files.jsunit %>'],
                tasks: [ 'jshint:test', 'karma:unit:run' ],
                options: {
                    livereload: false
                }
            }
        },
        protractor: {
            options: {
                keepAlive: true,
                configFile: "test/protractor.conf.js"
            },
            run: {}
        },
        protractor_webdriver: {
            start: {
                options: {
                    path: 'node_modules/protractor/bin/',
                    command: 'webdriver-manager start'
                }
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );
    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );
    grunt.registerTask( 'default', [ 'build', 'unit', 'e2e', 'compile' ] );  
    grunt.registerTask( 'build', [
        'clean', 'ngconstant:development', 'html2js', 'typescript', 'less:build',
        'concat:build_css', 'copy:build_app_assets', 'copy:build_vendor_assets',
        'copy:build_appjs', 'copy:build_vendorjs', 'index:build'
    ]);
    grunt.registerTask('unit', ['karmaconfig', 'karma:continuous']);
    grunt.registerTask('e2e', ['connect', 'protractor_webdriver', 'protractor:run']);
    grunt.registerTask( 'compile', [
        'clean', 'build', 'unit', 'e2e', 'less:compile', 'copy:compile_assets', 'ngmin', 'concat:compile_js', 'uglify', 'index:compile'
    ]);
    grunt.loadNpmTasks('grunt-contrib-connect');

    /**
    * A utility function to get all app JavaScript sources.
    */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
    * A utility function to get all app CSS sources.
    */
    function filterForCSS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.css$/ );
        });
    }

    /** 
    * The index.html template includes the stylesheet and javascript sources
    * based on dynamic names calculated in this Gruntfile. This task assembles
    * the list into variables for the template to use and then runs the
    * compilation.
    */
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
        var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
            return file.replace( dirRE, '' );
        });
        var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
            return file.replace( dirRE, '' );
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });

    /**
    * In order to avoid having to specify manually the files needed for karma to
    * run, we use grunt to manage the list for us. The `karma/*` files are
    * compiled as grunt templates for use by Karma. Yay!
    */
    grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
        var jsFiles = filterForJS( this.filesSrc );
    
        grunt.file.copy( 'test/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });
};
