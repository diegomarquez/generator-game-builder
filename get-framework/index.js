'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var dir_remover = require('../helpers/remove')();

var GetFrameworkGenerator = module.exports = function GetFrameworkGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  _.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));
};

util.inherits(GetFrameworkGenerator, yeoman.generators.Base);

GetFrameworkGenerator.prototype.setup = function setup() {  
	dir_remover.remove([process.cwd() + '/' + this.frameworkLocation], this.async());

	this.mkdir(this.frameworkLocation);

	_.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));
}

GetFrameworkGenerator.prototype.getFramework = function getFramework() {  
  var cb = this.async();
  
  var self = this;

  this.remote('diegomarquez', 'game', this.frameworkTag, function (err, remote) {
      if (err) return cb(err);
 	
      remote.directory('./', self.frameworkLocation);
      cb();
    }, true);
};
