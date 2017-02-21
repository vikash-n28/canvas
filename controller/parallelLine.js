angular.module("myApp").controller('', function($scope) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var points = [];
    var lastPos;
    var mousePos;
    var isDown = false;

    canvas.addEventListener('mousedown', function(evt) {
        isDown = true;
        lastPos = getMousePos(canvas, evt);
        points.push(lastPos);
        drawPoints(lastPos.x, lastPos.y);

        if (points.length <= 2) {
          for (var i = 0; i < points.length; i++) {
              if (points[i] != null) {
                  drawLines(points[0], points[1]);
              }
          }
        }
        if (points.length > 2) {
            for (var i = 2; i < points.length; i++) {
                if (points[i] != null) {
                    drawParallel(points[0], points[1], points[i]);
                }
            }
        }
    }, false);

    canvas.addEventListener('mouseup', function(evt) {
        isDown = false;
    }, false)

    /**
     *@method - drawPerpendiculars
     */
    function drawParallel(point1, point2, point3) {

         var line1x = (point2.x - point1.x);
         var line1y = (point2.y - point1.y);
         var line1 = Math.sqrt(line1x*line1x + line1y*line1y);
         var line1Slope = line1y/line1x;
         var parallelSlope = line1Slope;
         console.log(parallelSlope);  //Condition for parallel, i.e; slopes are equals
         var yIntercept = point3.y -(point3.x * parallelSlope);

         //Normalising homogeneous coordinates.
         var r2x = ((parallelSlope * point3.x + yIntercept) - point3.x);
         var r2y = ((parallelSlope * point3.y + yIntercept) - point3.y);
         var r2 = Math.sqrt(r2x * r2x + r2y * r2y);
         //finding opposite coordinate having same distance
         var x4 = point3.x + r2 * (point3.x - (parallelSlope * point3.x + yIntercept)) / r2;
         var y4 = point3.y + r2 * (point3.y - (parallelSlope * point3.y + yIntercept)) / r2;

         context.beginPath();
         context.moveTo(point3.x, point3.y);
         context.lineTo(parallelSlope * point3.x + yIntercept, parallelSlope * point3.y + yIntercept);
         context.lineTo(x4, y4);
         context.closePath();
         context.stroke();
    }

    /**
     *@method - drawLine -use to draw line b/w two points
     */
    function drawLines(point1, point2) {
        context.moveTo(point1.x, point1.y);
        context.lineWidth = 2;
        context.lineTo(point2.x, point2.y);
        context.stroke();
    }

    /**
     *@method - drawPoints
     */
    function drawPoints(x, y) {
        context.beginPath();
        context.fillstyle = 'black';
        context.arc(x, y, 2, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        context.stroke();
    }

    /**
     *@method - getMousePos - to get coordinate of current pointer
     */
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
});
