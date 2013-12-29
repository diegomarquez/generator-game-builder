'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var RendererGenerator = module.exports = function RendererGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.name = _(this.name).trim().slugify().underscored();
};

util.inherits(RendererGenerator, yeoman.generators.NamedBase);

RendererGenerator.prototype.files = function files() {
  this.template('_renderer.js', this.name + '.js');
};




