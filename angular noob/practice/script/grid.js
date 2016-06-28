(function(){
angular.module('myGridApp', [])
.controller('myGridController', ['$scope', function($scope){
	$scope.addCustomer = function (name) {
		alert(name); 
	}
}])
.directive('myGrid', function(){
	return{
		restrict: 'E',
		controller: ['$scope', '$http', 'orderByFilter', function($scope, $http, orderBy){
			$scope.asc = false;
			$scope.active = 0;
			$scope.sortClass = 'sort-asc';
			$scope.propertyName = 'keyword';
			$scope.selected = 0;
			$scope.data = {};
			$scope.headers = [];
			$scope.sortBy = function (index, title) {
				$scope.propertyName = title;
				$scope.active = index;
				$scope.asc = !$scope.asc;
				$scope.data = orderBy($scope.data, title, $scope.asc);
			}
			$scope.select = function (row) {
				$scope.selected = row;
			}
			$scope.addCustomer = function () {
				var name = 'kurt';
			  	$scope.add({name:name});	 
			}
			$http({
				method: 'GET',
				url: 'data/devices.json'
			})
			.then(function successCallback(response) {
				 $scope.data = response.data;
				 $scope.headers = Object.keys(response.data[0]);
				 
				 angular.forEach($scope.data, function(data) {
				 	data.clicks = parseInt(data.clicks);
				 	data.filtered_clicks = parseInt(data.filtered_clicks);
				 	data.offer_clicks = parseInt(data.offer_clicks);
				 	data.leads = parseInt(data.leads);
				 	data.revenue = parseFloat(data.revenue);
				 	data.ctr = parseFloat(data.ctr);
				 	data.ltc = parseFloat(data.ltc);
				 	data.cr = parseFloat(data.cr);
				 	data.epc = parseFloat(data.epc);
				 	data.offer_epc = parseFloat(data.offer_epc);
				 });
			})
		}],
		scope: {
			add: '&'
		},
		templateUrl: 'partials/grid.template.html'		
	}
})
})();