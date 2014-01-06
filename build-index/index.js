'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var p = require('path');

var BuildIndexGenerator = module.exports = function BuildIndexGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.args = args;

  this.mainDivStructure = this.readFileAsString(process.cwd() + '/main.html');

  _.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));

  this.args.push(this.frameworkLocation + this.frameworkFolderName + '/src');
  this.args.push(this.libLocation + this.libFolderName);
  this.args.push('src');
  this.args.push('lib');

  var getPaths = function(paths) {
    if(paths.length != 0) {
      return paths.split(',');
    }
    return [];
  }

  this.args = this.args.concat(getPaths(this.additionalSrcPaths));
  this.args = this.args.concat(getPaths(this.additionalAssetPaths));
  this.args = this.args.concat(getPaths(this.additionalLibPaths));
};

util.inherits(BuildIndexGenerator, yeoman.generators.Base);

BuildIndexGenerator.prototype.buildConfiguration = function buildConfiguration() {
  var files = [];

  for(var i=0; i<this.args.length; i++) {
    files = files.concat(this.expandFiles(this.args[i] + '/**/*.js')); 
  }

  this.paths = [];

  for (var i in files) {
    var base = p.basename(files[i], '.js');
    var dir = p.dirname(files[i]);
    var path = dir + p.sep + base;
  
    this.paths.push({alias:base, path:path})
  }

  this.template('_index.html', 'index.html');
};

BuildIndexGenerator.prototype.fillPartials = function fillPartials() {
  var indexHtml = this.readFileAsString(process.cwd() + '/index.html');
  var compiled = _.template(indexHtml);

  this.write('index.html', compiled(this));
};
