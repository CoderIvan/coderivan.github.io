var archives = [{
	title: 'AMD_&&_CommonJS'
}, {
	title: 'CORS'
}, {
	title: 'Docker化方案'
}]

var module = angular.module('myApp', ['ui.router'])

module.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/')

	$stateProvider.state('index', {
		url: '/',
		templateUrl: 'views/table_of_content.html',
		controller: function($scope) {
			$scope.archives = archives
		}
	})
	for (var i = 0; i < archives.length; i++) {
		$stateProvider.state(archives[i].title, {
			url: '/' + archives[i].title,
			templateUrl: 'views/archives/' + archives[i].title
		})
	}
})
