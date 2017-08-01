(function() {
    'use strict';

    

    app.controller('DataTablesCtrl', function($scope , $http ,  $filter , $timeout) {
		
		
		
		
		

		$scope.postMessage = function() {
			
			console.log("-- Begin Error Chart");
				$scope.formattedDate = $filter('date')($scope.DeliveryDate, "yyyy-MM-dd");
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					
					});

		
		}

		
		console.log("-- Begin Error Chart");
		$scope.formattedDate = $filter('date')($scope.DeliveryDate, "yyyy-MM-dd");
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					$scope.recordsOfToday = response.data[0][0] ; 
					$scope.resultOfToday = jsonsql.query("select * from json where (Entry2=='"+$scope.selectedSystem+"')", response.data[0][0]);
					console.log($scope.resultOfToday);
					
					
				$scope.st0 = jsonsql.query("select * from json where (Entry8=='0')", response.data[0][0]).length;
				$scope.st1 = jsonsql.query("select * from json where (Entry8=='1')", response.data[0][0]).length;
				$scope.st2 = jsonsql.query("select * from json where (Entry8=='2')", response.data[0][0]).length;
				$scope.st3 = jsonsql.query("select * from json where (Entry8=='3')", response.data[0][0]).length;
				$scope.st4 = jsonsql.query("select * from json where (Entry8=='4')", response.data[0][0]).length;
				$scope.st5 = jsonsql.query("select * from json where (Entry8=='5')", response.data[0][0]).length;
				$scope.st6 = jsonsql.query("select * from json where (Entry8=='6')", response.data[0][0]).length;
				console.log($scope.st0 , $scope.st1 ,$scope.st2 , $scope.st3 ,$scope.st4 ,$scope.st5 , $scope.st6);	
				var totalSalesO = $scope.st0 + $scope.st1 +$scope.st2 + $scope.st3 +$scope.st4 +$scope.st5 + $scope.st6
				
				$scope.myOptions = {
			       options: {
						title: {
							display: true,
							text: 'Custom Chart Title'
						}
					}
			    }
				
				
				$scope.labels = ['Created In Bolton', 'In Progress', 'Sent To SAP' , 'Error-Sent To SAP', 'Processed', 'Not Processed' , 'Idoc Released'];
				$scope.data = [$scope.st0, $scope.st1, $scope.st2 , $scope.st3 ,$scope.st4 , $scope.st5 , $scope.st6];
				$scope.colours = [{ // grey
						fillColor: "rgba(255,110,64,1)",
						strokeColor: "rgba(255,110,64,1.0)",
						highlightFill: "rgba(255,110,64,1.0)",
						highlightStroke: "rgba(255,110,64,1)"
				}, { // dark grey
						fillColor: "rgba(103,58,183,1.0)",
						strokeColor: "rgba(103,58,183,1.0)",
						highlightFill: "rgba(103,58,183,1.0)",
						highlightStroke: "rgba(103,58,183,1.0)"
				}, { // dark grey
						fillColor: "rgba(253,216,53,1.0)",
						strokeColor: "rgba(253,216,53,1.0)",
						highlightFill: "rgba(253,216,53,1.0)",
						highlightStroke: "rgba(253,216,53,1.0)"
				}];
				
				
				
				$scope.showChart = true;
					
				});

		
		}
		
		
        
        
    });

    

    

})();
