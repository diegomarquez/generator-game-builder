'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var interfaceMethods = [
	'initializing',
	'configuring',
	'default',
	'conflicts',
	'install',
	'end',
	'prompting',
	'writing'
] 

module.exports = {
	generator: yeoman.generators.NamedBase.extend({
	  constructor: function () {
	    yeoman.generators.NamedBase.apply(this, arguments);
	    
	  	this.name = _(this.name).trim().slugify().dasherize();  
	  },

	  initializing: function() {

	  },

	  configuring: function() {

	  },

	  default: function() {

	  },

	  conflicts: function() {

	  },

	  install: function() {

	  }, 

	  end: function() {

	  },

	  prompting: function () {
	    this._processPrompt(this._getPrompt(), this.async());
	  },

	  writing: function() {
	  	this._buildDependencies();
			this._createFiles();
	  },

	  _processPrompt: function (prompts, cb) {
		  this.prompt(prompts, function (props) {
		    for(var k in props) {
		      this[k] = props[k];
		    }

		    cb();
		  }.bind(this));
		},

		_buildDependencies: function() {
			this.dependencies = _(this.dependencies).trim().value();

			var d = _.compact(this.dependencies.split(','));

			this._defaultDependencies(d);

			d = d.map(function(dep) {
		  	return _(dep).trim();
		  });

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

		  this.moduleRequires = _.map(d, function(element) {
		  	return {
		  		variableName: _(element).trim().slugify().underscored(),
		  		moduleName: element
		  	}
		  });
		},

		// Interface Methods
		_defaultDependencies: function(dependencies) {
			return null;
		},

		_getPrompt: function() {
			return [{}];
		},

		_setMainModule: function(module) {
			this.mainModule = module;
		},

		_createFiles: function() {

		},
	}),
	
	addInterfaceMethods: function(o) {
		_(interfaceMethods).each(function(method) {
			o[method] = function() {
				this.constructor.__super__[method].apply(this, arguments);	
			}
		});
	}
}


