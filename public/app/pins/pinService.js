app.factory('pinService', function($q, $http, $timeout, identity, PinResource) {
	function uploadFile(file) {
		var deferred = $q.defer();
		$http.get('/uploadToken')
		.success(function(response) {
			var accessToken = response.accessToken,
				dbx = new Dropbox({ accessToken: accessToken });

			dbx.filesUpload({path: '/' + file.name, contents: file})
				.then(function(response) {
					var uploadedImage = dbx.sharingCreateSharedLinkWithSettings({
						"path": response.path_display,
						"settings": {
							"requested_visibility": "public"
						}
					});
					deferred.resolve(uploadedImage)
				})
				.catch(function(error) {
				  console.error(error);
				});
		})
		.error(function(error) {
			console.log(error);
		});
	  	return deferred.promise;
	}

	return {
		createPin: function (pinData) {
			var pin = new PinResource(pinData),
				deferred = $q.defer();
			pin.creator = identity.currentUser;
			pin.date = Date.now();

			var uploading = $q.defer().resolve();
			if (pin.image) {
				uploading = uploadFile(pin.image).then(function(uploadedImage) {
					var directImageLink = uploadedImage.url.replace('dl=0', 'raw=1');
					pin.image = directImageLink;
				})
			}

			uploading.then(function() {
				pin.$save().then(function(response) {
					deferred.resolve(response);
				}, function(response) {
					deferred.reject(response);
				});
			});
			return deferred.promise;
		}
	}
});