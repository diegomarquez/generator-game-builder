'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var ExtendRendererGenerator = module.exports = function ExtendRendererGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.name = _(this.name).trim().slugify().dasherize();

  this.mainModule = args[1];

  var helper;

  if(this.mainModule == 'bitmap-renderer') { helper = 'image-cache'; }
  if(this.mainModule == 'path-renderer') { helper = 'path-cache'; }

  this.allModules = [this.mainModule, helper].concat(args.slice(2));  

  this.moduleArguments = _.map(this.allModules, function(element) {
  	return _(element).classify();
  });

  this.allModules = _.map(this.allModules, function(element) {
  	return '"' + element + '"';
  });
};

util.inherits(ExtendRendererGenerator, yeoman.generators.NamedBase);

ExtendRendererGenerator.prototype.files = function files() {
  this.template('_extended-renderer.js', this.name + '.js');
};
