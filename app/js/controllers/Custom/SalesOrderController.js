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

app.controller('SalesOrderController', function($scope, $http, $filter ) {

	$scope.message = "Marouen" ; 
	$scope.fieldValue;
	$scope.jsonArray;
	$scope.DeliveryDate;
	$scope.CreationStartDate;
	$scope.CreationEndDate;
	$scope.syncResultBool = false;
	$scope.formattedDate;
	
	$scope.maxDate = new Date();
	$scope.salesOrderArray = [];
	
	$scope.labels = ['00-04H', '05H', '06H', '07H', '08H', '09H', '10H','11H', '12H', '13H', '14H', '15H', '16H', '17H','18H', '19H', '20H', '21H', '22H', '23H'];
	
	$scope.showChart = false;
	
	$scope.optionsChart = {
            
        };
		
		$scope.seriesChart = [];



	

		  // Post Web CALL
		  $scope.postMessage = function() {
		        //var msg = document.getElementById('message').value;
			  	console.log("--1");
				$scope.showChart = true;


			    $scope.formattedDateD1 = $filter('date')($scope.CreationStartDate, "yyyyMMdd");
				$scope.formattedDateD2 = $filter('date')($scope.CreationEndDate, "yyyyMMdd");


			    console.log($scope.formattedDateD1);
				console.log($scope.formattedDateD2);


		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDateD1 +  "\", \"msgType\":\"" + $scope.formattedDateD2 + "\"  , \"Prefix\":\"SalesOrderAll\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
		        	console.log("");
					console.log(response);
					console.log(response.data);
		        	console.log(response.data[0][0]);

		        	 //$scope.jsonEbestTotal = jsonsql.query("select * from json where (Var2=='Ebest')", response.data);
		        	 //console.log($scope.jsonEbestTotal);
		        	 //$scope.SOEbest = $scope.jsonEbest.length;
		        	 //console.log($scope.SOEbest);
		        	 $scope.blabla = "18";

		        	 $scope.fixedStartDate = $filter('date')($scope.CreationStartDate, "yyyy/MM/dd");
		        	 $scope.fixedEndDate = $filter('date')($scope.CreationEndDate, "yyyy/MM/dd");
					 console.log($scope.fixedStartDate);
					 console.log($scope.fixedEndDate);
					 

		        	 $scope.fixedDate = $filter('date')($scope.fixedStartDate, "yyyy/MM/dd");

		        	 $scope.fixedRealDate = new Date($scope.fixedDate);
		        	 $scope.fixedEndDate = new Date($scope.fixedEndDate);
		        	 $scope.salesOrderArray = new Array();
		        	 $scope.indice = 0;
					 
					 $scope.data = [];
					 $scope.seriesChart = [];


		        	 console.log($scope.fixedDate);
		        	 while ( $scope.fixedRealDate <= $scope.fixedEndDate )
		        	{	

						
						 $scope.seriesChart.push($scope.fixedDate);
		        		 $scope.QueryWithDate = jsonsql.query("select * from json where (Entry2=='"+$scope.fixedDate+"')", response.data[0][0]);
		        		 console.log($scope.QueryWithDate);
		        		 $scope.record = new Array(23);
		        		 $scope.record[0] = "All Systems";
		        		 $scope.record[1] = $scope.fixedDate;
		        		 $scope.record[22] = $scope.QueryWithDate.length;
						 
						 for (k=2;k<22; k++)
						 {
							$scope.record[k] = 0 
						 }
						 
						 
						 
						 console.log($scope.record[2]);
						 
						 /*
						 $scope.data = [
											[$scope.record[2], $scope.record[3], $scope.record[4], $scope.record[5], $scope.record[6], $scope.record[7], $scope.record[8]]
            
										];
						 */
						 

		        		 for (j=0;j<$scope.QueryWithDate.length; j++)
		        			 {

		        			 if ( Number($scope.QueryWithDate[j].Hour) < 5)
		        				 { 
		        				 if ( $scope.record[2] == 0)
		        					 { $scope.record[2] = 1}
		        				 else {
		        					 $scope.record[2] = $scope.record[2] + 1;
		        				 }
		        				 }
		        			 else
		        				 {
		        				 if ( $scope.record[Number($scope.QueryWithDate[j].Hour)-2] == 0)
	        					 { $scope.record[Number($scope.QueryWithDate[j].Hour)-2] = 1}
	        				 else {
	        					 $scope.record[Number($scope.QueryWithDate[j].Hour)-2] = $scope.record[Number($scope.QueryWithDate[j].Hour)-2] + 1;
	        				 	}

		        				 }
								 
								 
								 
								 
								 
								 

		        			 }

							 
							 $scope.dataToInsert = [ $scope.record[2], $scope.record[3], $scope.record[4], $scope.record[5], $scope.record[6], $scope.record[7], $scope.record[8] , $scope.record[9] , $scope.record[10] , $scope.record[11] , $scope.record[12], $scope.record[13] ,$scope.record[14] , $scope.record[15] , $scope.record[16] , $scope.record[17], $scope.record[18] ,$scope.record[19] , $scope.record[20] , $scope.record[21] ]
							 
							 $scope.data.push($scope.dataToInsert);
							 
							 
		        		 console.log($scope.record);

		        		 $scope.fixedDate = new Date($scope.fixedDate);
		        		 ($scope.fixedDate).setDate(($scope.fixedDate).getDate()+1);
		        		 ($scope.fixedRealDate).setDate(($scope.fixedRealDate).getDate()+1);
		        		 console.log($scope.fixedDate);
		        		 $scope.monthDate = ($scope.fixedDate).getMonth()+1;

		        		 if ( $scope.monthDate.toString().length === 1 )
		        			{
		        			 $scope.monthDate = "0"+$scope.monthDate;
		        			}
							$scope.day = ($scope.fixedDate).getDate().toString().length === 1 ? "0"+($scope.fixedDate).getDate() : ($scope.fixedDate).getDate();
		        		 $scope.fixedDate = ($scope.fixedDate).getFullYear()+"/"+$scope.monthDate+"/"+$scope.day;
		        		 console.log($scope.fixedDate);


		        		 $scope.salesOrderArray[$scope.indice] = $scope.record;
		        		 $scope.indice++;
		        	 }

		        	 console.log($scope.salesOrderArray);



		        	 $scope.jsonArray = response.data;

		        	});
		    }
			
			
        
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
        


			$scope.countTo = 10;
			$scope.countFrom = 0;

		  //Filter For Checkbox
		  $scope.filter2 = function(x){
			    if (x.Hour == null ){
			        return true;
			    } else{
			        return false;
			    }
			};

			//Set Boolean Sync
			$scope.setSyncBoolean = function() {
				$scope.syncResultBool = true;
		    }


			

			//Calendar
	
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
  
  $scope.open2 = function($event,type) {
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


app.controller('DataTablesCtrl', function($scope) {
        
    });