'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var ExtensionGenerator = module.exports = function ExtensionGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.name = _(this.name).trim().slugify().underscored();
};

util.inherits(ExtensionGenerator, yeoman.generators.NamedBase);

ExtensionGenerator.prototype.files = function files() {
  this.template('_container.js', this.name + '.js');
};


