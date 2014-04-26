'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var GameObjectGenerator = module.exports = function GameObjectGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  
  this.name = _(this.name).trim().slugify().dasherize();

  this.mainModule = args[1];

  this.allModules = [this.mainModule].concat(args.slice(2));  

  this.moduleArguments = _.map(this.allModules, function(element) {
  	return _(element).classify();
  });

  this.allModules = _.map(this.allModules, function(element) {
  	return '"' + element + '"';
  });
};

util.inherits(GameObjectGenerator, yeoman.generators.NamedBase);

GameObjectGenerator.prototype.files = function files() {
  this.template('_game_object.js', this.name + '.js');
};
