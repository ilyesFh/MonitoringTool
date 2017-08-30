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



    app.controller('DataTablesCtrl', function($scope , $http ,  $filter , $timeout) {
		
	
		$scope.recordsOfToday = [];
		$scope.selectedSystem = "Select Bolton";
		$scope.showChart = false;
		$scope.recordsOfToday;
		
		$scope.TodayDate = new Date();
		$scope.maxDate = new Date();
		
		$scope.st1 = 2
		$scope.st2 = 6
		$scope.st3 = 6
		$scope.st4 = 4
		$scope.st5 = 5
		$scope.st6 = 6
		$scope.st7 = 7
		
		$scope.typeSearch = '';
		$scope.StatusSearch = '';
		
		
		
		$scope.load = function () {
		
		console.log("-- Begin Chart");
		$scope.formattedDate = $filter('date')($scope.TodayDate, "yyyyMMdd");
		console.log($scope.formattedDate);
		
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					$scope.recordsOfToday = response.data[0][0] ; 
					//$scope.resultOfToday = jsonsql.query("select * from json where (Entry2=='"+$scope.selectedSystem+"')", response.data[0][0]);
					console.log($scope.resultOfToday);
					
					
				$scope.st0 = jsonsql.query("select * from json where (Entry8=='0')", response.data[0][0]).length;
				$scope.st1 = jsonsql.query("select * from json where (Entry8=='1')", response.data[0][0]).length;
				$scope.st2 = jsonsql.query("select * from json where (Entry8=='2')", response.data[0][0]).length;
				$scope.st3 = jsonsql.query("select * from json where (Entry8=='3')", response.data[0][0]).length;
				$scope.st4 = jsonsql.query("select * from json where (Entry8=='4')", response.data[0][0]).length;
				$scope.st5 = jsonsql.query("select * from json where (Entry8=='5')", response.data[0][0]).length;
				$scope.st6 = jsonsql.query("select * from json where (Entry8=='6')", response.data[0][0]).length;
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
				
				
				
				$scope.showChart = true;
					
				});
		
		
	}
	
	

		$scope.changeDate = function () {
		
		console.log("-- Begin Chart");
		$scope.formattedDate = $filter('date')($scope.dt, "yyyyMMdd");
		console.log($scope.formattedDate);
		
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					$scope.recordsOfToday = response.data[0][0] ; 
					//$scope.resultOfToday = jsonsql.query("select * from json where (Entry2=='"+$scope.selectedSystem+"')", response.data[0][0]);
					console.log($scope.resultOfToday);
					
					
				$scope.st0 = jsonsql.query("select * from json where (Entry8=='0')", response.data[0][0]).length;
				$scope.st1 = jsonsql.query("select * from json where (Entry8=='1')", response.data[0][0]).length;
				$scope.st2 = jsonsql.query("select * from json where (Entry8=='2')", response.data[0][0]).length;
				$scope.st3 = jsonsql.query("select * from json where (Entry8=='3')", response.data[0][0]).length;
				$scope.st4 = jsonsql.query("select * from json where (Entry8=='4')", response.data[0][0]).length;
				$scope.st5 = jsonsql.query("select * from json where (Entry8=='5')", response.data[0][0]).length;
				$scope.st6 = jsonsql.query("select * from json where (Entry8=='6')", response.data[0][0]).length;
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
						fillColor: "rgba(255,110,64,1)",
						strokeColor: "rgba(255,110,64,1.0)",
						highlightFill: "rgba(255,110,64,1.0)",
						highlightStroke: "rgba(255,110,64,1)"
				}, { // dark grey
						fillColor: "rgba(103,58,183,1.0)",
						strokeColor: "rgba(103,58,183,1.0)",
						highlightFill: "rgba(103,58,183,1.0)",
						highlightStroke: "rgba(103,58,183,1.0)"
				}, { // dark grey
						fillColor: "rgba(253,216,53,1.0)",
						strokeColor: "rgba(253,216,53,1.0)",
						highlightFill: "rgba(253,216,53,1.0)",
						highlightStroke: "rgba(253,216,53,1.0)"
				}];
				
				
				
				$scope.showChart = true;
					
				});
		
		
	}		
		
		
		$scope.exportData = function () {
		
		$scope.queryExport = '';
		console.log($scope.typeSearch);
		
		if( $scope.typeSearch == '' && $scope.StatusSearch == '' )
		{
			
			console.log("Filter Empty");
			
			$scope.queryExport = 'SELECT Entry14 as System_Source, Entry13 as So_Number, Entry12 as Plant, Entry4 as Delivery_Date , Entry6 as Sold_To , Entry9 as Creation_Date_System ,  Entry10 as Creation_Time_WorkTable, Entry2 as Boomi_Process_Time ,   case when Entry8 = \'0\' then \'Created In Bolton\' else ( case when Entry8 = \'1\' then \'In Progress\' else  ( case when Entry8 = \'2\' then \'Sent To SAP\' else \'Error-Sent To SAP\'  end )  end ) end as Type  INTO XLSX("Report_SalesOrders.xlsx",{}) FROM ? ' ;
			
			
		}
		else
		{
			
			console.log("Filter Activiated");
			
			$scope.queryExport = 'SELECT Entry14 as System_Source, Entry13 as So_Number, Entry12 as Plant, Entry4 as Delivery_Date , Entry6 as Sold_To , Entry9 as Creation_Date_System ,  Entry10 as Creation_Time_WorkTable, Entry2 as Boomi_Process_Time ,   case when Entry8 = \'0\' then \'Created In Bolton\' else ( case when Entry8 = \'1\' then \'In Progress\' else  ( case when Entry8 = \'2\' then \'Sent To SAP\' else \'Error-Sent To SAP\'  end )  end ) end as Type  INTO XLSX("Report_SalesOrders.xlsx",{}) FROM ? where Entry14 = \'' + $scope.typeSearch + '\' AND Entry8 = \''+ $scope.StatusSearch + '\'   ' ;
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
		
		
		
		
        
        
    });
	
	
	
	app.controller('SoDashboardController', function($scope, $http, $filter , $interval ) {
	
	
	$scope.formattedDate;
	$scope.mdRecordsArray = [];
	$scope.superdaiwaError = 0;
	$scope.ebestError = 0;
	$scope.eosError = 0;
	$scope.neosError = 0;
	$scope.manualError = 0;
	$scope.refreshedDate;
	
	$scope.counter = 0;
			setInterval(function () {
			++$scope.counter;
			console.log($scope.counter);
		}, 1000);
		
		
	
  
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
				
				$scope.superdaiwaError = jsonsql.query("select * from json where (Entry1=='SUPERDAIWA')", response.data[0]).length;
				$scope.ebestError = jsonsql.query("select * from json where (Entry1=='EBEST')", response.data[0]).length;
				$scope.eosError = jsonsql.query("select * from json where (Entry1=='EOS')", response.data[0]).length;
				$scope.neosError = jsonsql.query("select * from json where (Entry1=='NEOS')", response.data[0]).length;
				$scope.manualError = jsonsql.query("select * from json where (Entry1=='MANUAL')", response.data[0]).length;

		        	});
	

		    }
			
			
			$scope.intrvl = $interval($scope.refresh , 900000);
		  
			$scope.$on('$destroy',function(){
				$interval.cancel($scope.intrvl);
			});
			
		
});
	
	

    app.controller('TicksCtrl', ['$scope', '$interval', function($scope, $interval) {
        var maximum = document.getElementById('container').clientWidth / 2 || 300;
        $scope.data = [
            []
        ];
        $scope.labels = [];
        $scope.options = {
            animation: false,
            showScale: false,
            showTooltips: false,
            pointDot: false,
            datasetStrokeWidth: 0.5
        };

        // Update the dataset at 25FPS for a smoothly-animating chart
        $interval(function() {
            getLiveChartData();
        }, 40);

        function getLiveChartData() {
            if ($scope.data[0].length) {
                $scope.labels = $scope.labels.slice(1);
                $scope.data[0] = $scope.data[0].slice(1);
            }

            while ($scope.data[0].length < maximum) {
                $scope.labels.push('');
                $scope.data[0].push(getRandomValue($scope.data[0]));
            }
        }
    }]);

    function getRandomValue(data) {
        var l = data.length,
            previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        return y < 0 ? 0 : y > 100 ? 100 : y;
    }

})();
