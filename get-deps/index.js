'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var remove = require('../helpers/remove')();
var installWrapper = require('../helpers/install_wrapper')();

var GetDepsGenerator = module.exports = function GetDepsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;
};

util.inherits(GetDepsGenerator, yeoman.generators.Base);

GetDepsGenerator.prototype.getDependencies = function getDependencies() {
  installWrapper.bowerInstall(this, this.options, this.async());
};

GetDepsGenerator.prototype.copyUsefulFiles = function clearGarbageFrom() {
	var path = process.cwd();

	this.copy(path + '/lib/requirejs/require.js', path + '/lib/require.js');
	this.copy(path + '/lib/requirejs-domready/domready.js', path + '/lib/domready.js');
};

GetDepsGenerator.prototype.clearGarbage = function clearGarbageFrom() {
	var path = process.cwd();
	remove.remove([path + '/lib/requirejs/', path + '/lib/requirejs-domready/'], this.async());
};
