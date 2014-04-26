'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var StateGenerator = module.exports = function StateGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  
  this.name = _(this.name).trim().slugify().dasherize();

  this.moduleRequires = _.map(args.slice(1), function(element) {
  	return {
  		variableName: _(element).trim().slugify().underscored(),
  		moduleName: element
  	}
  });
};

util.inherits(StateGenerator, yeoman.generators.NamedBase);

StateGenerator.prototype.files = function files() {
  this.template('_state.js', this.name + '.js');
};



