angular.module('portfolioApp.directives', [])

.directive('rotate', function () {
  return {
    link: function(scope, element, attrs){
      
      var index = attrs.index,
        count = attrs.count,
        distance = 360/count,
        multiply = attrs.multiply,
        css = "transform: rotate(" + (distance*index)*multiply + "deg);";

      attrs.$set('style', css);
    }
  };
})

.directive('fuckWithText', function ($compile) {
  return {
    link: function(scope, element, attrs){
      
      var $this = $(element),
        text = $this.html().split(""),
        newText = "";

      $.each(text, function(key,value){
        console.log(value);
        newText += "<span class='col-fifth' spin-text ind='"+key+"'>"+value+"</span>";
      })

      $this.html($compile(newText)(scope));
    }
  };
})

.directive('spinText', function ($interval, $timeout) {
  return {
    link: function(scope, element, attrs){
      
      var $this = $(element),
        chars = "abcdefghijklmnopqrstuvwxyz",
        initialVal = element.html(),
        key = attrs.ind,
        spinInterval, 
        ind = 0, 
        repetitions = 10;

      $timeout(function(){
        triggerSpin();
      }, key*200)

      element.on('mouseover', triggerSpin);

      function triggerSpin() {
        ind = 0;
        $interval.cancel(spinInterval);
        spinInterval = $interval(spinText, 120, repetitions);
      }

      function spinText() {
        var rand = Math.floor((Math.random() * 26) + 1);
        $this.html(chars[rand]);

        ind +=1;

        if (ind == repetitions-1) {
          $interval.cancel(spinInterval);
          $this.html(initialVal);
        }
      }

    }
  };
})

.directive('spotlight', function(){
    return {
      link: function(scope, element, attrs){
        var $window = $(window);

        $window.on('mousemove', function(e){
          
          var x = e.clientX,
            y = e.clientY,
            w = $window.width(),
            h = $window.height();

          var centerX = w/2,
            centerY = h/2;

          var newX = -x + centerX,
            newY = -y + centerY;

          scope.bgX = newX;
          scope.bgY = newY;
          scope.$apply();
        })
      }
    }
})

.directive('ship', function($timeout, $document){
    return {
      link: function(scope, element, attrs){

        /*scope.$watch('mouseX', function(newValue, oldValue) {
          $timeout(function() {
              scope.waitMouseX = scope.mouseX - 35;
              scope.$apply();
          }, 500);
        });*/

        $document.keydown(function(e){
          if (e.keyCode === 32 || e.charCode === 32) {
            e.preventDefault();
            e.stopPropagation();

            $(element).before('<span class="bullet" style="left:' + (scope.mouseX + 35) + 'px"></span>');

            scope.$apply();
          }
        })
      }
    }
})


