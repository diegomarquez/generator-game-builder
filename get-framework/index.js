'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var dir_remover = require('../helpers/remove')();

var GetFrameworkGenerator = module.exports = function GetFrameworkGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(GetFrameworkGenerator, yeoman.generators.Base);

GetFrameworkGenerator.prototype.setup = function setup() {  
	dir_remover.remove([process.cwd() + '/framework'], this.async());

	this.mkdir('./framework');
}

GetFrameworkGenerator.prototype.getFramework = function getFramework() {  
  var cb = this.async();
  
  this.remote('diegomarquez', 'game', 'master', function (err, remote) {
      if (err) return cb(err);
 	
      remote.directory('./src', './framework');
      cb();
    }, true);
};
