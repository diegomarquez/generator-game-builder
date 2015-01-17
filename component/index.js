'use strict';

var SubGenerator = require('../sub-generator');

var componentGenerator = {
	constructor: function () {
    SubGenerator.generator.apply(this, arguments); 

    this._setMainModule('component');
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
    this.fs.copyTpl(this.templatePath('_component.js'), this.destinationPath(this.name + '.js'), this);
	}
}

SubGenerator.addInterfaceMethods(componentGenerator);

module.exports = SubGenerator.generator.extend(componentGenerator);
