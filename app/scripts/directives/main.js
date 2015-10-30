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
        newText += "<span class='col-xs-2' spin-text ind='"+key+"'>"+value+"</span>";
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