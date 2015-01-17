describe('Generator Game-Builder with lib location selection', function () {
	beforeEach(function (done) {
		createAppGenerator({
    	'name': 'my game',
      'width': 400,
    	'height': 300,
      'defaultGeneration': false,
	    'frameworkTag': 'master',
	    'libLocation': '../custom-lib-location'
    }, done);
  });
	
	it('builds package.json properly', function () {
		assertPackageJson('name', 'my game');
		assertPackageJson('additionalSrcPaths', '');
		assertPackageJson('additionalAssetPaths', '');
		assertPackageJson('framework', './game-builder');
		assertPackageJson('lib', '../custom-lib-location');
		assertPackageJson('frameworkTag', 'master');
	});

	it('builds lib-paths.json properly', function () {
		assert.fileContent('config/lib-paths.json', /"domready": "\.\.\/custom-lib-location\/requirejs-domready\/domReady"/);
	});

	it('builds .bowerrc properly', function () {
	  assert.fileContent('.bowerrc', /"directory" : "\.\.\/custom-lib-location"/);	
	});

	it('builds index.html properly', function () {
		assert.fileContent('index.html', /src="\.\.\/custom-lib-location\/requirejs\/require\.js"/);
	});
});



	