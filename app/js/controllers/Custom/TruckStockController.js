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

		}
	]);

app.controller('TruckStockController', function ($scope, $http, $filter , $state) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	
	$scope.map = { center: { latitude: 35.652832, longitude: 139.839478 }, zoom: 10 };
	//$scope.bounds = { northeast : { latitude: 71.7593, longitude: -26.5791 }, southwest : { latitude: -0.6621, longitude: -158.4150 } };
	
	/*
  $scope.markers = [
    {
      "id": "0",
      "coords": {
        "latitude": "35.628738",
        "longitude": "139.690000"
      },
      "window": {
        "title": "JW71"
      },
	  options: { draggable: false,
      icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
	  
      
    },
    {
      "id": "1",
      "coords": {
        "latitude": "35.698793",
        "longitude": "139.623785"
      },
      "window" : {
        "title": "JW64"
      }
    }
  ];
  
  */
	
	//$scope.markers = Markers;
	
	$scope.circles = [
            {
                id: 1,
                center: {
                    latitude: 35.6868793,
                    longitude: 139.738811
                },
                radius: 15000,
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 0.2
                },
                fill: {
                    color: 'black',
                    opacity: 0.1
                },
                geodesic: true, // optional: defaults to false
                draggable: false, // optional: defaults to false
                clickable: false, // optional: defaults to true
                editable: false, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            }
        ];
	

	

	$scope.load = function () {
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMM");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"TruckStock\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);
				$scope.allMdRecords = response.data[0][0];
				$scope.truckStockList = response.data[0][0];
				
				//$scope.yesterday = $scope.TodayDate - 1;
				//Web Service Call For Map
				$scope.yesterday = "20171115"
				$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
				var msgdata = "{\"Var1\": " + "\"" + $scope.yesterday + "\", \"Prefix\":\"TruckStockMap\"  }";
				var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
					then(function (response) {
					console.log(response.data[0]);
					$scope.markers = response.data[0];
					
					});

			});
	}


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
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMM");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"TruckStock\"  }";
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

