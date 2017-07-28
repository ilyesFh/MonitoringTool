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

app.controller('PreviousDayCustomerController', function ($scope, $http, $filter, uibDateParser) {

	$scope.message = "Marouen";
	$scope.fieldValue;
	$scope.jsonArray;
	$scope.DeliveryDate;
	$scope.CreationStartDate;
	$scope.CreationEndDate;
	$scope.syncResultBool = false;
	$scope.formattedDate;
	$scope.showDiv = false;
	$scope.maxDate = new Date();

	// Post Web CALL
	$scope.CallWebService = function () {

		$scope.showDiv = true;

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
				console.log($scope.recordSynced);

				//update instance after 1 sec
				setTimeout(function () {
					$('.chart').data('easyPieChart').update($scope.recordSynced);
				}, 1000);

			});

	}

	$scope.filterResult = '';

	$scope.FilterOnlySynced = function () {
		$scope.filterResult = '0';

	}

	$scope.FilterOnlyNotSynced = function () {
		$scope.filterResult = '1';

	}

	$scope.FilterAll = function () {
		$scope.filterResult = '';

	}

	$scope.exportData = function () {

		$scope.queryExport = '';
		if ($scope.filterResult == '')
			$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';
		else
			$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_Filtered.xlsx",{}) FROM ? where Entry5 = \'' + $scope.filterResult + '\'';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.mdRecordsArray]);
	};

});
