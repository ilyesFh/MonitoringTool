


app.controller('GuardrailErrorController', function ( $scope , $http ,  $filter , $timeout , $state , $modal, $log   ) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	
	$scope.pricingList;
	$scope.allRecords;

	$scope.options = {
		animate: false,
		barColor: '#2C3E50',
		scaleColor: false,
		lineWidth: 20,
		lineCap: 'circle'
	};

	$scope.load = function () {
		
		//Reset Filter
		$scope.filterRush = "";
		$scope.filterStatus = "";
		
		
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"GuardRail\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry9=='E')", $scope.allRecords)).length;
				$scope.caseCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				$scope.looseCount = (jsonsql.query("select * from json where (Entry8=='E')", $scope.allRecords)).length;
				

			});
	}
	
	// Filter By Type Error
	
	$scope.filterError = function() {
		
		console.log($scope.errorTypeSearch);
		
		if ( $scope.errorTypeSearch == 'MATNR' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == 'CCEJ_CPG' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == 'VRKME_Case' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == 'VRKME_Loose' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry8=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == 'SAP' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry9=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == '' )
		{
			$scope.pricingList = $scope.allRecords;
		};

		
	}
	
	
	

	$scope.exportData = function () {

		$scope.queryExport = 'SELECT Entry1 as IDoc_Number, Entry2 as Sales_Order_Number, Entry3 as Line_Item_Count, Entry4 as Slip_Number , Entry7 as Delivery_Date , case when Entry5 = \'N\' then \'Normal Order\' else \'Rush Order\' end as Type , case when Entry6 = \'1\' then \'Sent\' else \'Not Sent\' end as Status INTO XLSX("Report_Shipment.xlsx",{}) FROM ?';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.truckStockList]);
	};
	
	
	$scope.getMonth = function () {
		
		$scope.filterRush = "";
		$scope.filterStatus = "";

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Proformat\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0][0]);

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
	

	$scope.openDetail = function (size,windowClass , msg) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/Personal/SapErrorDetail.html',
        controller: 'SapErrorInstanceCtrl',
        windowClass: windowClass,
        size: size,
        resolve: {
          func : function () {
			  console.log("*********----  "+ msg);
			  $scope.sapErrorObject = msg;
			  
			  return $scope.sapErrorObject;


          }
        }
		
		
		
      });



      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
	
	
	
	
});


app.controller('SapErrorInstanceCtrl', ['$scope', '$uibModalInstance', 'func', function($scope, $modalInstance, func) {

		//console.log("*********---- "+ msg);
		$scope.x = func;
		console.log("***   "+ $scope.x);
		
		

    $scope.ok = function () {
		console.log("--Ok--");
		$modalInstance.dismiss('ok');
    };



  }])
  ; 