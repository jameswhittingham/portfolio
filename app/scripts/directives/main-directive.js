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
        classes = ['fontA','fontB','fontC','fontD',],
        initialVal = element.html(),
        key = attrs.ind,
        spinInterval, 
        ind = 0, 
        repetitions = 10, 
        classIncrement = 0;

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

      //Listen to the init map event to be triggered
      document.addEventListener("explode", function(e) {
        var pos = $this.offset(),
          letterLeft = pos.left,
          letterRight = letterLeft + $this.width(),
          bulletLeft = e.detail.x;
          
        if ((bulletLeft > letterLeft) && ( bulletLeft < letterRight)) {
          triggerSpin();

          $this.removeClass(classes[classIncrement])
          if (classIncrement<classes.length) {
            classIncrement +=1;
          } else {
            classIncrement = 0;
          }


          $this.addClass(classes[classIncrement])
        }
      });

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

.directive('ship', function($timeout, $document, $compile, $document){
    return {
      link: function(scope, element, attrs){

        $document.keydown(function(e){
          if (e.keyCode === 32 || e.charCode === 32) {
            e.preventDefault();
            e.stopPropagation();

            var template = '<bullet class="bullet-outer" style="left:' + (scope.mouseX + 35) + 'px;"></bullet>',
            ship = $document.find(element);
            ship.before($compile(template)(scope));
          }
        })

      }
    }
})

.directive('bullet', function($timeout, $interval, $compile){
    return {
      //replace: true,
      scope: { top: '@', cls: '@' },
      template: '<span class="bullet {{cls}}" style="top:-{{top}}px;"></span>',
      link: function(scope, element, attrs){
        var midpoint = window.innerHeight*0.41;//window.innerHeight/2 - 75;
        scope.top = 0;

        var thisInterval = $interval(function(){

          if (midpoint>scope.top) {
            scope.top += 50;
          } else {
            scope.cls = "explode";

            $interval.cancel(thisInterval);

            // Create the event
            var event = new CustomEvent("explode", { 'detail': { x: scope.$parent.mouseX } });
            // Fire the event
            document.dispatchEvent(event);



          };

        }, 90)

      }
    }
})


