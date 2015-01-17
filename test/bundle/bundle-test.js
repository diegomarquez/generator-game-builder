describe('SubGenerator Bundle', function () {
  it('creates a file', function (done) {
    createSubGenerator('bundle', ['myBundle'], function() {

    	assertFileExists(__dirname + '/temp/mybundle.js');
    	assert.fileContent('mybundle.js', new RegExp("require\\(\\'bundle\\'\\)\.extend"));
    	
    	done();
    });
  });

  it('creates a file creating a dasherized name from the input ', function (done) {
    createSubGenerator('bundle', ['my Bundle'], function() {
    	
    	assertFileExists(__dirname + '/temp/my-bundle.js');
    	assert.fileContent('my-bundle.js', new RegExp("require\\(\\'bundle\\'\\)\.extend"));
    	
    	done();
    });
  });

  it('generates require calls with additional arguments', function (done) {
    createSubGeneratorWithPrompt('bundle', ['my Bundle'], { dependencies: ['module1', 'module2', 'module3']}, function() {

    	assertFileExists(__dirname + '/temp/my-bundle.js');
    	
    	assert.fileContent('my-bundle.js', new RegExp("var module1 = require\\(\\'module1\\'\\)"));
    	assert.fileContent('my-bundle.js', new RegExp("var module2 = require\\(\\'module2\\'\\)"));
    	assert.fileContent('my-bundle.js', new RegExp("var module3 = require\\(\\'module3\\'\\)"));

    	done();
    });
  });

  it('underscorizes variable names of generated require calls if there are spaces in the arguments', function (done) {
    createSubGeneratorWithPrompt('bundle', ['my Bundle'], { dependencies: ['module 1', 'module 2', 'module 3']}, function() {

    	assertFileExists(__dirname + '/temp/my-bundle.js');

    	assert.fileContent('my-bundle.js', new RegExp("var module_1 = require\\(\\'module 1\\'\\)"));
    	assert.fileContent('my-bundle.js', new RegExp("var module_2 = require\\(\\'module 2\\'\\)"));
    	assert.fileContent('my-bundle.js', new RegExp("var module_3 = require\\(\\'module 3\\'\\)"));

    	done();
    });
  });

  it('spaces before and after dependencies are removed', function (done) {
    createSubGeneratorWithPrompt('bundle', ['my Bundle'], { dependencies: ['  module 1  ', '  module 2  ', '  module 3'  ]}, function() {

    	assertFileExists(__dirname + '/temp/my-bundle.js');

    	assert.fileContent('my-bundle.js', new RegExp("var module_1 = require\\(\\'module 1\\'\\)"));
    	assert.fileContent('my-bundle.js', new RegExp("var module_2 = require\\(\\'module 2\\'\\)"));
    	assert.fileContent('my-bundle.js', new RegExp("var module_3 = require\\(\\'module 3\\'\\)"));

    	done();
    });
  });
});
