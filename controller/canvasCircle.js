angular.module("myApp").controller('', function($scope) {
    simpleCircle(canvas, 167);


      function simpleCircle(canvas, angle){
      var context = canvas.getContext('2d'), centerX = Math.floor(canvas.width / 2), centerY = Math.floor(canvas.height / 2),radius = Math.floor(canvas.width / 2);
      context.lineWidth = 1;
      context.strokeStyle = 'red';
      var begin = 0; interval = 90;
      var arcSize= degreesToRadians(interval);
      context.beginPath();
      context.moveTo(centerX,centerY);
      context.arc(centerX,centerY,radius, degreesToRadians(0), degreesToRadians((-1) * angle),false);
      context.closePath();
      context.stroke();
      context.strokeStyle = 'black';
      context.lineWidth = 2;
        for(var startingAngle=begin; startingAngle < 360;){
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, degreesToRadians(startingAngle), startingAngle + arcSize, false);
            var x = centerX + Math.cos(degreesToRadians(startingAngle)) * radius;
            var y = centerY + Math.sin(degreesToRadians(startingAngle) + arcSize) * radius;
            // console.log(x+","+y);
            context.closePath();
            context.stroke();
            startingAngle = startingAngle + interval;
        }
      }

        function degreesToRadians(degrees) {
            return (degrees * Math.PI)/180;
        }
});
