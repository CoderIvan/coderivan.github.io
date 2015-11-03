var module = angular.module('myApp', ['ui.router'])

module.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/archives')

	$stateProvider.state('list', {
		url: '/archives',
		templateUrl: 'views/table_of_content.html',
		controller: function($scope, $http) {
			$http({
				method: 'GET',
				url: 'scripts/archives.json'
			}).then(function successCallback(response) {
				$scope.archives = response.data
			}, function errorCallback(response) {
				console.error(response)
			})
		}
	}).state('detail', {
		url: '/archives/:title',
		templateUrl: function($stateParams) {
			return 'views/archives/' + $stateParams.title + '.html'
		}
	})
})
