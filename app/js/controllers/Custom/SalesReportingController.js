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



app.controller('salesReportingController', function ($scope, $http, $filter , $interval ,$state) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	$scope.StatusSearch == '';

	$scope.load = function () {
		
		//Reset Filter
		$scope.getList = [];
		console.log($scope.getList.length);
		$scope.TodayDate = new Date();
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		var msg = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"getSalesOrder\"  }";
		console.log(msg);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msg).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.getList = response.data[0][0];
				
				
			});
	}

	
	

	$scope.exportData = function () {
		
		$scope.queryExport = '';
		console.log($scope.StatusSearch);
		
		if ( $scope.StatusSearch == undefined ) {
			
			console.log("Normal filters");
			$scope.queryExport = 'SELECT Entry1 as Filename, formattedDate as Received_At, Entry3 as Processing_Date , formattedDate2 as TimeStamp , case when Entry2 = \'1\' then \'Processed\' else (\'Pending\') end as Status INTO XLSX("Report_GetDataProduction.xlsx",{}) FROM ? ' ;
		}
		else
		{
			console.log("advanced filters");
			$scope.queryExport = 'SELECT Entry1 as Filename, formattedDate as Received_At, Entry3 as Processing_Date , formattedDate2 as TimeStamp , case when Entry2 = \'1\' then \'Processed\' else (\'Pending\') end as Status INTO XLSX("Report_GetDataProduction_Filtred.xlsx",{}) FROM ? where Entry2 = \''+ $scope.StatusSearch + '\'   ' ;
			
		}
		


		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.getList]);
	};
	
	
	
	
	/*
	$scope.getdate = function () {

	    
		$scope.getList = null;
		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		var msg = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"getDataProduction\"  }";
		console.log(msg);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msg).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.getList = response.data[0][0];
				
				
			});	
		
		
	}
	*/
	
	
	

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



