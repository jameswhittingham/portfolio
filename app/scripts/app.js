'use strict';

/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */
angular.module('portfolioApp', [ 'ngRoute', 'portfolioApp.services', 'portfolioApp.directives'])
.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  /*.when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  })*/
  .otherwise({
    redirectTo: '/'
  });
});
