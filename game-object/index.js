'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var GameObjectGenerator = module.exports = function GameObjectGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.name = _(this.name).trim().slugify().dasherize();
};

util.inherits(GameObjectGenerator, yeoman.generators.NamedBase);

GameObjectGenerator.prototype._processPrompt = function _processPrompt(prompts, cb) {
  this.prompt(prompts, function (props) {
    for(var k in props) {
      this[k] = props[k];
    }

    cb();
  }.bind(this));
}

GameObjectGenerator.prototype.inquire = function inquire() {
  var cb = this.async();

  var prompts = [
    {
    	type: 'list',
      name: "mainModule",
      message: "What module does this game object extend?",
      choices: ['game-object', 'game-object-container'],
      default: 'game-object'
    },

    {
      name: "dependencies",
      message: "What other dependencies does it have? (Add them as a comma separated list)",
      default: ""
    }
  ];

  this._processPrompt(prompts, cb);
}

GameObjectGenerator.prototype.files = function files() {
	this.dependencies = _(this.dependencies).clean().value().replace(/ /g, "");

	if (_(this.dependencies).isBlank().value()) {
		this.allModules = [this.mainModule];
	} else {
		this.allModules = [this.mainModule].concat(_(this.dependencies).value().split(','));	
	}

  this.moduleArguments = _.map(this.allModules, function(element) {
  	return _(element).classify();
  });

  this.allModules = _.map(this.allModules, function(element) {
  	return '"' + element + '"';
  });

  this.template('_game_object.js', this.name + '.js');
};
