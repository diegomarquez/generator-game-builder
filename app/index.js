'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var installWrapper = require('../helpers/install_wrapper')();

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
  // Have Yeoman greet the user.
  console.log(this.yeoman);

  this.frameworkTag = 'master';
  this.extensions = ['pause', 'resume', 'basic_layer_setup'];
  this.frameworkLocation = './';
  this.additionalSrcPaths = [];
  this.askForFramework = false;

  var prompts = [
    {
      name: "name",
      message: "What will the name of your project be?"
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

  this._processPrompt(prompts, this.async());
};

GameBuilderGenerator.prototype.downloadFramework = function downloadFramework() {
  var customizePompts = [{
    type: 'list',
    name: "frameworkTag",
    message: "Which branch of game-builder would you like to use?",
    choices: ['0.1.0', 'master'],
    default: 1
  },  

  {
    name: "frameworkLocation",
    message: "Where would you like game-builder to be downloaded to?",
    default: "./"
  }];

  this._processPrompt(customizePompts, this.async());
}

GameBuilderGenerator.prototype.createFolderStructure = function folderStructure() {
  this.mkdir('src');
  this.mkdir('styles');  
};

GameBuilderGenerator.prototype.copyFiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  
  this.copy('_main.html', 'main.html');
  this.copy('.gitignore', '.gitignore');
  this.copy('.bowerrc', '.bowerrc');
  this.copy('main.css', 'styles/main.css');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};