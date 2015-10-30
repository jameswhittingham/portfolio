'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
.controller('MainCtrl', function ($scope, fileService, $interval) {

  fileService.getFile('scripts/data/skills.js').then(function(data){
    $scope.skills = data.skills;
    //$scope.triggerTimer(data.skills.length);
  }, function(err){

  });

  $scope.triggerTimer = function(itemCount){
  	var timeTrigger = (15/itemCount)*1000,
  		ind = 0;

  	$('body').addClass('triggered')

  	$interval( function(){ 
  		if (ind >= itemCount) ind = 0;
  		$scope.selectedItem = ind+1;
  		ind +=1;
  		console.log(ind)
  		
  	}, timeTrigger);
  }
});
