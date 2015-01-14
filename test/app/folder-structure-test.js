describe('game-builder', function () {
  
	describe('default options', function() {
		before(function (done) {

			helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
	      if (err) {
	        done(err);
	        return;
	      }

	      this.app = helpers.createGenerator('game-builder:app', [
	        '../../../app'
	      ]);

	      this.app.options['skip-install'] = true;

	      done();
	    }.bind(this));
	  });

	  // name: "name", String
   //  name: "width", Number
   //  name: "height", Number
   //  name: 'defaultGeneration', Confirm
   //  name: "frameworkTag", String
   //  name: "frameworkLocation", String
   //  name: "libLocation", String
   //  name: "additionalPaths", Confirm
   //  name: 'additionalSrcPaths', String
   //  name: "additionalAssetPaths", String

	  it('generates package.json', function (done) {

	  	var expected = [
	      'package.json'
	    ];

	    helpers.mockPrompt(this.app, {
	      'name': 'my game',
	      'width': 400,
	      'height': 300,
	      'defaultGeneration': true
	    });

	    this.app.run({}, function () {
	      helpers.assertFile(expected);

	      helpers.assertFileContent('package.json', /"name": "my game"/);
	      done();
	    });
	  });
	});
});