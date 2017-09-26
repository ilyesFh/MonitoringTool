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

app.controller('PricingController', function($scope, $http, $filter ) {

	$scope.MysqlRecords;
	$scope.MysqlRecords;
	$scope.allMdRecords
	$scope.formattedDate;
	$scope.percentage;
	$scope.todayDate = new Date();



	$scope.options = {
            animate:false,
            barColor:'#2C3E50',
            scaleColor:false,
            lineWidth:20,
            lineCap:'circle'
        };

	$scope.load = function () {
        console.log("load event detected!");

		$scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");

			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Pricing\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);

					$scope.mdRecordsArray = response.data[0][0];
					$scope.allMdRecords = response.data[0][0];
					$scope.MysqlRecords = response.data[0][0].length;
					$scope.QueryNotMatching = jsonsql.query("select * from json where (Entry2==Entry3)", response.data[0][0]);
					$scope.missingRows = $scope.QueryNotMatching.length;
					console.log($scope.missingRows);
					$scope.percentage = parseFloat(( $scope.missingRows / $scope.MysqlRecords ) * 100).toFixed(1);
					console.log($scope.percentage);

					//console.log($('#aa').get(0).id);

					//update instance after 1 sec
						setTimeout(function() {
							$('.chart').data('easyPieChart').update($scope.percentage);
						}, 1000);




					});
    }


			$scope.CalculateLasSynch = function () {



			}







			$scope.optionsChart = "{ easing: 'easeOutBounce', barColor: 'orange', trackColor: '#f5f5f5', scaleColor: '#eaeaea', lineCap: 'square', lineWidth: 15, size: 130,animate: 1000,percent: 66.7 }"




		  // Post Web CALL
		  $scope.postMessage = function() {
		        //var msg = document.getElementById('message').value;

		    }

			$scope.filterResult = '';

			$scope.FilterOnlySynced = function() {
				 $scope.mdRecordsArray = $scope.allMdRecords;
		        $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2==Entry3)", $scope.mdRecordsArray);

		    }

			$scope.FilterOnlyNotSynced = function() {
				console.log("Filter Not Synced");
			   $scope.mdRecordsArray = $scope.allMdRecords;
		       $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2!=Entry3)", $scope.mdRecordsArray);

		    }

			$scope.FilterAll = function() {

				console.log($('#aa').get(0));


		        $scope.mdRecordsArray = $scope.allMdRecords;

		    }

			/*
			jQuery.get('http://127.0.0.1:8080/app/testText.dat', function(data) {
				$scope.lines = data.split("\n").length;
				console.log($scope.lines)
			});
			*/


			 $scope.exportData = function () {


				$scope.queryExport = 'SELECT Entry1 as Interface_Name, Entry2 as File_Count, Entry3 as Records_in_MYSQL, case when Entry2 = Entry3 then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';



				 console.log($scope.queryExport);
      alasql($scope.queryExport,[$scope.mdRecordsArray]);
  };







});


app.controller('PreviousDayPricingController', function ($scope, $http, $filter, uibDateParser) {

	$scope.showDiv = false;
	$scope.maxDate = new Date();
	
	

	// Post Web CALL
	$scope.CallWebService = function () {

		$scope.showDiv = true;

		console.log("load event detected!");

		$scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");

			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Pricing\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					//$scope.showLoading = false;
					console.log(response.data[0][0]);

					$scope.mdRecordsArray = response.data[0][0];
					$scope.allMdRecords = response.data[0][0];
					$scope.MysqlRecords = response.data[0][0].length;
					$scope.QueryNotMatching = jsonsql.query("select * from json where (Entry2==Entry3)", response.data[0][0]);
					$scope.missingRows = $scope.QueryNotMatching.length;
					console.log($scope.missingRows);
					$scope.percentage = parseFloat(( $scope.missingRows / $scope.MysqlRecords ) * 100).toFixed(1);
					console.log($scope.percentage);

					//console.log($('#aa').get(0).id);

					//update instance after 1 sec
						setTimeout(function() {
							$('.chart').data('easyPieChart').update($scope.percentage);
						}, 1000);




					});

	}

	$scope.filterResult = '';

			$scope.FilterOnlySynced = function() {
				 $scope.mdRecordsArray = $scope.allMdRecords;
		        $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2==Entry3)", $scope.mdRecordsArray);

		    }

			$scope.FilterOnlyNotSynced = function() {
				console.log("Filter Not Synced");
			   $scope.mdRecordsArray = $scope.allMdRecords;
		       $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2!=Entry3)", $scope.mdRecordsArray);

		    }

			$scope.FilterAll = function() {

				console.log($('#aa').get(0));


		        $scope.mdRecordsArray = $scope.allMdRecords;

		    }

	$scope.exportData = function () {


			$scope.queryExport = 'SELECT Entry1 as Interface_Name, Entry2 as File_Count, Entry3 as Records_in_MYSQL, case when Entry2 = Entry3 then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';


		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.mdRecordsArray]);
	};

});


app.controller('PriceValidationController', function ($scope, $http, $filter , $state) {


	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	$scope.mdRecordsArray = [];

	$scope.showLoading = true;
	
	$scope.matchCount = 0;
	$scope.notMatchCount = 0;
	$scope.errorSapCount = 0;
	$scope.errorBridgeCount = 0;
	
	

	$scope.load = function () {


		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"PriceValidation\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				$scope.showLoading = false;
				console.log(response.data[0][0]);
				$scope.mdRecordsArray = response.data[0][0];
				$scope.allMdRecords = response.data[0][0];
				
				$scope.matchCount = response.data[0][0][0].Entry20;
				$scope.notMatchCount = jsonsql.query("select * from json where (Entry16==3)", $scope.mdRecordsArray).length;
				$scope.errorSapCount = jsonsql.query("select * from json where (Entry16=='E')", $scope.mdRecordsArray).length;
				$scope.errorBridgeCount = jsonsql.query("select * from json where (Entry16==0)", $scope.mdRecordsArray).length;
	
				
			});
	}


	$scope.filterResult = '';

	$scope.FilterOnlySynced = function () {
		$scope.mdRecordsArray = $scope.allMdRecords;
		$scope.mdRecordsArray = jsonsql.query("select * from json where (Entry16==2)", $scope.mdRecordsArray);

	}

	$scope.FilterOnlyNotSynced = function () {
		console.log("Filter Not Synced");
		$scope.mdRecordsArray = $scope.allMdRecords;
		$scope.mdRecordsArray = jsonsql.query("select * from json where (Entry16==3)", $scope.mdRecordsArray);

	}

	$scope.FilterAll = function () {

		$scope.mdRecordsArray = $scope.allMdRecords;

	}
	
	$scope.FilterMissingBridgeTable = function () {
		$scope.mdRecordsArray = $scope.allMdRecords;
		$scope.mdRecordsArray = jsonsql.query("select * from json where (Entry16=='0')", $scope.mdRecordsArray);

	}
	
	$scope.FilterErrorSAP = function () {
		$scope.mdRecordsArray = $scope.allMdRecords;
		$scope.mdRecordsArray = jsonsql.query("select * from json where (Entry16=='E')", $scope.mdRecordsArray);

	}
	
	

	$scope.exportData = function () {

		$scope.queryExport = 'SELECT Entry17 as Transaction_Id, Entry6 as Item_No , Entry5 as Delivery_Date , Entry15 as Sold_To_JS,  Entry14 as Sold_To_C1, Entry13 as Ship_To_JS , Entry12 as Ship_To_C1 , Entry10 as Material_JS , Entry9 as Material_C1, Entry19 as Sales_Unit_JS , Entry11 as Sales_Unit_C1 ,Entry4 as Customer_Type , Entry8 as Unit_Price_JS , Entry7 as Unit_Price_C1 ,   case when Entry16 = "2" then \'Price Match\' else ( case when Entry16 = "3" then \'Price Not Match \' else ( case when Entry16 = "E" then \'SAP Error \' else \'Bridge Table Error\' end) end ) end as Status , Entry18 as SAP_Error_Details , Entry21 as Price_Date , Entry22 as Compare_Date , Entry23 as YJR3_YJR9_Price, Entry24 as YJR3_YJR9 INTO XLSX("Report_Price_Validation.xlsx",{}) FROM ?';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.mdRecordsArray]);
	};

	$scope.openDetails = function (x) {

		//alert("DETAILS  "+ x.Entry1);
		$state.go("app.tables.ErrorDetails", { "id": x.Entry1})


	};

	$scope.getMonth = function () {

		$scope.mdRecordsArray = [];

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);


		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Pricing_Bolton\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

				$scope.mdRecordsArray = response.data[0][0];
				$scope.allMdRecords = response.data[0][0];
				$scope.MysqlRecords = response.data[0][0].length;
				$scope.QueryNotMatching = jsonsql.query("select * from json where (Entry2==Entry3)", response.data[0][0]);
				$scope.missingRows = $scope.QueryNotMatching.length;
				console.log($scope.missingRows);
				$scope.percentage = parseFloat(($scope.missingRows / $scope.MysqlRecords) * 100).toFixed(1);
				console.log($scope.percentage);



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


		