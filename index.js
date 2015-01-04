var addressValidator = require('address-validator'),
	oldValidate = addressValidator.validate.bind(addressValidator),
	requestQueue = [];

addressValidator.validate = function(){
	var args = Array.prototype.slice.call(arguments);
	requestQueue.push({args:args});
};

function proccessRequestQueue(){
	var done = setTimeout.bind(null, proccessRequestQueue, 1000/20), // 20 requests a second, i mean this is good enough atm
		job = requestQueue.shift();

	if (!job) return done();

	var cb = job.args.splice(-1)[0];
	job.args.push(function(){
		var args = Array.prototype.slice.call(arguments);
		cb.apply(this, args);
		done();
	});

	return oldValidate.apply(addressValidator, job.args);
}

proccessRequestQueue();

module.exports = addressValidator;


