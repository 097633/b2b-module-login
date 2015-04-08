(function(){
'use strict';

angular.module('loginModule')
.factory('loginFactory', loginFactory);

loginFactory.$inject = ['$http', 'baseUri', '$log', 'regionsFactory'];

function loginFactory($http, baseUri, $log, regionsFactory){
	
	var vm = this;
	var uri = baseUri+'/1.0/user/login';

	return {
		loginUser: loginUser
	};

	function loginUser(user) {
        return $http.post(uri, user)
        .then(loginUserComplete)
        .catch(loginUserFailed)
	}

	function loginUserComplete(response) {
		return response.data;
	}

	function loginUserFailed(error) {
		$log.error(error.data.description);
		return false;
	}
}

})();