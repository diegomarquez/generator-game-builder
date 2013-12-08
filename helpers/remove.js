module.exports = function() {
	var rimraf = require('rimraf');

	return {
		remove: function(paths, cb, verbose) {
			if (paths.length == 0) {
				cb();
				return;
			}

			var path = paths.pop();
			var self = this;
			
			rimraf(path, function () {
				if(verbose) console.log('Removed ' + path);

       		 	self.remove(paths, cb);
		    });
		}
	}
}