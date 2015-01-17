'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var RendererGenerator = module.exports = function RendererGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.name = _(this.name).trim().slugify().dasherize();
};

util.inherits(RendererGenerator, yeoman.generators.NamedBase);

RendererGenerator.prototype._processPrompt = function _processPrompt(prompts, cb) {
  this.prompt(prompts, function (props) {
    for(var k in props) {
      this[k] = props[k];
    }

    cb();
  }.bind(this));
}

RendererGenerator.prototype.inquire = function inquire() {
  var cb = this.async();

  var prompts = [
    {
    	type: 'list',
      name: "mainModule",
      message: "What module does this renderer extend?",
      choices: ['renderer', 'bitmap-renderer', 'path-renderer', 'text-renderer'],
      default: 'renderer'
    },

    {
      name: "dependencies",
      message: "What other dependencies does it have? (Add them as a comma separated list)",
      default: ""
    }
  ];

  this._processPrompt(prompts, cb);
}

RendererGenerator.prototype.files = function files() {
	this.dependencies = _(this.dependencies).clean().value().replace(/ /g, "");

	var d = _.compact(this.dependencies.split(','));

  if(this.mainModule == 'bitmap-renderer') { 
  	d.push('image-cache');
  }

  if(this.mainModule == 'path-renderer') { 
  	d.push('path-cache');
  }
  
  if(this.mainModule == 'text-renderer') { 
  	d.push('text-cache');
  }

  this.dependencies = d.join(',');

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

  this.template('_renderer.js', this.name + '.js');
};
