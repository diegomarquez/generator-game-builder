'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var art = require('ascii-art');
var color = require('colors');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

art.Figlet.fontPath = __dirname + '/../fonts/';

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  initializing: function() {
  	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  	this.frameworkTag         = 'latest';
	  this.frameworkLocation    = './game-builder';
	  this.libLocation          = './lib';
	  this.additionalSrcPaths   = '';
	  this.additionalAssetPaths = '';

  	if (this.options['skip-welcome']) return;

		var cb = this.async();

		this.log('Hello, welcome too...');

	  art.font('GAME', 'smslant', 'red')
	     .font('-', 'smslant', 'yellow')
	     .font('BUILDER', 'smslant', 'red')
	     .font( ' .v1', 'smslant', 'yellow', 

	    function(rendered){
			  this.log(rendered);
			  this.log('A generator by ' + 'Diego Enrique Marquez'.red.bold + ' (https://github.com/diegomarquez)');
			  this.log('Powered by ' + 'Yeoman'.yellow.bold + ' (http://yeoman.io/)');
			  this.log(); 

			  cb();
		}.bind(this));
  },

  configuring: function() {

  },

  default: function() {

  },

  conflicts: function() {

  },

  install: function() {
  	if (this.options['skip-install']) return; 
    	
		this.npmInstall();
  }, 

  end: function() {
  	if (this.options['skip-install']) return;

  	this.spawnCommand('grunt');
  },

  prompting: function () {
  	var cb = this.async();

  	var isNotDefaultGeneration = function(answers) { 
  		return !answers.defaultGeneration; 
  	}

		var addAdditionalPaths = function(answers) { 
			return isNotDefaultGeneration(answers) && answers.additionalPaths; 
		}

		var prompts = [
	    {
	      name: "name",
	      message: "What will the name of your project be?",
	      filter: function(name) { 
	        return _(name).trim().slugify(); 
	      }
	    },

	    {
	      name: "width",
	      message: "What will the width of the canvas be?",
	      default: 400
	    },

	    {
	      name: "height",
	      message: "What will the height of the canvas be?",
	      default: 300
	    },

	    {
	      type: 'confirm',
	      name: 'defaultGeneration',
	      message: "Generate with default arguments?",
	      default: true
	    },

	    {
	      type: 'list',
	      name: "frameworkTag",
	      message: "Which branch of game-builder would you like to use?",
	      choices: ['latest', 'master'],
	      default: 'latest',
	      when: isNotDefaultGeneration
	    },  

	    {
	      name: "frameworkLocation",
	      message: "What will be the root of game-builder?",
	      default: this.frameworkLocation,
	      when: isNotDefaultGeneration
	    },

	    {
	      name: "libLocation",
	      message: "Where should bower dependencies be downloaded?",
	      default: this.libLocation,
	      when: isNotDefaultGeneration
	    },

	    {
	      type: 'confirm',
	      name: "additionalPaths",
	      message: "Would you like to add additional paths for reasources?",
	      default: false,
	      when: isNotDefaultGeneration
	    },

	    {
	      name: "additionalSrcPaths",
	      message: "What are the additional src paths? (Add more paths as a comma separate list)",
	      default: this.additionalSrcPaths,
	      when: addAdditionalPaths
	    },

	    {
	      name: "additionalAssetPaths",
	      message: "What are the additional asset paths? (Add more paths as a comma separate list)",
	      default: this.additionalAssetPaths,
	      when: addAdditionalPaths
	    }
	  ];

	  this._processPrompt(prompts, cb);
  },

  writing: function() {
  	this.mkdir('assets');
  	this.mkdir('config');
  	this.mkdir('src');
  	this.mkdir('styles');
  	this.mkdir('styles/css');
  	this.mkdir('styles/less');
  	this.mkdir('styles/less/main');
  	this.mkdir('tasks');

  	_.forEach(this.additionalSrcPaths.split(','), function(path){
	    this.mkdir(path);
	  }.bind(this));

	  _.forEach(this.additionalAssetPaths.split(','), function(path){
	    this.mkdir(path);
	  }.bind(this));

	  // ROOT
	  this.template('_.bowerrc', '.bowerrc');
	  this.template('_.gitignore', '.gitignore');
	  this.template('_bower.json', 'bower.json');
	  this.template('_index.html', 'index.html');
	  this.template('_main.js', 'main.js');
	  this.template('_package.json', 'package.json');
	  this.template('_README.md', 'README.md');
	  this.copy('Gruntfile.js', 'Gruntfile.js');

	  // ASSETS
	  this.copy('assets/DELETEME.md', 'assets/DELETEME.md');

	  // CONFIG
	  this.copy('config/font-data.json', 'config/font-data.json');
	  this.copy('config/remote-assets.json', 'config/remote-assets.json');
	  this.copy('config/shim-config.json', 'config/shim-config.json');
	  this.template('config/_lib-paths.json', 'config/lib-paths.json');

	  // SRC
	  this.copy('src/DELETEME.md', 'src/DELETEME.md'); 

	  // STYLES
	  // CSS
	  this.copy('styles/css/DELETEME.md', 'styles/css/DELETEME.md');
	  this.copy('styles/css/main.css', 'styles/css/main.css');
	  // LESS
	  this.copy('styles/less/DELETEME.md', 'styles/less/DELETEME.md');
	  this.copy('styles/less/main/style.less', 'styles/less/main/style.less');

	  // TASKS
	 	// TEMPLATES
	 	this.copy('tasks/templates/data-module-template.txt', 'tasks/templates/data-module-template.txt');
	 	this.copy('tasks/templates/index-template.txt', 'tasks/templates/index-template.txt');
	 	this.copy('tasks/templates/requirejs-config-template.txt', 'tasks/templates/requirejs-config-template.txt');
	 	// LOCAL TASKS
	 	this.copy('tasks/build-index.js', 'tasks/build-index.js');
	 	this.copy('tasks/create-config.js', 'tasks/create-config.js');
	 	this.copy('tasks/data-module.js', 'tasks/data-module.js');
	 	this.copy('tasks/local-assets.js', 'tasks/local-assets.js');
	 	this.copy('tasks/make-dir.js', 'tasks/make-dir.js');
  },

  _processPrompt: function (prompts, cb) {
	  this.prompt(prompts, function (props) {
	    for(var k in props) {
	      this[k] = props[k];
	    }

	    cb();
	  }.bind(this));
	}
})