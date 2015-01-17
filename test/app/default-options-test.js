describe('Generator Game-Builder with default settings', function () {
	beforeEach(function (done) {
    createAppGenerator({
    	'name': 'my game',
      'width': 400,
      'height': 300,
      'defaultGeneration': true
    }, done);
  });
	
  it('generates expected folder structure', function () {
  	var expected = [
  		// ASSETS
  		'assets/DELETEME.md',
  		// CONFIG
  		'config/lib-paths.json',
  		'config/font-data.json',
  		'config/remote-assets.json',
  		'config/shim-config.json',
  		// SRC
  		'src/DELETEME.md',
  		// STYLES
  		'styles/css/DELETEME.md',
  		'styles/css/main.css',
  		'styles/less/DELETEME.md',
  		'styles/less/main/style.less',
  		// TASKS
  		'tasks/templates/data-module-template.txt',
  		'tasks/templates/index-template.txt',
  		'tasks/templates/requirejs-config-template.txt',
  		'tasks/build-index.js',
  		'tasks/create-config.js',
  		'tasks/data-module.js',
  		'tasks/local-assets.js',
  		'tasks/make-dir.js',
  		// ROOT
  		'.bowerrc',
  		'.gitignore', 
  		'bower.json',
  		'index.html',
  		'main.js',
      'package.json',
      'README.md',
      'Gruntfile.js'
    ];

    assert.file(expected);	
  });
  
	it('builds package.json properly', function () {
		assertPackageJson('name', 'my game');
		assertPackageJson('additionalSrcPaths', '');
		assertPackageJson('additionalAssetPaths', '');
		assertPackageJson('framework', './game-builder');
		assertPackageJson('lib', './lib');
		assertPackageJson('frameworkTag', 'latest');
	});

	it('builds lib-paths.json properly', function () {
		assert.fileContent('config/lib-paths.json', /"domready": "\.\/lib\/requirejs-domready\/domReady"/);
	});

	it('builds .bowerrc properly', function () {
    assert.fileContent('.bowerrc', /"directory" : "\.\/lib"/);	
	});

	it('builds bower.json properly', function () {
		assert.fileContent('bower.json', /"name": "my game"/);	
	});

	it('builds index.html properly', function () {
		assert.fileContent('index.html', /<title>my game<\/title>/);
    assert.fileContent('index.html', /width="400"/);
    assert.fileContent('index.html', /height="300"/);
    assert.fileContent('index.html', /src="\.\/lib\/requirejs\/require\.js"/);	
	});

	it('builds main.js properly', function () {
		assert.fileContent('main.js', /my game/);	
	});

	it('builds README.md properly', function () {
		assert.fileContent('README.md', /my game/);	
	});
});
