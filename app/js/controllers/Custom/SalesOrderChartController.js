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

    app.controller('LineCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
        $scope.onHover = function(points) {
            if (points.length > 0) {
                console.log('Point', points[0].value);
            } else {
                console.log('No point');
            }
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];

        $timeout(function() {
            $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
            $scope.series = ['Series C', 'Series D'];
        }, 3000);
    }]);

    app.controller('BarCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.options = {
            scaleShowVerticalLines: false
        };
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1)",
                highlightFill: "rgba(255,110,64,1)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1)",
                highlightFill: "rgba(103,58,183,1)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }];

        $timeout(function() {
            $scope.options = {
                scaleShowVerticalLines: true
            };
        }, 3000);
    }]);

    app.controller('DoughnutCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        $scope.data = [0, 0, 0];
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

        $timeout(function() {
            $scope.data = [350, 450, 100];
        }, 500);
    }]);

    app.controller('PieCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        $scope.data = [300, 500, 100];
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
    });

    app.controller('PolarAreaCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
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
        }, { // dark grey
                fillColor: "rgba(76,175,80,1.0)",
                strokeColor: "rgba(76,175,80,1.0)",
                highlightFill: "rgba(76,175,80,1.0)",
                highlightStroke: "rgba(76,175,80,1.0)"
        }, { // dark grey
                fillColor: "rgba(244,67,54,1.0)",
                strokeColor: "rgba(244,67,54,1.0)",
                highlightFill: "rgba(244,67,54,1.0)",
                highlightStroke: "rgba(244,67,54,1.0)"
        }];
    });

    app.controller('BaseCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
        $scope.type = 'PolarArea';

        $scope.toggle = function() {
            $scope.type = $scope.type === 'PolarArea' ? 'Pie' : 'PolarArea';
        };
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
        }, { // dark grey
                fillColor: "rgba(76,175,80,1.0)",
                strokeColor: "rgba(76,175,80,1.0)",
                highlightFill: "rgba(76,175,80,1.0)",
                highlightStroke: "rgba(76,175,80,1.0)"
        }, { // dark grey
                fillColor: "rgba(244,67,54,1.0)",
                strokeColor: "rgba(244,67,54,1.0)",
                highlightFill: "rgba(244,67,54,1.0)",
                highlightStroke: "rgba(244,67,54,1.0)"
        }];
    });

    app.controller('RadarCtrl', function($scope) {
        $scope.labels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,0.5)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,0.5)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];
    });

    app.controller('StackedBarCtrl', function($scope) {
        $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.type = 'StackedBar';

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];
    });

    app.controller('DataTablesCtrl', function($scope , $http ,  $filter , $timeout) {
		
		$scope.selectedSystem = "Select Bolton";
		$scope.showChart = false;
		$scope.recordsOfToday;
		
		$scope.st1 = 2
		$scope.st2 = 6
		$scope.st3 = 6
		$scope.st4 = 4
		$scope.st5 = 5
		$scope.st6 = 6
		$scope.st7 = 7
		
				
		
		$scope.postMessage = function() {

		
		console.log("-- Begin Error Chart");
		$scope.formattedDate = $filter('date')($scope.DeliveryDate, "yyyy-MM-dd");
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderOfToday\"  }";		        
		        console.log(msgdata);
				console.log($scope.selectedSystem);

		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					$scope.recordsOfToday = response.data[0][0] ; 
					$scope.resultOfToday = jsonsql.query("select * from json where (Entry2=='"+$scope.selectedSystem+"')", response.data[0][0]);
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
