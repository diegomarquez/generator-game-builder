'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var ExtensionGenerator = module.exports = function ExtensionGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  
  this.name = _(this.name).trim().slugify().dasherize();

  this.mainModule = 'extension';

  this.allModules = [this.mainModule, 'gb'].concat(args.slice(1));  

  this.moduleArguments = _.map(this.allModules, function(element) {
  	return _(element).classify();
  });

  this.allModules = _.map(this.allModules, function(element) {
  	return '"' + element + '"';
  });
};

util.inherits(ExtensionGenerator, yeoman.generators.NamedBase);

ExtensionGenerator.prototype.files = function files() {
  this.template('_extension.js', this.name + '.js');
};


