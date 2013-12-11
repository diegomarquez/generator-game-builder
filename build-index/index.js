'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var BuildIndexGenerator = module.exports = function BuildIndexGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.args = args;

  this.mainDivStructure = this.readFileAsString(process.cwd() + '/main.html');

  _.assign(this, JSON.parse(this.readFileAsString(process.cwd() + '/package.json')));

  args.push(this.frameworkLocation + 'game-builder');
  args.push('src');
  args.push('lib');
};

util.inherits(BuildIndexGenerator, yeoman.generators.Base);

BuildIndexGenerator.prototype.buildConfiguration = function buildConfiguration() {
  var files = [];

  for(var i=0; i<this.args.length; i++) {
    files = files.concat(this.expandFiles(this.args[i] + '/**/*.js')); 
  }

  this.paths = [];

  for (var i in files) {
    var path = files[i];

    this.paths.push({alias:path.match(/(\w+)\.js$/)[1], path:path.replace(/\.js$/, '')})
  }

  this.template('_index.html', 'index.html');
};

BuildIndexGenerator.prototype.fillPartials = function fillPartials() {
  var indexHtml = this.readFileAsString(process.cwd() + '/index.html');
  var compiled = _.template(indexHtml);

  this.write('index.html', compiled(this));
};
