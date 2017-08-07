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

app.controller('ShipmentController', function($scope, $http, $filter ) {
	
	$scope.message = "Marouen" ; 
	$scope.fieldValue;
	$scope.jsonArray;
	$scope.DeliveryDate;
	$scope.CreationStartDate;
	$scope.CreationEndDate;
	$scope.syncResultBool = false;
	$scope.formattedDate;
	
	
	
				$scope.todayDate = new Date();
			    $scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");
			    console.log($scope.formattedDate);
				
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate +  "\", \"msgType\":\"/CCEJ/MATMAS\"   , \"Prefix\":\"MDM\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
		        	console.log("");
					console.log(response);
					console.log(response.data);
					
					
				$scope.mdRecordsArray = response.data[0][0];
				console.log($scope.mdRecordsArray);
				
				$scope.ExpectedRecords = response.data[0][0].length;
				
				
				$scope.QueryInsertedRow = jsonsql.query("select * from json where (Entry5=='0')", response.data[0][0]);
				$scope.insertedRow = $scope.QueryInsertedRow.length;
				
				
			
				
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
			
			
		  $scope.CountLine = function() {
		        
				$scope.formattedDate = "20170721 000000";
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate +  " \", \"msgType\":\"MATMAS\"  " + "\", \"Prefix\":\"fileToTvoss\"  }";
				
				
				
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
		        	console.log("");
					console.log(response);
					console.log(response.data[0][0].Count);
				});
			  	
		    }
		  
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

app.controller('ShipmentDetailsController', function ($scope, $http, $filter , $state) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	

	$scope.options = {
		animate: false,
		barColor: '#2C3E50',
		scaleColor: false,
		lineWidth: 20,
		lineCap: 'circle'
	};

	$scope.load = function () {
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Proformat\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

				$scope.allMdRecords = response.data[0][0];
				$scope.truckStockList = response.data[0][0];
				

			});
	}

	$scope.optionsChart = "{ easing: 'easeOutBounce', barColor: 'orange', trackColor: '#f5f5f5', scaleColor: '#eaeaea', lineCap: 'square', lineWidth: 15, size: 130,animate: 1000,percent: 66.7 }"

		// Post Web CALL
		$scope.postMessage = function () {
		//var msg = document.getElementById('message').value;

	}

	$scope.filterResult = '';

	$scope.FilterOnlyCorrected = function () {
		$scope.truckStockList = $scope.allMdRecords;
		$scope.truckStockList = jsonsql.query("select * from json where (Entry6>0)", $scope.truckStockList);

	}

	$scope.FilterOnlyNotCorrected = function () {
		$scope.truckStockList = $scope.allMdRecords;
		$scope.truckStockList = jsonsql.query("select * from json where (Entry6==0)", $scope.truckStockList);

	}

	$scope.FilterAll = function () {
		$scope.truckStockList = $scope.allMdRecords;

	}

	//Sent to Hokan Filter
	
	
	$scope.FilterOnlyNotSent = function () {
		$scope.filterStatus = "0";
	}
	
	$scope.FilterOnlySent = function () {
		$scope.filterStatus = "1";
	}
	
	$scope.FilterAllStatus = function () {
		$scope.filterStatus = "";
	}
	
	

	$scope.exportData = function () {

		$scope.queryExport = 'SELECT Entry1 as Date, case when Entry2 = \'1\' then \'Received\' else \'Not_Received\' end as Plant_JW71, case when Entry3 = \'1\' then \'Received\' else \'Not_Received\' end as Plant_JW64, case when Entry4 = \'1\' then \'Sent\' else \'Not_Sent\' end as Sent_To_New_Hokan ,case when Entry6 = \'0\' then \'No Correction\' else \'Corrected\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.truckStockList]);
	};
	
	
	$scope.getMonth = function () {

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Proformat\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

				$scope.allMdRecords = response.data[0][0];
				$scope.truckStockList = response.data[0][0];
				

			});
		
	}
	
	

	// Calendar
	
$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

$scope.dtpick = {
        opened: false,
        opened2: false
      }

  $scope.open = function($event,type) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dtpick[type] = true;
  };

  $scope.dateOptions = {
    datepickerMode : 'month',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
	

});