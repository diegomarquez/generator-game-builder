'use strict';

var SubGenerator = require('../sub-generator');

var extensionGenerator = {
	constructor: function () {
    SubGenerator.generator.apply(this, arguments); 

    this._setMainModule('extension');
  },

  _defaultDependencies: function(dependencies) {
  	dependencies.push("gb");
	},

	_getPrompt: function() {
		return [
			{
		    type: 'list',
		    name: "extensionType",
		    message: "Where should this extension be executed?",
		    choices: ['CREATE', 'FOCUS', 'BLUR', 'UPDATE'],
		    default: 'CREATE'
		  },
			{
	      name: "dependencies",
	      message: "What dependencies does it have? (Add them as a comma separated list)",
	      default: ""
	    }
	  ];
	},

	_createFiles: function() {
    this.fs.copyTpl(this.templatePath('_extension.js'), this.destinationPath(this.name + '.js'), this);
	}
}

SubGenerator.addInterfaceMethods(extensionGenerator);

module.exports = SubGenerator.generator.extend(extensionGenerator);



