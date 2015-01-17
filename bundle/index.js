'use strict';

var SubGenerator = require('../sub-generator');

var bundleGenerator = {
	constructor: function () {
    SubGenerator.generator.apply(this, arguments); 

    this._setMainModule('bundle');
  },

  _defaultDependencies: function(dependencies) {
		return [];
	},

	_getPrompt: function() {
		return [
			{
	      name: "dependencies",
	      message: "What dependencies does it have? (Add them as a comma separated list)",
	      default: ""
	    }
	  ];
	},

	_createFiles: function() {
    this.fs.copyTpl(this.templatePath('_bundle.js'), this.destinationPath(this.name + '.js'), this);
	}
}

SubGenerator.addInterfaceMethods(bundleGenerator);

module.exports = SubGenerator.generator.extend(bundleGenerator);