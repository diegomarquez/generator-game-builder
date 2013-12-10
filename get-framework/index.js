'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var dir_remover = require('../helpers/remove')();

var GetFrameworkGenerator = module.exports = function GetFrameworkGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(GetFrameworkGenerator, yeoman.generators.Base);

GetFrameworkGenerator.prototype.setup = function setup() {  
	dir_remover.remove([process.cwd() + '/game-builder'], this.async());

	this.mkdir('./game-builder');

	_.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));
}

GetFrameworkGenerator.prototype.getFramework = function getFramework() {  
  var cb = this.async();
  
  this.remote('diegomarquez', 'game', this.frameworkTag, function (err, remote) {
      if (err) return cb(err);
 	
      remote.directory('./src', './game-builder');
      cb();
    }, true);
};
