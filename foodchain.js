var child_process = require('child_process');

process.argv.forEach(function (val, index, array) {
	if (index == 0 || index == 1)
		return;

	if(val == '--help' || val == '-h') {
		console.log('Foodchain 0.0.1');
		console.log('Author Vu Bui\n');
		console.log('Foodchain help list all description of a npm package and all dependencies of this.\n');  	

		console.log('node foodchain [name of package]');
		console.log('ex: node foodchain express\n\n');
		return;
	}

	var package = val;

	showInfo('package', package);
	var dependencies = 'npm view ' + package +' dependencies';

	child_process.exec(dependencies, function(error, stdout, stderr) {
	  result = stdout.replace(/[@&\/\\#+()$~%.'"*?<>{} \n]/g,'');
	  var result = result.split(',');
	  result.forEach(function(item, index) {
	  	dependencie = item.split(':')[0];
		showInfo('dep', dependencie);
	  });

	});

	function showInfo(type, name) {
		var description = 'npm view ' + name +' description';
		
		child_process.exec(description, function(error, stdout, stderr) {
			if(error){

			} else {
			  console.log(type + ': ' + name);
			  console.log(stdout);
			}
		});
	}

});


