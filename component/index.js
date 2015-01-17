'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.name = _(this.name).clean().slugify().dasherize(); 
};

util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

ComponentGenerator.prototype._processPrompt = function _processPrompt(prompts, cb) {
  this.prompt(prompts, function (props) {
    for(var k in props) {
      this[k] = props[k];
    }

    cb();
  }.bind(this));
}

ComponentGenerator.prototype.inquire = function inquire() {
  var cb = this.async();

  var prompts = [
    {
      name: "mainModule",
      message: "What module does this component extend?",
      default: "component"
    },

    {
      name: "dependencies",
      message: "What other dependencies does it have? (Add them as a comma separated list)",
      default: ""
    }
  ];

  this._processPrompt(prompts, cb);
}

ComponentGenerator.prototype.files = function files() {
	this.dependencies = _(this.dependencies).clean().value().replace(/ /g, "");

	if (_(this.dependencies).isBlank().value()) {
		this.allModules = [this.mainModule];
	} else {
		this.allModules = [this.mainModule].concat(_(this.dependencies).value().split(','));	
	}

  this.moduleArguments = _.map(this.allModules, function(element) {
  	return _(element).classify();
  });

  this.allModules = _.map(this.allModules, function(element) {
  	return '"' + element + '"';
  });

  this.template('_component.js', this.name + '.js');
}







