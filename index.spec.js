var addressValidator = require('./index.js'),
	Address = addressValidator.Address;

var a = new Address({
	street: '100 North Washington St',
	city: 'Bostont',
	state: 'Mass',
	country: 'US'
});

describe('free limited version', function(){
	it('should work 20 times in a row', function(done){
		this.timeout(6000);

		var responseCount = 0,
			responseHandler = function(err, exact, inexact){
				if (inexact && inexact.length > 0){
					responseCount++;

					if (responseCount === 20){
						done();
					}
				} else {
					done('empty result');
				}
			};

		for (var i=0; i<20; i++){
			addressValidator.validate(a, addressValidator.match.streetAddress, responseHandler);
		}
	});
});
