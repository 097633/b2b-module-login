(function(){
'use strict';

angular.module('loginModule')
.controller('loginController', login);

login.$inject = ['$rootScope', 'storageFactory', 'loginFactory', 'regionsFactory', '$location'];

function login($rootScope, storageFactory, loginFactory, regionsFactory, $location) {
	
    /* jshint validthis: true */
    var vm = this;
    vm.login = loginUser;
    vm.reset = resetForm;
    vm.reset();
    $rootScope.hideNav = true;

    function resetForm(loginForm) {
        if (loginForm) {
            loginForm.$setPristine();
            loginForm.$setUntouched();
        }
    }

    function loginUser(user) {

        var creds = {
			userName: user.username,
			password: user.password
        };

        return loginFactory.loginUser(creds)
        .then(function (response) {
            storageFactory.setCreds(response);
            //vm.creds = creds;
            var storageCreds = storageFactory.getCreds();
            $rootScope.oauth = {};
            $rootScope.oauth.access_token = storageCreds.authToken;
            return regionsFactory.getRegions()
            .then(function (response){
                storageFactory.setRegions(response);
                $location.path('/home');
            });
        });
    }

}

})();