'use strict';

var SubGenerator = require('../sub-generator');

var stateGenerator = {
	constructor: function () {
    SubGenerator.generator.apply(this, arguments); 
  },

  _defaultDependencies: function(dependencies) {
  	return null;
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
    this.fs.copyTpl(this.templatePath('_state.js'), this.destinationPath(this.name + '.js'), this);
	}
}

SubGenerator.addInterfaceMethods(stateGenerator);

module.exports = SubGenerator.generator.extend(stateGenerator);







