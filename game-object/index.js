'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var GameObjectGenerator = module.exports = function GameObjectGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.name = _(this.name).trim().slugify().underscored();
};

util.inherits(GameObjectGenerator, yeoman.generators.NamedBase);

GameObjectGenerator.prototype.files = function files() {
  this.template('_game_object.js', this.name + '.js');
};
