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
	
	
	$scope.formattedDate;
	
	
				$scope.mdRecordsArray = [];
				
				$scope.todayDate = new Date();
			    $scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");
			    console.log($scope.formattedDate);
				
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate +  "\", \"msgType\":\"/CCEJ/SD_BL_PROF\"   , \"Prefix\":\"MDM\"  }";
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
				$scope.queryExport = 'SELECT Entry1 as IDoc_Number, Entry2 as Sales_Order_Number, Entry3 as Line_Item_Count, Entry4 as Slip_Number , Entry7 as Delivery_Date , case when Entry5 = \'N\' then \'Normal Order\' else \'Rush Order\' end as Type , case when Entry6 = \'1\' then \'Sent\' else \'Not Sent\' end as Status INTO XLSX("Report_Shipment.xlsx",{}) FROM ?';
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
	
	$scope.showLoading = true;

	$scope.load = function () {
		
		//Reset Filter
		$scope.filterRush = "";
		$scope.filterStatus = "";
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Proformat\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.showLoading = false;
				$scope.forCount = response.data[0][0];
				$scope.allMdRecords = response.data[0][0];
				$scope.truckStockList = response.data[0][0];
				//Count
				$scope.totalNumberOfIdocs = response.data[0][0].length;
				$scope.rushOrderNumber = (jsonsql.query("select * from json where (Entry5=='Y')", $scope.forCount)).length;
				$scope.notSentNumber = (jsonsql.query("select * from json where (Entry6==0)", $scope.forCount)).length;
				$scope.sentNumber = (jsonsql.query("select * from json where (Entry6==1)", $scope.forCount)).length;
				
				
 
			});
	}

	

		// Post Web CALL
		$scope.postMessage = function () {
		//var msg = document.getElementById('message').value;

	}

	$scope.filterResult = '';

	
	//Filter RushOrder
	$scope.filterRush = "";
	
	$scope.FilterRushOrder = function () {
		$scope.filterRush = "Y";
	}
	
	$scope.FilterNormalOrder = function () {
		$scope.filterRush = "N";
	}
	
	$scope.FilterAll = function () {
		$scope.filterRush = "";
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

		$scope.queryExport = 'SELECT Entry1 as IDoc_Number, Entry11 as Sales_Order_Number, Entry4 as Proformat_Number , Entry3 as Line_Item_Count , Entry7 as Delivery_Date , Entry12 as Plant, Entry13 as Route_Code , Entry8 as CMCRC_PLNT, Entry9 as CMCRC_RT, Entry10 as Driver , case when Entry5 = \'N\' then \'Normal Order\' else \'Rush Order\' end as Type , case when Entry6 = \'1\' then \'Sent\' else \'Not Sent\' end as Status INTO XLSX("Report_Shipment.xlsx",{}) FROM ?';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.truckStockList]);
	};
	
	
	$scope.getMonth = function () {
		
		$scope.filterRush = "";
		$scope.filterStatus = "";
		$scope.showLoading = true;
		
		$scope.totalNumberOfIdocs = 0;
		$scope.rushOrderNumber = 0;
		$scope.notSentNumber = 0;
		$scope.sentNumber = 0;
		$scope.truckStockList = [];
		
		

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"ProformatInterval\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.showLoading = false;
				$scope.forCount = response.data[0][0];
				$scope.allMdRecords = response.data[0][0];
				$scope.truckStockList = response.data[0][0];
				
				//Count
				$scope.totalNumberOfIdocs = response.data[0][0].length;
				$scope.rushOrderNumber = (jsonsql.query("select * from json where (Entry5=='Y')", $scope.forCount)).length;
				$scope.notSentNumber = (jsonsql.query("select * from json where (Entry6==0)", $scope.forCount)).length;
				$scope.sentNumber = (jsonsql.query("select * from json where (Entry6==1)", $scope.forCount)).length;
				

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