(function() {
    'use strict';

    /*  var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);*/

    app.config(function(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF6E40', '#FBC02E', '#673AB7', '#66bd78', '#f05050'],
            responsive: true
        });
        // Configure all doughnut charts
        ChartJsProvider.setOptions('Doughnut', {
            animateScale: true

        });
    });

    app.controller('MenuCtrl', function($scope) {
        $scope.isCollapsed = true;
        $scope.charts = ['Line', 'Bar', 'Doughnut', 'Pie', 'Polar Area', 'Radar', 'Base'];
    });


	app.controller('SoDashboardController', function($scope, $http, $filter , $interval , $state , $stateParams ) {


	$scope.formattedDate;
	$scope.mdRecordsArray = [];
	$scope.superdaiwaError = 0;
	$scope.ebestError = 0;
	$scope.eosError = 0;
	$scope.neosError = 0;
	$scope.manualError = 0;
	$scope.refreshedDate;


	$scope.counter = 1;
	/*
			setInterval(function () {
			++$scope.counter;
			console.log($scope.counter);
		}, 1000);
	*/	

	$scope.countProgressBar = function() {
		++$scope.counter;

		if ( $scope.counter == 100)
		{ $scope.counter = 0; }

	}


		  // Post Web CALL
		  $scope.refresh = function() {


				$scope.todayDate = new Date();
			    $scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");
				$scope.refreshedDate = $filter('date')($scope.todayDate, "yyyy/MM/dd HH:mm:ss");
				console.log($scope.refreshedDate);

			    console.log($scope.formattedDate);
				var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate +  "\", \"msgType\":\"/CCEJ/SD_BL_PROF\"   , \"Prefix\":\"SalesOrder\"  }"
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMoniDashboard;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
				console.log(response.data[0]);
				$scope.mdRecordsArray = response.data[0];

				//By System
				$scope.superD = jsonsql.query("select * from json where (Entry1=='SUPERDAIWA' )", response.data[0]);
				$scope.DaiwaWarning = jsonsql.query("select * from json where (Entry3=='1' )", $scope.superD).length;
				$scope.DaiwaOk = jsonsql.query("select * from json where (Entry3=='2' || Entry3=='4' || Entry3=='6' )", $scope.superD).length;
				$scope.DaiwaError = jsonsql.query("select * from json where (Entry3=='3' || Entry3=='5' )", $scope.superD).length;
				console.log("Warning =" + $scope.DaiwaWarning , "Error" + $scope.DaiwaError , "Good" + $scope.DaiwaOk );

				$scope.ebest = jsonsql.query("select * from json where (Entry1=='EBEST' )", response.data[0]);
				$scope.ebestWarning = jsonsql.query("select * from json where (Entry3=='1' )", $scope.ebest).length;
				$scope.ebestOk = jsonsql.query("select * from json where (Entry3=='2' || Entry3=='4' || Entry3=='6' )", $scope.ebest).length;
				$scope.ebestError = jsonsql.query("select * from json where (Entry3=='3' || Entry3=='5' )", $scope.ebest).length;
				//$scope.ebestError = 6;
				//$scope.ebestWarning = 3;

				$scope.manual = jsonsql.query("select * from json where (Entry1=='Manual' )", response.data[0]);
				$scope.manualWarning = jsonsql.query("select * from json where (Entry3=='1' )", $scope.manual).length;
				$scope.manualOk = jsonsql.query("select * from json where (Entry3=='2' || Entry3=='4' || Entry3=='6' )", $scope.manual).length;
				$scope.manualError = jsonsql.query("select * from json where (Entry3=='3' || Entry3=='5' )", $scope.manual).length;

				$scope.eosNormal = jsonsql.query("select * from json where (Entry1=='EOS-Normal' )", response.data[0]);
				$scope.eosNormalWarning = jsonsql.query("select * from json where (Entry3=='1' )", $scope.eosNormal).length;
				$scope.eosNormalOk = jsonsql.query("select * from json where (Entry3=='2' || Entry3=='4' || Entry3=='6' )", $scope.eosNormal).length;
				$scope.eosNormalError = jsonsql.query("select * from json where (Entry3=='3' || Entry3=='5' )", $scope.eosNormal).length;
				

				$scope.neosNormal = jsonsql.query("select * from json where (Entry1=='NEOS_Normal' )", response.data[0]);
				$scope.neosNormalWarning = jsonsql.query("select * from json where (Entry3=='1' )", $scope.neosNormal).length;
				$scope.neosNormalOk = jsonsql.query("select * from json where (Entry3=='2' || Entry3=='4' || Entry3=='6' )", $scope.neosNormal).length;
				$scope.neosNormalError = jsonsql.query("select * from json where (Entry3=='3' || Entry3=='5' )", $scope.neosNormal).length;


				/*
				//Error
				$scope.superdaiwaError = jsonsql.query("select * from json where (Entry1=='SUPERDAIWA')", response.data[0]).length;
				$scope.ebestError = jsonsql.query("select * from json where (Entry1=='ebest')", response.data[0]).length;
				$scope.eosError = jsonsql.query("select * from json where (Entry1=='EOS')", response.data[0]).length;
				$scope.neosError = jsonsql.query("select * from json where (Entry1=='NEOS')", response.data[0]).length;
				$scope.manualError = jsonsql.query("select * from json where (Entry1=='MANUAL')", response.data[0]).length;
				*/

		        	});


		    }


			$scope.RedirectToSoStatus = function(systemName) {

				console.log("Next Page");
				console.log(systemName);
				$state.go("app.tables.salesOrderStatus", { "id": systemName})


			}



			$scope.intrvl = $interval($scope.refresh , 300000);
			$scope.intrvl2 = $interval($scope.countProgressBar , 3000);



			$scope.$on('$destroy',function(){
				$interval.cancel($scope.intrvl);
			});

			$scope.$on('$destroy',function(){
				$interval.cancel($scope.intrvl2);
			});




});

    app.controller('DataTablesCtrl',  function($scope , $http ,  $filter , $timeout , $state , $modal, $log  ) {  


       $scope.SystemSelectedDisplay = "All"
	   $scope.showSelect = true;
	   $scope.showSourceHeader = false;
	   
		$scope.recordsOfToday = [];
		$scope.selectedSystem = "Select Bolton";
		$scope.showChart = false;
		$scope.recordsOfToday;

		$scope.TodayDate = new Date();
		$scope.refreshedDate;
		$scope.maxDate = new Date();
		
		$scope.showLoading = true;

		$scope.st1 = 0
		$scope.st2 = 0
		$scope.st3 = 0
		$scope.st4 = 0
		$scope.st5 = 0
		$scope.st6 = 0
		$scope.st0 = 0


		$scope.StatusSearch = '';
		console.log("BEFORE LOAD SO");
		
		
		$scope.serchBySystemSource = function (system) {			
		}



		$scope.load = function () {
			
			if($state.params.id != "") {
			console.log("Param = " + $state.params.id);
			$scope.typeSearch = $state.params.id;
			$scope.SystemSelectedDisplay = $state.params.id;
			$scope.showSelect = false;
			$scope.showSourceHeader = true;
			
		}
		else{
			console.log("No PARAM");
			$scope.typeSearch = '';
			
		}

		console.log("-- Begin Chart");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		$scope.refreshedDate = $filter('date')($scope.TodayDate, "yyyy/MM/dd HH:mm:ss");
		console.log($scope.formattedDate);

			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					
					//Check if we have param or not
					if($state.params.id != "") {
						$scope.showLoading = false;
						console.log("Param = " + $state.params.id);
						$scope.recordsOfToday = jsonsql.query("select * from json where (Entry14=='"+$state.params.id+"')", response.data[0][0]);
						$scope.allRecords = response.data[0][0];
						
					}
					
					else {
						$scope.showLoading = false;
					$scope.recordsOfToday = response.data[0][0] ; 
					
					}
					//$scope.resultOfToday = jsonsql.query("select * from json where (Entry2=='"+$scope.selectedSystem+"')", response.data[0][0]);
					console.log($scope.resultOfToday);


				$scope.st0 = jsonsql.query("select * from json where (Entry8=='0')", $scope.recordsOfToday).length;
				$scope.st1 = jsonsql.query("select * from json where (Entry8=='1')", $scope.recordsOfToday).length;
				$scope.st2 = jsonsql.query("select * from json where (Entry8=='2')", $scope.recordsOfToday).length;
				$scope.st3 = jsonsql.query("select * from json where (Entry8=='3')", $scope.recordsOfToday).length;
				$scope.st4 = jsonsql.query("select * from json where (Entry8=='4')", $scope.recordsOfToday).length;
				$scope.st5 = jsonsql.query("select * from json where (Entry8=='5')", $scope.recordsOfToday).length;
				$scope.st6 = jsonsql.query("select * from json where (Entry8=='6')", $scope.recordsOfToday).length;
				console.log($scope.st0 , $scope.st1 ,$scope.st2 , $scope.st3 ,$scope.st4 ,$scope.st5 , $scope.st6);	
				var totalSalesO = $scope.st0 + $scope.st1 +$scope.st2 + $scope.st3 +$scope.st4 +$scope.st5 + $scope.st6

				$scope.myOptions = {
			       options: {
						title: {
							display: true,
							text: 'Custom Chart Title'
						}
					}
			    }


				$scope.labels = ['Created In Bolton', 'Boomi In Progress', 'IDoc Sent To SAP' , 'Error Sending IDoc To SAP', 'SO Posted in SAP', 'SO Failed in SAP' , 'SO Received from SAP'];
				$scope.data = [$scope.st0, $scope.st1, $scope.st2 , $scope.st3 ,$scope.st4 , $scope.st5 , $scope.st6];
				$scope.colours = [{ // grey
						fillColor: "rgba(103,58,183,1.0)",
						strokeColor: "rgba(103,58,183,1.0)",
						highlightFill: "rgba(103,58,183,1.0)",
						highlightStroke: "rgba(103,58,183,1.0)"

				}, { // Orange : in progress
						fillColor: "rgba(255,110,64,1)",
						strokeColor: "rgba(255,110,64,1.0)",
						highlightFill: "rgba(255,110,64,1.0)",
						highlightStroke: "rgba(255,110,64,1)"
				}, { // Green
						fillColor: "rgba(102,204,0,1.0)",
						strokeColor: "rgba(102,204,0,1.0)",
						highlightFill: "rgba(102,204,0,1.0)",
						highlightStroke: "rgba(102,204,0,1.0)"
				}, { // RED
						fillColor: "rgba(255,0,0,1.0)",
						strokeColor: "rgba(255,0,0,1.0)",
						highlightFill: "rgba(255,0,0,1.0)",
						highlightStroke: "rgba(255,0,0,1.0)"
				},
				{ // Green 2 
						fillColor: "#B2FF66",
						strokeColor: "#B2FF66",
						highlightFill: "#B2FF66",
						highlightStroke: "#B2FF66"
				},
				{ // RED 2
						fillColor: "rgba(204,50,0,1.0)",
						strokeColor: "rgba(204,50,0,1.0)",
						highlightFill: "rgba(204,50,0,1.0)",
						highlightStroke: "rgba(204,50,0,1.0)"
				},
				{ // Released
						fillColor: "#3399FF",
						strokeColor: "#3399FF",
						highlightFill: "#3399FF",
						highlightStroke: "#3399FF"
				}




				];

				$scope.labelsBar = ['Last Update : '+$scope.refreshedDate];
				$scope.seriesBar = ['Created In Bolton', 'Boomi In Progress', 'IDoc Sent To SAP' , 'Error Sending IDoc To SAP', 'SO Posted in SAP', 'SO Failed in SAP' , 'SO Received from SAP'];
				$scope.dataBar = [
					[$scope.st0],
					[$scope.st1],
					[$scope.st2],
					[$scope.st3],
					[$scope.st4],
					[$scope.st5],
					[$scope.st6],
				];

				$scope.showChart = true;

				});


	}



		$scope.changeDate = function () {

		console.log("-- Begin Chart");
		$scope.showLoading = true;
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);

			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					$scope.showLoading = false;
					//Check if we have param or not
					if($state.params.id != "") {
						console.log("Param = " + $state.params.id);
						$scope.recordsOfToday = jsonsql.query("select * from json where (Entry14=='"+$state.params.id+"')", response.data[0][0]);
						$scope.allRecords = response.data[0][0];
						
					}
					
					else {
					$scope.recordsOfToday = response.data[0][0] ; 
					
					}
					


				$scope.st0 = jsonsql.query("select * from json where (Entry8=='0')", $scope.recordsOfToday).length;
				$scope.st1 = jsonsql.query("select * from json where (Entry8=='1')", $scope.recordsOfToday).length;
				$scope.st2 = jsonsql.query("select * from json where (Entry8=='2')", $scope.recordsOfToday).length;
				$scope.st3 = jsonsql.query("select * from json where (Entry8=='3')", $scope.recordsOfToday).length;
				$scope.st4 = jsonsql.query("select * from json where (Entry8=='4')", $scope.recordsOfToday).length;
				$scope.st5 = jsonsql.query("select * from json where (Entry8=='5')", $scope.recordsOfToday).length;
				$scope.st6 = jsonsql.query("select * from json where (Entry8=='6')", $scope.recordsOfToday).length;
				console.log($scope.st0 , $scope.st1 ,$scope.st2 , $scope.st3 ,$scope.st4 ,$scope.st5 , $scope.st6);	
				var totalSalesO = $scope.st0 + $scope.st1 +$scope.st2 + $scope.st3 +$scope.st4 +$scope.st5 + $scope.st6

				$scope.myOptions = {
			       options: {
						title: {
							display: true,
							text: 'Custom Chart Title'
						}
					}
			    }


				$scope.labels = ['Created In Bolton', 'In Progress', 'Sent To SAP' , 'Error-Sent To SAP', 'Processed', 'Not Processed' , 'Idoc Released'];
				$scope.data = [$scope.st0, $scope.st1, $scope.st2 , $scope.st3 ,$scope.st4 , $scope.st5 , $scope.st6];
				$scope.colours = [{ // grey
						fillColor: "rgba(103,58,183,1.0)",
						strokeColor: "rgba(103,58,183,1.0)",
						highlightFill: "rgba(103,58,183,1.0)",
						highlightStroke: "rgba(103,58,183,1.0)"

				}, { // Orange : in progress
						fillColor: "rgba(255,110,64,1)",
						strokeColor: "rgba(255,110,64,1.0)",
						highlightFill: "rgba(255,110,64,1.0)",
						highlightStroke: "rgba(255,110,64,1)"
				}, { // Green
						fillColor: "rgba(102,204,0,1.0)",
						strokeColor: "rgba(102,204,0,1.0)",
						highlightFill: "rgba(102,204,0,1.0)",
						highlightStroke: "rgba(102,204,0,1.0)"
				}, { // RED
						fillColor: "rgba(255,0,0,1.0)",
						strokeColor: "rgba(255,0,0,1.0)",
						highlightFill: "rgba(255,0,0,1.0)",
						highlightStroke: "rgba(255,0,0,1.0)"
				},
				{ // Green 2 
						fillColor: "#B2FF66",
						strokeColor: "#B2FF66",
						highlightFill: "#B2FF66",
						highlightStroke: "#B2FF66"
				},
				{ // RED 2
						fillColor: "rgba(204,50,0,1.0)",
						strokeColor: "rgba(204,50,0,1.0)",
						highlightFill: "rgba(204,50,0,1.0)",
						highlightStroke: "rgba(204,50,0,1.0)"
				},
				{ // Released
						fillColor: "#3399FF",
						strokeColor: "#3399FF",
						highlightFill: "#3399FF",
						highlightStroke: "#3399FF"
				}




				];

				$scope.labelsBar = ['Last Update : '+$scope.refreshedDate];
				$scope.seriesBar = ['Created In Bolton', 'Boomi In Progress', 'IDoc Sent To SAP' , 'Error Sending IDoc To SAP', 'SO Posted in SAP', 'SO Failed in SAP' , 'SO Received from SAP'];
				$scope.dataBar = [
					[$scope.st0],
					[$scope.st1],
					[$scope.st2],
					[$scope.st3],
					[$scope.st4],
					[$scope.st5],
					[$scope.st6],
				];

				$scope.showChart = true;

				});


	}		


		$scope.exportData = function () {

		$scope.queryExport = '';
		console.log($scope.typeSearch);
		console.log($scope.StatusSearch);

		if( /*$scope.typeSearch == '' && */ $scope.StatusSearch == '' )
		{

			console.log("Filter Empty");

			$scope.queryExport = 'SELECT Entry14 as System_Source, Entry1 as Transaction_ID , Entry13 as So_Number, Entry12 as Plant, Entry4 as Delivery_Date , Entry6 as Sold_To , Entry9 as Creation_Date_System ,  Entry10 as Creation_Time_WorkTable, Entry2 as Boomi_Process_Time , formattedTimestamp as last_Update  ,    case when Entry8 = \'0\' then \'Created In Bolton\' else ( case when Entry8 = \'1\' then \'Boomi In Progress\' else  ( case when Entry8 = \'2\' then \'IDoc Sent To SAP\' else ( case when Entry8 = \'3\' then \'Error Sending IDoc To SAP\' else  ( case when Entry8 = \'4\' then \'SO Posted in SAP\' else ( case when Entry8 = \'5\' then \'SO Failed in SAP\' else \'SO Received from SAP\' end) end) end)  end )  end ) end as Type  INTO XLSX("Report_SalesOrders.xlsx",{}) FROM ? ' ;


		}
		else
		{

			console.log("Filter Activiated");
			/*
			$scope.queryExport = 'SELECT Entry14 as System_Source, Entry13 as So_Number, Entry12 as Plant, Entry4 as Delivery_Date , Entry6 as Sold_To , Entry9 as Creation_Date_System ,  Entry10 as Creation_Time_WorkTable, Entry2 as Boomi_Process_Time ,   case when Entry8 = \'0\' then \'Created In Bolton\' else ( case when Entry8 = \'1\' then \'In Progress\' else  ( case when Entry8 = \'2\' then \'Sent To SAP\' else \'Error-Sent To SAP\'  end )  end ) end as Type  INTO XLSX("Report_SalesOrders.xlsx",{}) FROM ? where Entry14 = \'' + $scope.typeSearch + '\' AND Entry8 = \''+ $scope.StatusSearch + '\'   ' ;
			*/
			
			$scope.queryExport = 'SELECT Entry14 as System_Source, Entry1 as Transaction_ID , Entry13 as So_Number, Entry12 as Plant, Entry4 as Delivery_Date , Entry6 as Sold_To , Entry9 as Creation_Date_System ,  Entry10 as Creation_Time_WorkTable, Entry2 as Boomi_Process_Time , formattedTimestamp as last_Update ,  case when Entry8 = \'0\' then \'Created In Bolton\' else ( case when Entry8 = \'1\' then \'Boomi In Progress\' else  ( case when Entry8 = \'2\' then \'IDoc Sent To SAP\' else ( case when Entry8 = \'3\' then \'Error Sending IDoc To SAP\' else  ( case when Entry8 = \'4\' then \'SO Posted in SAP\' else ( case when Entry8 = \'5\' then \'SO Failed in SAP\' else \'SO Received from SAP\' end) end) end)  end )  end ) end as Type  INTO XLSX("Report_SalesOrders.xlsx",{}) FROM ? where Entry8 = \''+ $scope.StatusSearch + '\'   ' ;
		}	

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.recordsOfToday]);
	};




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


		$scope.openTransaction = function (size,windowClass , msg) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/Personal/TransactionIdDetail.html',
        controller: 'TransactionInstanceCtrl',
        windowClass: windowClass,
        size: size,
        resolve: {
          func : function () {
			  console.log("*********----  "+ msg);
			  $scope.transactionId = msg;
			  
			  return $scope.transactionId;


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



	app.controller('TransactionInstanceCtrl', ['$scope', '$http' , '$uibModalInstance', 'func', function($scope, $http , $modalInstance, func) {
		
		$scope.ok = function () {
		console.log("--Ok--");
      $modalInstance.dismiss('ok');
    };

		//console.log("*********---- "+ msg);
		$scope.soObject = func;
		console.log("***   "+ $scope.soObject);
		var msgdata = "{\"Input1\": \"GetTransactionInfo\"  , \"Input2\":\""+ $scope.soObject.Entry1 +"\"  , \"Input3\":\""+ $scope.soObject.Entry14 +"\" }"
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.112:9090/ws/simple/getOrderInformation;boomi_auth=Y2Nlai1LQUtBOU86NmMxZWVhMDMtNzY5MC00NGQ1LTllNjItMTBmNTdhNTA2Njg1',msgdata ).
		        then(function (response) {
				console.log(response.data);
				$scope.Records = response.data;
				
				
		});
		
		
		

    



  }])
  ; 


  app.controller('SoByPlant',  function($scope , $http ,  $filter , $timeout , $state , $modal, $log  ) {  


       $scope.SystemSelectedDisplay = "All"
	   $scope.showSelect = true;
	   $scope.showSourceHeader = false;
	   
		$scope.recordsOfToday = [];
		$scope.selectedSystem = "Select Bolton";
		$scope.showChart = false;
		$scope.recordsOfToday;

		$scope.TodayDate = new Date();
		$scope.refreshedDate;
		$scope.maxDate = new Date();


		$scope.StatusSearch = '';
		console.log("BEFORE LOAD SO By Plant");
		
		$scope.load = function () {
			
			
		console.log("-- Begin Chart");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		$scope.refreshedDate = $filter('date')($scope.TodayDate, "yyyy/MM/dd HH:mm:ss");
		console.log($scope.formattedDate);

			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					//$scope.resultOfToday = jsonsql.query("select * from json where (Entry2=='"+$scope.selectedSystem+"')", response.data[0][0]);
					console.log($scope.resultOfToday);


				

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
  


    //Random Value
    function getRandomValue(data) {
        var l = data.length,
            previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        return y < 0 ? 0 : y > 100 ? 100 : y;
    }

})();
			