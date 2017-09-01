app.config(['$httpProvider', function ($httpProvider) {
	  //Reset headers to avoid OPTIONS request (aka preflight)
	
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	  $httpProvider.defaults.headers.prototype = {};
	  
	  
	
	  //$httpProvider.defaults.headers['Access-Control-Allow-Origin'] = '*'
	  //$httpProvider.defaults.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
	  //$httpProvider.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
	    
	}]); 

app.controller('EquipmentController', function($scope, $http, $filter ) {
	
	$scope.formattedDate;	
	$scope.mdRecordsArray = [];
	
	$scope.dateYesterday = new Date();
	console.log($scope.dateYesterday)
	$scope.dateYesterday.setDate($scope.dateYesterday.getDate() - 1);
	console.log($scope.dateYesterday)
	
	
	
				$scope.todayDate = new Date();
			    $scope.formattedDate = $filter('date')($scope.dateYesterday, "yyyyMMdd");
			    console.log($scope.formattedDate);
				
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate +  "\", \"msgType\":\"/CCEJ/EQUIPMENT\"   , \"Prefix\":\"Equipment\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
		        	console.log("");
					console.log(response);
					console.log(response.data);
					
					
				$scope.mdRecordsArray = response.data[0][0];
				console.log($scope.mdRecordsArray);
				
				$scope.ExpectedRecords = response.data[0][0].length;
				
				
				//$scope.QueryInsertedRow = jsonsql.query("select * from json where (Entry5=='0')", response.data[0][0]);
				$scope.insertedRow = response.data[0][0][0].Entry7;
				
				
			
				
				$scope.recordSynced =parseFloat( ($scope.insertedRow / $scope.ExpectedRecords ) * 100).toFixed(1) ;
				console.log($scope.recordSynced);
				
				//update instance after 1 sec
						setTimeout(function() {
							$('.chart').data('easyPieChart').update($scope.recordSynced);
						}, 1000);

		        	 
		        	});
	
	
	
	
		  
		  // Post Web CALL
		  $scope.postMessage = function() {
		        //var msg = document.getElementById('message').value;
			  	
		    }
			
			$scope.filterResult = '';
			
			$scope.FilterOnlySynced = function() {
		        $scope.filterResult = '0';
			  	
		    }
			
			$scope.FilterOnlyNotSynced = function() {
		        $scope.filterResult = '1';
			  	
		    }
			
			$scope.FilterAll = function() {
		        $scope.filterResult = '';
			  	
		    }
			
			/*
			jQuery.get('http://127.0.0.1:8080/app/testText.dat', function(data) {
				$scope.lines = data.split("\n").length;
				console.log($scope.lines)
			});
			*/
			
			
		  
		  
		  $scope.exportData = function () {
				 
				 $scope.queryExport = '';
			if($scope.filterResult == '')
				$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';
			else
				$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_Filtered.xlsx",{}) FROM ? where Entry5 = \''+$scope.filterResult+'\'';
		  
				 
				 console.log($scope.queryExport);
      alasql($scope.queryExport,[$scope.mdRecordsArray]);
  };
			
		  
			
		
});



app.controller('EquipmentPreviousController', function($scope, $http, $filter ) {
	
	$scope.formattedDate;	
	$scope.mdRecordsArray = [];
	$scope.showDiv = false;
	$scope.maxDate = new Date();
	/*
	$scope.dateYesterday = new Date();
	console.log($scope.dateYesterday)
	$scope.dateYesterday.setDate($scope.dateYesterday.getDate() - 1);
	console.log($scope.dateYesterday)
	*/
	
	$scope.dateYesterday = new Date();
	
	
	// Post Web CALL
	$scope.CallWebService = function () {
		
		$scope.mdRecordsArray = [];
		$scope.showDiv = true;

				console.log("Calendar seleced = " + $scope.todayDate);
				$scope.dateYesterday.setDate($scope.todayDate.getDate() - 1);
				console.log("Calendar yesterday = " + $scope.dateYesterday);
			    $scope.formattedDate = $filter('date')($scope.dateYesterday, "yyyyMMdd");
			    console.log($scope.formattedDate);
				
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate +  "\", \"msgType\":\"/CCEJ/EQUIPMENT\"   , \"Prefix\":\"Equipment\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
		        	console.log("");
					console.log(response);
					console.log(response.data);
					
					
				$scope.mdRecordsArray = response.data[0][0];
				console.log($scope.mdRecordsArray);
				
				$scope.insertedRow = response.data[0][0].length;
				
				
				//$scope.QueryInsertedRow = jsonsql.query("select * from json where (Entry5=='0')", response.data[0][0]);
				$scope.ExpectedRecords = response.data[0][0][0].Entry7;
				
				
			
				
				$scope.recordSynced =parseFloat( ($scope.insertedRow / $scope.ExpectedRecords ) * 100).toFixed(1) ;
				console.log($scope.recordSynced);
				
				//update instance after 1 sec
						setTimeout(function() {
							$('.chart').data('easyPieChart').update($scope.recordSynced);
						}, 1000);

		        	 
		        	});
		
		

	}
	
	
	
				
	
	
	
	
		  
		  // Post Web CALL
		  $scope.postMessage = function() {
		        //var msg = document.getElementById('message').value;
			  	
		    }
			
			$scope.filterResult = '';
			
			$scope.FilterOnlySynced = function() {
		        $scope.filterResult = '0';
			  	
		    }
			
			$scope.FilterOnlyNotSynced = function() {
		        $scope.filterResult = '1';
			  	
		    }
			
			$scope.FilterAll = function() {
		        $scope.filterResult = '';
			  	
		    }
			
			/*
			jQuery.get('http://127.0.0.1:8080/app/testText.dat', function(data) {
				$scope.lines = data.split("\n").length;
				console.log($scope.lines)
			});
			*/
			
			
		  
		  
		  $scope.exportData = function () {
				 
				 $scope.queryExport = '';
			if($scope.filterResult == '')
				$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';
			else
				$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_Filtered.xlsx",{}) FROM ? where Entry5 = \''+$scope.filterResult+'\'';
		  
				 
				 console.log($scope.queryExport);
      alasql($scope.queryExport,[$scope.mdRecordsArray]);
  };
			
		  
			
		
});