app.controller('loginController', function(angularAuth0 , $scope, $http) {
 
  
  //angularAuth0.authorize();
  
  $scope.openLogin = function() {
		       console.log("Begin Login");
			   angularAuth0.authorize();
			  	
		    }
  
  
  
});