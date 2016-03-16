'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
.controller('MainCtrl', function ($scope, fileService, $interval, $compile, $document) {

  $scope.$on('$viewContentLoaded', function(){
    $('body').addClass('loaded')
  });

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

  /*$scope.getPosition = function(evt) {
    $scope.mouseX = evt.clientX;
    $scope.mouseY = evt.clientY;
  }*/

  $scope.getPositive = function(num) {

    if (num>-120) {
      return -400
    } else {
      return num;
    }
  }


  function initParallax() {
    var $win = $(window);
    // init controller
    var controller = new ScrollMagic.Controller();


    // build tween
    /*var tween = new TimelineMax().add([
      TweenMax.fromTo(".something", 1, {opacity: 0}, {opacity: 1})
    ])

    // build scene
    var scene = new ScrollMagic.Scene({
      triggerElement: ".something",
      duration: "10%",
      offset: -$win.height()/4
    })
    //.setClassToggle(".something", "active")
    .setTween(tween)
    .addTo(controller);*/


    // Is '.active' when in view
    var scene1 = new ScrollMagic.Scene({
      triggerElement: ".scene100",
      duration: "100%",
      offset: $win.height()/2
    })
    .setClassToggle(".scene100", "active")
    .addTo(controller);

    // Is '.active' when in 50% from top
    var scene2 = new ScrollMagic.Scene({
      triggerElement: ".scene50",
      duration: "1000%",
      offset: $win.height()
    })
    .setClassToggle(".scene50", "show-stuff")
    .addTo(controller);

    // Is '.active' when scrolled 25%
    var scene3 = new ScrollMagic.Scene({
      triggerElement: ".bottom25",
      duration: "100%",
      offset: -$win.height()/4
    })
    .setClassToggle(".bottom25", "active")
    .addTo(controller);



  }
  initParallax()

});
