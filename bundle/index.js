'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var BundleGenerator = module.exports = function BundleGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  
  this.name = _(this.name).trim().slugify().dasherize();

  this.moduleRequires = _.map(args.slice(1), function(element) {
  	return {
  		variableName: _(element).trim().slugify().underscored(),
  		moduleName: element
  	}
  });
};

util.inherits(BundleGenerator, yeoman.generators.NamedBase);

BundleGenerator.prototype.files = function files() {
  this.template('_bundle.js', this.name + '.js');
};
