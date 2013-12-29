'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var StateGenerator = module.exports = function StateGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.name = _(this.name).trim().slugify().underscored();
};

util.inherits(StateGenerator, yeoman.generators.NamedBase);

StateGenerator.prototype.files = function files() {
  this.template('_state.js', this.name + '.js');
};



