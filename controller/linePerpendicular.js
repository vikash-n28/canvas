angular.module("myApp").controller('canvasCtrl', function($scope) {
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

        if (points.length == 2) {
            drawLines(points[0], points[1]);
        }
        if (points.length == 3) {
            for (var i = 0; i < points.length - 1; i++) {
                if (points[i] != null) {
                    drawPerpendicular(points[0], points[1], points[2]);
                }
            }
        }
        if (points.length > 2) {
            points = [];
        }

    }, false);

    canvas.addEventListener('mouseup', function(evt) {
        isDown = false;
    }, false)

    function drawPerpendicular(point1, point2, point3) {

        //Perpendicular Bisector from the midPoint
        var r1X = (point2.x - point1.x) / 2;
        var r1Y = (point2.y - point1.y) / 2;
        var lineSlope1 = (point2.y - point1.y) / (point2.x - point1.x);
        var perpendicularSlope1 = -(1 / lineSlope1);
        var yIntercept1 = r1Y - (r1X * perpendicularSlope1);
        //  context.beginPath();
        //  context.moveTo(r1X,r1Y);
        //  context.lineTo((perpendicularSlope1*r1X + yIntercept1),(perpendicularSlope1*r1Y + yIntercept1));
        //  context.stroke();

        //Perpendicular Bisector from 3rd random Point on line
        var lineSlope = (point3.y - point1.y) / (point3.x - point1.x);
        console.log(lineSlope);
        var perpendicularSlope = -(1 / lineSlope);
        var yIntercept = point3.y - (point3.x * perpendicularSlope);

        //Normalising homogeneous coordinates.
        var r2x = ((perpendicularSlope * point3.x + yIntercept) - point3.x);
        var r2y = ((perpendicularSlope * point3.y + yIntercept) - point3.y);
        var r2 = Math.sqrt(r2x * r2x + r2y * r2y);
        //finding opposite coordinate having same distance
        var x4 = point3.x + r2 * (point3.x - (perpendicularSlope * point3.x + yIntercept)) / r2;
        var y4 = point3.y + r2 * (point3.y - (perpendicularSlope * point3.y + yIntercept)) / r2;

        context.beginPath();
        context.moveTo(point3.x, point3.y);
        context.lineTo(perpendicularSlope * point3.x + yIntercept, perpendicularSlope * point3.y + yIntercept);
        context.lineTo(x4, y4);
        context.closePath();
        context.stroke();
    }

    /**
     *@method - drawLine
     */
    function drawLines(point1, point2) {
        context.moveTo(point1.x, point1.y);
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
