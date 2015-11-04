angular
	.module('myApp', ['ui.router', 'ngAnimate'])
	.run(['$rootScope', '$state', function($rootScope, $state) {
		$rootScope.$state = $state
	}])
	.config(function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/')

		$stateProvider.state('home', {
			url: '/',
			template: '<h1>HelloWorld</h1>'
		}).state('archives', {
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
		}).state('archives.detail', {
			url: '/:title',
			templateUrl: function($stateParams) {
				return 'views/archives/' + $stateParams.title + '.html'
			}
		}).state('about', {
			url: '/about',
			template: '<h1>About Me</h1>'
		})
	})
