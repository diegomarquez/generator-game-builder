'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var installWrapper = require('../helpers/install_wrapper')();

var GameBuilderGenerator = module.exports = function GameBuilderGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.hookFor('game-builder:get-deps', {
    args: args,
    options: {
      options: { force: true }
    }
  });

  this.hookFor('game-builder:get-framework', {
    args: args,
    options: { 
      options: { force: true }
    }
  });

  this.hookFor('game-builder:build-index', {
    args: args,
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

GameBuilderGenerator.prototype.askFor = function askFor() {
  // Have Yeoman greet the user.
  console.log(this.yeoman);

  var cb = this.async();

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
    }
  ];

  this.prompt(prompts, function (props) {
    for(var k in props) {
      this[k] = props[k];
    }

    cb();
  }.bind(this));
};

GameBuilderGenerator.prototype.createFolderStructure = function folderStructure() {
  this.mkdir('src');
  this.mkdir('styles');  
};

GameBuilderGenerator.prototype.copyFiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_main.js', 'main.js');

  this.copy('_main.html', 'main.html');
  this.copy('.gitignore', '.gitignore');
  this.copy('.bowerrc', '.bowerrc');
  this.copy('main.css', 'styles/main.css');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};
