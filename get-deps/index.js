'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var remove = require('../helpers/remove')();
var installWrapper = require('../helpers/install_wrapper')();

var GetDepsGenerator = module.exports = function GetDepsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;

  _.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));

  this.libPath = process.cwd() + '/' + this.libLocation + this.libFolderName + '/';
};

util.inherits(GetDepsGenerator, yeoman.generators.Base);

GetDepsGenerator.prototype.getDependencies = function getDependencies() {
  installWrapper.bowerInstall(this, this.options, this.async());
};

GetDepsGenerator.prototype.copyUsefulFiles = function clearGarbageFrom() {
	this.copy(this.libPath + 'requirejs/require.js', this.libPath + '/require.js');
	this.copy(this.libPath + 'requirejs-domready/domready.js', this.libPath + '/domready.js');
};

GetDepsGenerator.prototype.clearGarbage = function clearGarbageFrom() {
	remove.remove([this.libPath + '/requirejs/', this.libPath + '/requirejs-domready/'], this.async());
};
