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



    var scene1 = new ScrollMagic.Scene({
      triggerElement: ".scene150",
      duration: "100%",
      offset: $win.height()/1.5
    })
    .setClassToggle(".scene150", "hero-fixed")
    .addTo(controller);



    // Scenes for accordion
    var scene4 = new ScrollMagic.Scene({
      triggerElement: ".bottom10",
      duration: "100%",
      offset: -$win.height()/2 + $win.height()/10 -40
    })
    .setClassToggle(".bottom10", "fix-it")
    .addTo(controller);

    var scene5 = new ScrollMagic.Scene({
      triggerElement: ".bottom20",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 2) -80
    })
    .setClassToggle(".bottom20", "fix-it")
    .addTo(controller);

    var scene6 = new ScrollMagic.Scene({
      triggerElement: ".bottom30",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 3) -120
    })
    .setClassToggle(".bottom30", "fix-it")
    .addTo(controller);

    var scene7 = new ScrollMagic.Scene({
      triggerElement: ".bottom40",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 4) -160
    })
    .setClassToggle(".bottom40", "fix-it")
    .addTo(controller);

    var scene8 = new ScrollMagic.Scene({
      triggerElement: ".bottom50",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 5) -200
    })
    .setClassToggle(".bottom50", "fix-it")
    .addTo(controller);

    var scene9 = new ScrollMagic.Scene({
      triggerElement: ".bottom60",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 6) -240
    })
    .setClassToggle(".bottom60", "fix-it")
    .addTo(controller);

    var scene10 = new ScrollMagic.Scene({
      triggerElement: ".bottom70",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 7) -280
    })
    .setClassToggle(".bottom70", "fix-it")
    .addTo(controller);

    var scene11 = new ScrollMagic.Scene({
      triggerElement: ".bottom80",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 8) -320
    })
    .setClassToggle(".bottom80", "fix-it")
    .addTo(controller);

    var scene12 = new ScrollMagic.Scene({
      triggerElement: ".bottom90",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 9) -360
    })
    .setClassToggle(".bottom90", "fix-it")
    .addTo(controller);

    var scene13 = new ScrollMagic.Scene({
      triggerElement: ".bottom100",
      duration: "100%",
      offset: -$win.height()/2 + ($win.height()/10 * 10) -400
    })
    .setClassToggle(".bottom100", "fix-it")
    .addTo(controller);



    var scene14 = new ScrollMagic.Scene({
      triggerElement: ".ooze-container", 
      duration: $win.height()/2
    })
    .addTo(controller)
    .on("progress", function (e) {
      var prog = e.progress.toFixed(3);

      $scope.prog = prog;
      $scope.progHeight = $win.height()/3 * prog;
      $scope.$apply();
    });



  }
  initParallax()

});
