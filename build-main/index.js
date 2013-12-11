'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var BuildMainGenerator = module.exports = function BuildMainGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.args = args;

  _.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));
};

util.inherits(BuildMainGenerator, yeoman.generators.Base);

BuildMainGenerator.prototype._processPrompt = function _processPrompt(prompts, cb) {
  this.prompt(prompts, function (props) {
    for(var k in props) {
      this[k] = props[k];
    }

    cb();
  }.bind(this));
}

BuildMainGenerator.prototype.buildMain = function buildMain() {
  var cb = this.async();

  console.log('------------------------------------');
  console.log('---------- Add Extensions ----------')
  console.log('------------------------------------');

  if(!this.args[0]) {
  	cb();
  	console.log('This subgenerator does nothing outside of the main generator');
  	return;
  }else {
  	if(!this.args[0].hasOwnProperty('defaultGeneration') || !this.args[0].hasOwnProperty('extensions')){
  		cb();
  		console.log('This subgenerator does nothing outside of the main generator')
  		return;
  	}
  }

  if(!this.args[0].defaultGeneration) {
    var extensions = this.expandFiles(this.frameworkLocation + 'game-builder/game_canvas/extensions/**/*.js');
    
    var extensionChoices = _.map(extensions, function(extension){
      return {
        name: extension.match(/(\w+)\.js$/)[1]
      }
    });

    var extensionsPrompt = {
      type: 'checkbox',
      name: "extensions",
      message: "Which extensions would you like to use?",
      choices: extensionChoices
    }

    this._processPrompt(extensionsPrompt, function() {
      this.template('_main.js', 'main.js');
 	  cb();
    }.bind(this));
  }else {
  	this.extensions = this.args[0].extensions;

    this.template('_main.js', 'main.js');
    cb();
  }
};
