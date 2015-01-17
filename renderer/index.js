'use strict';

var SubGenerator = require('../sub-generator');

var rendererGenerator = {
	constructor: function () {
    SubGenerator.generator.apply(this, arguments); 
  },

  _defaultDependencies: function(dependencies) {
  	if(this.mainModule == 'bitmap-renderer') { 
	  	dependencies.push('image-cache');
	  }

	  if(this.mainModule == 'path-renderer') { 
	  	dependencies.push('path-cache');
	  }
	  
	  if(this.mainModule == 'text-renderer') { 
	  	dependencies.push('text-cache');
	  }
	},

	_getPrompt: function() {
		return [
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
	},

	_createFiles: function() {
    this.fs.copyTpl(this.templatePath('_renderer.js'), this.destinationPath(this.name + '.js'), this);
	}
}

SubGenerator.addInterfaceMethods(rendererGenerator);

module.exports = SubGenerator.generator.extend(rendererGenerator);




