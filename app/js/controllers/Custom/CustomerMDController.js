app.config(['$httpProvider', function ($httpProvider) {
			//Reset headers to avoid OPTIONS request (aka preflight)

			$httpProvider.defaults.headers.common = {};
			$httpProvider.defaults.headers.post = {};
			$httpProvider.defaults.headers.put = {};
			$httpProvider.defaults.headers.patch = {};
			$httpProvider.defaults.headers.prototype = {};

			$httpProvider.defaults.headers['Access-Control-Allow-Origin'] = '*'
			$httpProvider.defaults.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
			$httpProvider.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

		}
	]);

app.controller('CustomerController', function ($scope, $http, $filter) {

	$scope.message = "Marouen";
	$scope.fieldValue;
	$scope.jsonArray;
	$scope.DeliveryDate;
	$scope.CreationStartDate;
	$scope.CreationEndDate;
	$scope.syncResultBool = false;
	$scope.formattedDate;
	$scope.mdRecordsArray = [];
	
	$scope.countAll = 0;
	$scope.countSynced = 0;
	$scope.countNotSynced = 0;
	$scope.countPending = 0;

	console.log("--1");
	$scope.todayDate = new Date();
	$scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");
	var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"msgType\":\"/CCEJ/DEBMAS_FULL\"   , \"Prefix\":\"MDM\"  }";
	console.log(msgdata);
	var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
		then(function (response) {
			console.log("");
			console.log(response);
			console.log(response.data);

			$scope.mdRecordsArray = response.data[0][0];
			console.log($scope.mdRecordsArray);

			$scope.ExpectedRecords = response.data[0][0].length;

			$scope.QueryInsertedRow = jsonsql.query("select * from json where (Entry5=='0')", response.data[0][0]);
			$scope.insertedRow = $scope.QueryInsertedRow.length;

			$scope.recordSynced = parseFloat(($scope.insertedRow / $scope.ExpectedRecords) * 100).toFixed(1);
			$scope.tofixed2 = parseFloat(($scope.insertedRow / $scope.ExpectedRecords) * 100).toFixed(3);
			
			if ( $scope.recordSynced ==100 && $scope.tofixed2 < 100) {
				$scope.recordSynced = 99.9
			}
			
			$scope.countAll = $scope.mdRecordsArray.length;
			$scope.countSynced = $scope.QueryInsertedRow.length;
			$scope.countNotSynced = jsonsql.query("select * from json where (Entry5=='1')", response.data[0][0]).length;
			$scope.countPending = jsonsql.query("select * from json where (Entry5=='3')", response.data[0][0]).length;
			
			console.log($scope.recordSynced);

			//update instance after 1 sec
			setTimeout(function () {
				$('.chart').data('easyPieChart').update($scope.recordSynced);
			}, 1000);

		});

	// Post Web CALL
	$scope.postMessage = function () {
		//var msg = document.getElementById('message').value;

	}

	$scope.filterResult = '';

	$scope.FilterOnlySynced = function () {
		$scope.filterResult = '0';

	}

	$scope.FilterOnlyNotSynced = function () {
		$scope.filterResult = '1';

	}
	
	$scope.FilterOnlyBoomiPending = function() {
		        $scope.filterResult = '3';
			  	
		    }

	$scope.FilterAll = function () {
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
		if ($scope.filterResult == '')
			$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, Entry4 as Customer_Number , case when Entry5 = \'0\' then \'Synced\' else   ( case when Entry5 = \'1\' then \'Not_Synced\' else \'Pending\' end ) end as Status , Entry6 as Cause , Entry7 as Error_Details  INTO XLSX("Report_Customers_All.xlsx",{}) FROM ?';
		else
			$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, Entry4 as Customer_Number ,case when Entry5 = \'0\' then \'Synced\' else ( case when Entry5 = \'1\' then \'Not_Synced\' else \'Pending\' end ) end as Status , Entry6 as Cause , Entry7 as Error_Details INTO XLSX("Report_Customers_Filtered.xlsx",{}) FROM ? where Entry5 = \'' + $scope.filterResult + '\'';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.mdRecordsArray]);
	};

});
