helpers = require('yeoman-generator').test;
assert = require('yeoman-generator').assert;
path = require('path');

printFile = function(path) {
	var fs = require('fs');
	var body = fs.readFileSync(path, 'utf8');

	console.log(body);
}

createAppGenerator = function(prompt, done) {
	helpers.run(path.join( __dirname, '../app'))
    .inDir(path.join( __dirname, './app/temp/innerTemp'))  // Clear the directory and set it as the CWD
    .withOptions({ 
    	'skip-install': true,
    	'skip-welcome': true,
    	'skip-message': true
    })   
    .withArguments([])              
    .withPrompt(prompt)
    .on('end', done);
}

createSubGenerator = function(name, args, done) {	
  helpers.run(path.join(__dirname, '../' + name))
  	.inDir(path.join( __dirname, './' + name + '/temp'))
    .withArguments(args)
    .on('end', done);
}

createSubGeneratorWithPrompt = function(name, args, prompt, done) {	
  helpers.run(path.join(__dirname, '../' + name))
  	.inDir(path.join( __dirname, './' + name + '/temp'))
    .withArguments(args)
    .withPrompt(prompt)
    .on('end', done);
}

var fs = require('fs');

fileExistsWithCaseSync = function (filepath) {
  var dir = path.dirname(filepath);

  if (dir === '/' || dir === '.') return true;
  var filenames = fs.readdirSync(dir);

  if (filenames.indexOf(path.basename(filepath)) === - 1) {
      return false;
  }

  return fileExistsWithCaseSync(dir);
}

assertPackageJson = function(property, value) {
	assert.fileContent('package.json', new RegExp('"' + property + '": ' + '"' + value + '"'));
}

assertDependencies = function(file, dependencies) {
	var start = 'define\\(\\[';

	dependencies = dependencies
		.map(function(dep) {
			return '"' + dep + '"';
		})
		.join(', ');

	var end = '\\]'

	assert.fileContent(file, new RegExp(start + dependencies + end));
}

assertMethodExistance = function(file, method, arg) {
	assert.fileContent(file, new RegExp(method + ": function\\((" + arg + ")?\\)"));
}

assertSuperCallExistance = function(file, method, arg) {
	assert.fileContent(file, new RegExp(method + ": function\\((" + arg + ")?\\) {\\n?(.*?)this\\._super\\((" + arg + ")?\\)"));
}

rejectSuperCallExistance = function(file, method, arg) {
	assert.noFileContent(file, new RegExp(method + ": function\\((" + arg + ")?\\) {\\n?(.*?)this\\._super\\((" + arg + ")?\\)"));
}

assertFileExists = function(filepath) {	
	assert.ok(fileExistsWithCaseSync(filepath), filepath + ', no such file or directory');
}
