'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var colors = require('colors');

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

BuildMainGenerator.prototype._block = function _block() {
  return !this.args[0] || (!this.args[0].hasOwnProperty('defaultGeneration') || !this.args[0].hasOwnProperty('extensions')) 
}

BuildMainGenerator.prototype._notAvailableMessage = function _notAvailable() {
  console.log();
  console.log('This subgenerator does nothing outside of the main generator workflow.'.red);
  console.log('It exists solely to be used as a hook that is able to prompt.'.red);
  console.log();
  console.log('If you know of a better way of having prompts scattered through a generator, let me know.'.grey);
  console.log('marquez.diego.e@gmail.com'.grey);
  console.log();
}

BuildMainGenerator.prototype._message = function _message() {
  console.log();
  console.log('--------------------------------------------------'.cyan);
  console.log('----------'.cyan + ' Add Extensions Sub Generator '.grey.bold + '----------'.cyan);
  console.log('--------------------------------------------------'.cyan);
  console.log();
}

BuildMainGenerator.prototype.buildMain = function buildMain() {
  var cb = this.async();

  if(this._block()) {
  	cb();
  	this._notAvailableMessage();
  	return;
  }

  if(!this.args[0].defaultGeneration) {
    this._message();

    var extensions = this.expandFiles(this.frameworkLocation + '/src/game_canvas/extensions/**/*.js');
    
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
