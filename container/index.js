'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var ContainerGenerator = module.exports = function ContainerGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.name = _(this.name).trim().slugify().underscored();
};

util.inherits(ContainerGenerator, yeoman.generators.NamedBase);

ContainerGenerator.prototype.files = function files() {
  this.template('_container.js', this.name + '.js');
};

