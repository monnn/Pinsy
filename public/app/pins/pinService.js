app.factory('pinService', function($q, $http, $timeout, identity, PinResource) {

	function readFile(file) {
		var deferred = $q.defer();
		var fileReader = new FileReader();
		fileReader.addEventListener("load", function (event) {
			deferred.resolve(event.target.result);
		});
		fileReader.addEventListener("error", deferred.reject);
		fileReader.readAsDataURL(file);
		return deferred.promise;
	}
	return {
		createPin: function (pin) {
			var pin = new PinResource(pin);
			var deferred = $q.defer()
			pin.creator = identity.currentUser;
			console.log(pin.creator);
			pin.date = Date.now();
			
			var reading = $q.defer().resolve();
			if (pin.image) {
				reading = readFile(pin.image).then(function(newPinImage) {
					pin.image = newPinImage;
				})
			}
			if (pin.video) {
				reading = readFile(pin.video).then(function(newPinVideo) {
					pin.video = newPinVideo;
					// $sce.trustAsResourceUrl(pin.video);
				})
			}

			reading.then(function() {
				pin.$save().then(function (response) {
					deferred.resolve(response);
				}, function (response) {
					deferred.reject(response);
				})
			});
			
			return deferred.promise;
		}
	}
});