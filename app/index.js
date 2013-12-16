'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var art = require('ascii-art');
var color = require('colors');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var installWrapper = require('../helpers/install_wrapper')();

art.Figlet.fontPath = __dirname + '/../fonts/';

var GameBuilderGenerator = module.exports = function GameBuilderGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var defaultHookOptions = {
    args: args,
    options: {
      options: { force: true }
    }
  }

  this.hookFor('game-builder:get-deps', _.clone(defaultHookOptions));
  this.hookFor('game-builder:get-framework', _.clone(defaultHookOptions));
  this.hookFor('game-builder:build-index', _.clone(defaultHookOptions));
  
  this.hookFor('game-builder:build-main', {
    args: [this],
    options: {
      options: { force: true }
    }
  });

  this.on('end', function () {
    installWrapper.npmInstall(this, options);  
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GameBuilderGenerator, yeoman.generators.Base);

GameBuilderGenerator.prototype._processPrompt = function _processPrompt(prompts, cb) {
  this.prompt(prompts, function (props) {
    for(var k in props) {
      this[k] = props[k];
    }

    cb();
  }.bind(this));
}

GameBuilderGenerator.prototype.generatorType = function generatorType() {
  var cb = this.async();

  console.log('Hello, welcome too...');

  art.font('GAME', 'smslant', 'red')
     .font('-', 'smslant', 'yellow')
     .font('BUILDER', 'smslant', 'red')
     .font( ' .v1', 'smslant', 'yellow', function(rendered){

    console.log(rendered);
    console.log('A generator by ' + 'Diego Enrique Marquez'.red.bold + ' (https://github.com/diegomarquez)');
    console.log('Powered by ' + 'Yeoman'.yellow.bold + ' (http://yeoman.io/)');
    console.log();

    this.frameworkTag = 'latest';
    this.extensions = ['pause', 'resume', 'basic_layer_setup'];
    this.frameworkLocation = './';
    this.additionalSrcPaths = [];
    this.askForFramework = false;

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
      }
    ];

    this._processPrompt(prompts, cb);
  }.bind(this));
};

GameBuilderGenerator.prototype.downloadFramework = function downloadFramework() {
  if (!this.defaultGeneration) {
    var customizePompts = [
      {
        type: 'list',
        name: "frameworkTag",
        message: "Which branch of game-builder would you like to use?",
        choices: ['latest', 'master'],
        default: 0
      },  

      {
        name: "frameworkLocation",
        message: "What will be the root of game-builder?",
        default: "./"
      },

      {
        name: "frameworkFolderName",
        message: "What should the name of game-builder's folder be?",
        default: "game-builder"
      }
    ];

    this._processPrompt(customizePompts, this.async());  
  }
}

GameBuilderGenerator.prototype.createFolderStructure = function folderStructure() {
  this.mkdir('assets');
  this.mkdir('assets/images');
  this.mkdir('assets/sounds');
  this.mkdir('assets/sounds/sfx');
  this.mkdir('assets/sounds/bgm');

  this.mkdir('src');
  this.mkdir('styles');  
};

GameBuilderGenerator.prototype.copyFiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
  
  this.copy('_main.html', 'main.html');
  this.copy('.gitignore', '.gitignore');
  this.copy('.bowerrc', '.bowerrc');
  this.copy('main.css', 'styles/main.css');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};