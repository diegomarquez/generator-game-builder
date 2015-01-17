'use strict';

var SubGenerator = require('../sub-generator');

var gameObjectGenerator = {
	constructor: function () {
    SubGenerator.generator.apply(this, arguments); 
  },

  _defaultDependencies: function(dependencies) {
  	return null;
	},

	_getPrompt: function() {
		return [
			{
	    	type: 'list',
	      name: "mainModule",
	      message: "What module does this game object extend?",
	      choices: ['game-object', 'game-object-container'],
	      default: 'game-object'
	    },

	    {
	      name: "dependencies",
	      message: "What other dependencies does it have? (Add them as a comma separated list)",
	      default: ""
	    }
	  ];
	},

	_createFiles: function() {
    this.fs.copyTpl(this.templatePath('_game_object.js'), this.destinationPath(this.name + '.js'), this);
	}
}

SubGenerator.addInterfaceMethods(gameObjectGenerator);

module.exports = SubGenerator.generator.extend(gameObjectGenerator);




