'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
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

util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

ComponentGenerator.prototype.files = function files() {
  this.template('_component.js', this.name + '.js');
};




