


app.controller('A624Controller', function ( $scope , $http ,  $filter , $timeout , $state , $modal, $log   ) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	
	$scope.pricingList;
	$scope.allRecords;
	
	$scope.fileList;

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
		$scope.fileUsedState = false;
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		
		var msgdataa624files = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"A624_Files\"  }";
				var resulta624Check = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdataa624files).
				then(function (response) {
				console.log(response.data[0]);
				$scope.fileList = response.data[0];
				
				var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"A624\"  }";
				console.log(msgdata);
				var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
					then(function (response) {
						console.log(response.data[0]);
						$scope.pricingList = response.data[0];

					});

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

		$scope.queryExport = 'SELECT Entry1 as MANDT,Entry2 as Kappl,Entry3 as kschl,Entry4 as vkorg,Entry5 as vtweg,Entry6 as ccej_cpg,Entry7 as matnr,Entry8 as vrkme,Entry9 as kfrst,Entry10 as formatDateWithoutTime2,formatDateWithoutTime as datab,Entry12 as kbstat,Entry13 as knumh,Entry14 as Filename ,formattedDate as Date  INTO XLSX("Report_Not_Synched_A624.xlsx",{}) FROM ?';
		
		console.log($scope.pricingList);
		alasql($scope.queryExport, [$scope.pricingList]);
		
	};
	
	
	$scope.getMonth = function () {
		
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		
		var msgdataa624files = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"A624_Files\"  }";
				var resulta624Check = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdataa624files).
				then(function (response) {
				console.log(response.data[0]);
				$scope.fileList = response.data[0];
				
				var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"A624\"  }";
				console.log(msgdata);
				var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
					then(function (response) {
						console.log(response.data[0]);
						$scope.pricingList = response.data[0];

					});

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
  
  
  
  app.controller('EmergencyErrorController', function ( $scope , $http ,  $filter , $timeout , $state , $modal, $log   ) {

	$scope.TodayDate = new Date();
	$scope.maxDate = new Date();
	
	$scope.pricingList = [];
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
		console.log($scope.pricingList);
		
		
		
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Emergency\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.vrkmeCount = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				
				
				

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
		
		if ( $scope.errorTypeSearch == 'VRKME' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords));
		};		
		
		if ( $scope.errorTypeSearch == 'SAP' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == '' )
		{
			$scope.pricingList = $scope.allRecords;
		};

		
	}
	
	
	

	$scope.exportData = function () {

		$scope.queryExport = 'SELECT case when Entry6 = \'E\' then \'ERROR\' else Entry1 end as MATNR, case when Entry5 = \'E\' then \'ERROR\' else Entry2 end as CCEJ_CPG , case when Entry4 = \'E\' then \'ERROR\' else Entry3 end as VRKME , case when Entry7 = \'E\' then \'ERROR\' else \'--\' end as SAP ,  Entry18 as Cause , Entry10 as Line_Number , Entry9 as File_Name , Entry11 as Parameter1 , Entry12 as Parameter2 , Entry13 as Parameter3, Entry14 as Parameter4 , Entry8 as Message_Type , Entry15 as Status_Message , Entry16 as Status_Message_Id , Entry17 as Status_Message_Number   INTO XLSX("Report_Pricing_Emergency.xlsx",{}) FROM ?';

		console.log($scope.pricingList);
		alasql($scope.queryExport, [$scope.pricingList]);
	};
	
	
	$scope.getMonth = function () {
		
		$scope.filterRush = "";
		$scope.filterStatus = "";

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Emergency\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.vrkmeCount = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				

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
        templateUrl: 'partials/Personal/SapErrorDetailEmergency.html',
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


app.controller('EmergencyOverlapErrorController', function ( $scope , $http ,  $filter , $timeout , $state , $modal, $log   ) {

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
		$scope.showLoading = true;
		
		
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"OverlapEmergency\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				$scope.showLoading = false;
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.vrkmeCount = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				
				
				

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
		
		if ( $scope.errorTypeSearch == 'VRKME' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords));
		};		
		
		if ( $scope.errorTypeSearch == 'SAP' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == '' )
		{
			$scope.pricingList = $scope.allRecords;
		};

		
	}
	
	
	

	$scope.exportData = function () {

		$scope.queryExport = 'SELECT case when Entry6 = \'E\' then \'ERROR\' else Entry1 end as MATNR, case when Entry5 = \'E\' then \'ERROR\' else Entry2 end as CCEJ_CPG , case when Entry4 = \'E\' then \'ERROR\' else Entry3 end as VRKME , case when Entry7 = \'E\' then \'ERROR\' else \'--\' end as SAP ,  Entry18 as Cause , Entry10 as Line_Number , Entry9 as File_Name , Entry11 as Parameter1 , Entry12 as Parameter2 , Entry13 as Parameter3, Entry14 as Parameter4 , Entry8 as Message_Type , Entry15 as Status_Message , Entry16 as Status_Message_Id , Entry17 as Status_Message_Number , Entry19 as TIMESTAMP   INTO XLSX("Report_Pricing_EmergencyOverlap.xlsx",{}) FROM ?';

		console.log($scope.pricingList);
		alasql($scope.queryExport, [$scope.pricingList]);
	};
	
	
	$scope.getMonth = function () {
		
		$scope.filterRush = "";
		$scope.filterStatus = "";

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"OverlapEmergency\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.vrkmeCount = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				
				
				

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
        templateUrl: 'partials/Personal/SapErrorDetailEmergency.html',
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

app.controller('PromotionController', function ( $scope , $http ,  $filter , $timeout , $state , $modal, $log   ) {

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
	
	$scope.promotionXmlHeader="<update_promotion>"
	$scope.promotionXmltail="</update_promotion>"
	
	
	$scope.selectedBox ;

	$scope.load = function () {
		
		//Reset Filter
		$scope.filterRush = "";
		$scope.filterStatus = "";
		$scope.showLoading = true;
		
		
		
		console.log("load event detected!");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		//$scope.formattedDate = 201705;
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"OverlapEmergency\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				$scope.showLoading = false;
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.vrkmeCount = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				
				
				

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
		
		if ( $scope.errorTypeSearch == 'VRKME' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords));
		};		
		
		if ( $scope.errorTypeSearch == 'SAP' )
		{
			
			$scope.pricingList = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords));
		};
		
		if ( $scope.errorTypeSearch == '' )
		{
			$scope.pricingList = $scope.allRecords;
		};

		
	}
	
	
	$scope.sendXml = function() {
		
		$scope.promotionXmlHeader = $scope.promotionXmlHeader+$scope.promotionXmltail;
		console.log($scope.promotionXmlHeader);
		var msgdata = $scope.promotionXmlHeader;
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getPromotionUpdate;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(success);

			});
		
		$scope.promotionXmlHeader="<update_promotion>"
		$scope.promotionXmltail="</update_promotion>"
		
		
	}
	
	$scope.selectCheckbox = function (x) {
		
		console.log("First "+x.selectedBox);
		 if( x.selectedBox == true){
			$scope.promotionXmlHeader = $scope.promotionXmlHeader+"<promo>"+x.Entry2+"</promo>"
			console.log($scope.promotionXmlHeader);
		 }
		 else{
			 $scope.promotionXmlHeader = $scope.promotionXmlHeader.replace("<promo>"+x.Entry2+"</promo>","");
			 console.log($scope.promotionXmlHeader);
		 }
	}
	
	

	$scope.exportData = function () {

		$scope.queryExport = 'SELECT case when Entry6 = \'E\' then \'ERROR\' else Entry1 end as MATNR, case when Entry5 = \'E\' then \'ERROR\' else Entry2 end as CCEJ_CPG , case when Entry4 = \'E\' then \'ERROR\' else Entry3 end as VRKME , case when Entry7 = \'E\' then \'ERROR\' else \'--\' end as SAP ,  Entry18 as Cause , Entry10 as Line_Number , Entry9 as File_Name , Entry11 as Parameter1 , Entry12 as Parameter2 , Entry13 as Parameter3, Entry14 as Parameter4 , Entry8 as Message_Type , Entry15 as Status_Message , Entry16 as Status_Message_Id , Entry17 as Status_Message_Number , Entry19 as TIMESTAMP   INTO XLSX("Report_Pricing_EmergencyOverlap.xlsx",{}) FROM ?';

		console.log($scope.pricingList);
		alasql($scope.queryExport, [$scope.pricingList]);
	};
	
	
	$scope.getMonth = function () {
		
		$scope.filterRush = "";
		$scope.filterStatus = "";

		console.log($scope.dt);
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"OverlapEmergency\"  }";
		console.log(msgdata);
		var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniPricingTool;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=', msgdata).
			then(function (response) {
				console.log(response.data[0]);
				$scope.allRecords = response.data[0];
				$scope.pricingList = response.data[0];
				
				//count For each Type
				$scope.matnrCount = (jsonsql.query("select * from json where (Entry6=='E')", $scope.allRecords)).length;
				$scope.cpgCount = (jsonsql.query("select * from json where (Entry5=='E')", $scope.allRecords)).length;
				$scope.vrkmeCount = (jsonsql.query("select * from json where (Entry4=='E')", $scope.allRecords)).length;
				$scope.sapCount = (jsonsql.query("select * from json where (Entry7=='E')", $scope.allRecords)).length;
				
				
				

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
        templateUrl: 'partials/Personal/SapErrorDetailEmergency.html',
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

