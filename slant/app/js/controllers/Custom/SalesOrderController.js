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
	
	
	/*
	$scope.todos = [
	                'Learn Sketch', 
	                'Look at Dribbble and feel inferior',
	                'Actually learn how to use the Pen tool'
	              ];
	
	$scope.done = function(todo) {
	    var indexOf = $scope.todos.indexOf(todo);
	    if (indexOf !== -1) {
	      $scope.todos.splice(indexOf, 1);
	    }
	  };
	  
	  $scope.add = function(e) {
		    if (e.which && e.which === 13) {
		    	console.log(e.which);
		      $scope.todos.push($scope.newTodo);
		      $scope.newTodo = '';
		    }
		  };
		  
		  // Get Web Call (Consume)
		  $http.get('http://services.groupkt.com/country/get/all').
	        then(function(response) {
	            $scope.greeting = response.data;
	            console.log(response.data);
	        });
		  
		 */
		  
		  // Post Web CALL
		  $scope.postMessage = function() {
		        //var msg = document.getElementById('message').value;
			  	console.log("--1");
			    $scope.formattedDate = $filter('date')($scope.DeliveryDate, "yyyy-MM-dd");
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"SalesOrderAll\"  }";
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
		        	 
		        	 $scope.fixedDate = $filter('date')($scope.fixedStartDate, "yyyy/MM/dd");
		        	 
		        	 $scope.fixedRealDate = new Date($scope.fixedDate);
		        	 $scope.fixedEndDate = new Date($scope.fixedEndDate);
		        	 $scope.salesOrderArray = new Array();
		        	 $scope.indice = 0;
		        	 
		        	 
		        	 console.log($scope.fixedDate);
		        	 while ( $scope.fixedRealDate <= $scope.fixedEndDate )
		        	{	
		        		 
		        		 
		        		 $scope.QueryWithDate = jsonsql.query("select * from json where (Entry2=='"+$scope.fixedDate+"')", response.data[0][0]);
		        		 console.log($scope.QueryWithDate);
		        		 $scope.record = new Array(23);
		        		 $scope.record[0] = "Ebest";
		        		 $scope.record[1] = $scope.fixedDate;
		        		 $scope.record[22] = $scope.QueryWithDate.length;
		        		 
		        		 
		        		 for (j=0;j<$scope.QueryWithDate.length; j++)
		        			 {
		     
		        			 if ( Number($scope.QueryWithDate[j].Hour) < 5)
		        				 { 
		        				 if ( $scope.record[2] == null)
		        					 { $scope.record[2] = 1}
		        				 else {
		        					 $scope.record[2] = $scope.record[2] + 1;
		        				 }
		        				 }
		        			 else
		        				 {
		        				 if ( $scope.record[Number($scope.QueryWithDate[j].Hour)-2] == null)
	        					 { $scope.record[Number($scope.QueryWithDate[j].Hour)-2] = 1}
	        				 else {
	        					 $scope.record[Number($scope.QueryWithDate[j].Hour)-2] = $scope.record[Number($scope.QueryWithDate[j].Hour)-2] + 1;
	        				 	}
		        				 
		        				 }
		        			 
		        			 }
		        		 
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
			
		  
			$scope.TestExternalJs = function() {
		        console.log("I'm in AngularJs controller");
		        var formattedDate = "2017-04-18";
		        
		        params = {
		      		  'a': formattedDate,
		      		  
		      		};
		        
		        $http({
		            
		        	url: "http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=",
		        	method: 'JSONP',
		        	params: params
		        	
		        });
		    }
		  
			//Test Graph		
			$scope.openDetails = function() {
			      console.log("Add Info");
			      Highcharts.chart('container', {
			    	    chart: {
			    	        type: 'spline'
			    	    },
			    	    title: {
			    	        text: 'SalesOrder Cycle'
			    	    },
			    	    subtitle: {
			    	        text: 'Sales Order 7700913506'
			    	    },
			    	    xAxis: {
			    	        categories: ['01/05/217 06:00:00', '01/05/217 08:00:00', '01/05/217 010:00:00', '01/05/217 12:00:00', '01/05/217 14:00:00']
			    	    },
			    	    yAxis: {
			    	    
			    	    categories: [ '' , 'EOS', 'SAP', 'MySQL', 'Proformat', 'shipment'], 
			    	        title: {
			    	            text: 'Systems'
			    	        },
			    	        labels: {
			    	            formatter: function () {
			    	                return this.value ;
			    	            }
			    	        }
			    	    },
			    	    tooltip: {
			    	        crosshairs: true,
			    	        shared: true
			    	    },
			    	    plotOptions: {
			    	        spline: {
			    	            marker: {
			    	                radius: 7,
			    	                lineColor: '#666666',
			    	                lineWidth: 1
			    	            },
			    	            animation: {
			    	                    duration: 5000,
			    	                    easing: 'easeOutBounce'
			    	                }
			    	        }
			    	    },
			    	    series: [{
			    	        name: '7700913506',
			    	        marker: {
			    	            symbol: 'square'
			    	        },
			    	        data: [1, {
			    	            y: 2,
			    	            marker: {
			    	                symbol: 'url(http://i.imgur.com/pK0euKF.png)'
			    	            }
			    	        }, {
			    	            y: 3,
			    	            marker: {
			    	                symbol: 'url(http://hrdownload.com/proimg_icon/mysql-workbench.jpeg)'
			    	            }
			    	        } , 4, {
			    	            y: 5,
			    	            marker: {
			    	                symbol: 'url(https://www.bfound.net/img/msg-error.gif)'
			    	            }
			    	        }]

			    	    }, ]
			    	});
			      
			    };
		
});