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



app.controller('SettlementController', function ($scope, $http, $filter , $interval ,$state) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	$scope.HokanFilesCount = 0;
	
	$scope.total = 0;
	$scope.pending = 0;
	$scope.errorSentToSap = 0;
	$scope.errorInSap = 0;
	$scope.sentTopSap = 0;
	$scope.processed = 0;
	
	$scope.processed = 0;
	$scope.StatusSearch;
	
	$scope.counter = 1;
	$scope.refreshedDate;
	
	
	
	$scope.countProgressBar = function() {
		++$scope.counter;

		if ( $scope.counter == 100)
		{ $scope.counter = 0; }

	}
	
	



			$scope.$on('$destroy',function(){
				$interval.cancel($scope.intrvl);
			});

			$scope.$on('$destroy',function(){
				$interval.cancel($scope.intrvl2);
			});
	
	
	$scope.filterStatusFunction = function (param) {
		$scope.StatusSearch = param;
		console.log($scope.StatusSearch);
	}
	
	
	$scope.load = function () {
		
		//Reset Filter
		$scope.filterRush = "";
		$scope.filterStatus = "";
		$scope.SettlementList = [];
		console.log($scope.SettlementList.length);
		$scope.TodayDate = new Date();
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		$scope.refreshedDate = $filter('date')($scope.TodayDate, "yyyy/MM/dd HH:mm:ss");
		console.log($scope.refreshedDate);
		
		//get Hokan Files
		var msgHokan = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"HokanFiles\"  }";
		console.log(msgHokan);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgHokan).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.HokanFilesCount = response.data[0][0].length;
				

			});
		
		
		console.log("load event detected!");
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Settlement\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.allRecords = response.data[0][0];
				$scope.SettlementList = response.data[0][0];
				$scope.total = $scope.allRecords.length;
				$scope.inProgress = jsonsql.query("select * from json where ( Entry8=='1' )", $scope.allRecords).length;
				$scope.pendingInQueue = jsonsql.query("select * from json where ( Entry8=='9' )", $scope.allRecords).length;
				$scope.pendingInBoomi = jsonsql.query("select * from json where ( Entry8=='E' )", $scope.allRecords).length;
				$scope.errorSentToSap = jsonsql.query("select * from json where ( Entry8=='3')", $scope.allRecords).length;
				$scope.errorInSap = jsonsql.query("select * from json where ( Entry8=='51')", $scope.allRecords).length;
				$scope.sentTopSap = jsonsql.query("select * from json where ( Entry8=='2')", $scope.allRecords).length;
				$scope.processed = jsonsql.query("select * from json where ( Entry8=='53')", $scope.allRecords).length;

			}); 
	}



	$scope.filterCorrection = '';

	// correction Filter
	$scope.FilterCorrection = function () {
		$scope.filterCorrection = "1";
	}
	
	$scope.FilterNoCorrection = function () {
		$scope.filterCorrection = "0";
	}
	
	$scope.FilterAll = function () {
		$scope.filterCorrection = '';
	}
	
	
	

	//Status Filter
	$scope.FilterError = function () {
		$scope.SettlementList = $scope.allRecords;
		$scope.SettlementList = jsonsql.query("select * from json where ( Entry8=='3')", $scope.allRecords);
	}
	
	$scope.FilterSuccess = function () {
		$scope.SettlementList = $scope.allRecords;
		$scope.SettlementList = jsonsql.query("select * from json where (Entry8=='2' || Entry8=='4')", $scope.allRecords);
	}
	
	$scope.FilterPending = function () {
		console.log("Pending filter");
		$scope.SettlementList = $scope.allRecords;
		$scope.SettlementList = jsonsql.query("select * from json where (Entry8=='1' || Entry8=='9')", $scope.allRecords);
	}
	
	$scope.FilterAllStatus = function () {
		$scope.SettlementList = $scope.allRecords;
	}
	
	
	
	

	$scope.exportData = function () {
		
		$scope.queryExport = '';
		
		if ( $scope.StatusSearch == '') {
			
			$scope.queryExport = 'SELECT Entry2 as Route, Entry3 as Plant, Entry4 as Date , Entry11 as FileName , case when Entry8 = \'1\' then \'Pending\' else ( case when Entry8 = \'2\' then \'Idoc Sent To SAP \' else  ( case when Entry8 = \'3\' then \'Error Sending To SAP\' else ( case when Entry8 = \'51\' then \'Error In SAP\' else ( case when Entry8 = \'53\' then \'Processed\' else \'Pending In Queue\'  end )  end )  end )  end ) end as Status , case when Entry10 = \'1\' then \'Corrected\' else \'Not Corrected\' end as Correction , Entry15 as Idoc_Number , formattedDate2 as Received_Date , formattedDate3 as Start_Processing , formattedDate4 as End_Processing , formattedDate as Last_Update INTO XLSX("Report_Settlement.xlsx",{}) FROM ? ' ;
		}
		else
		{
			$scope.queryExport = 'SELECT Entry2 as Route, Entry3 as Plant, Entry4 as Date , Entry11 as FileName , case when Entry8 = \'1\' then \'Pending\' else ( case when Entry8 = \'2\' then \'Idoc Sent To SAP \' else  ( case when Entry8 = \'3\' then \'Error Sending To SAP\' else ( case when Entry8 = \'51\' then \'Error In SAP\' else ( case when Entry8 = \'53\' then \'Processed\' else \'Pending In Queue\'  end )  end )  end )  end ) end as Status , case when Entry10 = \'1\' then \'Corrected\' else \'Not Corrected\' end as Correction , Entry15 as Idoc_Number , formattedDate2 as Received_Date , formattedDate3 as Start_Processing , formattedDate4 as End_Processing , formattedDate as Last_Update INTO XLSX("Report_Settlement.xlsx",{}) FROM ? where Entry8 = \''+ $scope.StatusSearch + '\'   ' ;
			
		}
		


		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.SettlementList]);
	};
	
	
	
	
	$scope.getdate = function () {

	    
		$scope.SettlementList = null;
		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		//get Hokan Files
		var msgHokan = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"HokanFiles\"  }";
		console.log(msgHokan);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgHokan).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.HokanFilesCount = response.data[0][0].length;
				

			});
		
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Settlement\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

				$scope.allRecords = response.data[0][0];
				$scope.SettlementList = response.data[0][0];
				$scope.total = $scope.allRecords.length;
				$scope.inProgress = jsonsql.query("select * from json where ( Entry8=='1' )", $scope.allRecords).length;
				$scope.pendingInQueue = jsonsql.query("select * from json where ( Entry8=='9' )", $scope.allRecords).length;
				$scope.pendingInBoomi = jsonsql.query("select * from json where ( Entry8=='E' )", $scope.allRecords).length;
				$scope.errorSentToSap = jsonsql.query("select * from json where ( Entry8=='3')", $scope.allRecords).length;
				$scope.errorInSap = jsonsql.query("select * from json where ( Entry8=='51')", $scope.allRecords).length;
				$scope.sentTopSap = jsonsql.query("select * from json where ( Entry8=='2')", $scope.allRecords).length;
				$scope.processed = jsonsql.query("select * from json where ( Entry8=='53')", $scope.allRecords).length;
				
				

			});
			
		
		
	}
	
	
	$scope.intrvl = $interval($scope.load , 120000);
	$scope.intrvl2 = $interval($scope.countProgressBar , 1200);
	

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


app.controller('LoadInboundController', function ($scope, $http, $filter , $state) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	
	$scope.HokanFilesCount = 0;
	

	$scope.load = function () {
		
		//Reset Filter
		$scope.filterRush = "";
		$scope.filterStatus = "";
		$scope.SettlementList = [];
		console.log($scope.SettlementList.length);
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		//get Hokan Files
		var msgHokan = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"HokanFiles\"  }";
		console.log(msgHokan);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgHokan).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.HokanFilesCount = response.data[0][0].length;
				

			});
		
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Load\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

				$scope.allRecords = response.data[0][0];
				$scope.SettlementList = response.data[0][0];
				

			});
	}



	$scope.filterCorrection = '';

	// correction Filter
	$scope.FilterCorrection = function () {
		$scope.filterCorrection = "1";
	}
	
	$scope.FilterNoCorrection = function () {
		$scope.filterCorrection = "0";
	}
	
	$scope.FilterAll = function () {
		$scope.filterCorrection = '';
	}
	
	
	
		/*
	//Status Filter
	$scope.FilterError = function () {
		$scope.SettlementList = $scope.allRecords;
		$scope.SettlementList = jsonsql.query("select * from json where ( Entry9=='3')", $scope.allRecords);
	}
	
	$scope.FilterSuccess = function () {
		$scope.SettlementList = $scope.allRecords;
		$scope.SettlementList = jsonsql.query("select * from json where (Entry9=='2' || Entry9=='4')", $scope.allRecords);
	}
	
	$scope.FilterPending = function () {
		$scope.SettlementList = $scope.allRecords;
		$scope.SettlementList = jsonsql.query("select * from json where (Entry9=='1' || Entry9=='9')", $scope.allRecords);
	}
	
	$scope.FilterAllStatus = function () {
		$scope.SettlementList = $scope.allRecords;
	}
	
	*/
	
	

	$scope.exportData = function () {
		
		$scope.queryExport = '';
		if($scope.filterCorrection == '')
			$scope.queryExport = 'SELECT Entry1 as Name, Entry2 as Route, Entry3 as Plant, Entry4 as Date , Entry7 as FileName , case when Entry5 = \'1\' then \'Boomi Error\' else ( case when Entry5 = \'2\' then \'idoc Sent\' else  ( case when Entry5 = \'3\' then \'SAP Error\' else \'Processed\'  end )  end ) end as Type , case when Entry6 = \'1\' then \'Corrected\' else \'Not Corrected\' end as Status INTO XLSX("Report_Settlement.xlsx",{}) FROM ?';
		else
			$scope.queryExport = 'SELECT Entry1 as Name, Entry2 as Route, Entry3 as Plant, Entry4 as Date , Entry7 as FileName , case when Entry5 = \'1\' then \'Boomi Error\' else ( case when Entry5 = \'2\' then \'idoc Sent\' else  ( case when Entry5 = \'3\' then \'SAP Error\' else \'Processed\'  end )  end ) end as Type , case when Entry6 = \'1\' then \'Corrected\' else \'Not Corrected\' end as Status INTO XLSX("Report_Settlement.xlsx",{}) FROM ? where Entry6 = \'' + $scope.filterCorrection + '\'' ;
			

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.SettlementList]);
	};
	
	
	$scope.getdate = function () {

	    
		$scope.SettlementList = null;
		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		//get Hokan Files
		var msgHokan = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"HokanFiles\"  }";
		console.log(msgHokan);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgHokan).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.HokanFilesCount = response.data[0][0].length;
				

			});
		
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Load\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

				$scope.allRecords = response.data[0][0];
				$scope.SettlementList = response.data[0][0];
				

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


app.controller('settlementControllerCorrection', function($scope , $http ,  $filter , $timeout , $state , $log ) {
	

	
    $scope.ResetSettlement = function() {
		console.log("Call Reset");
		$scope.XmlSettlement = "<settlement_update><fileName>"+$scope.fieldFileName+"</fileName><reason>"+$scope.fieldReason+"</reason></settlement_update>"
		console.log($scope.XmlSettlement);
		
		var msgdata = $scope.XmlSettlement;
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getSettlement;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(success);

			});
		
      
    }
});
