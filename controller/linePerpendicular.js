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


        if (points.length == 3) {
            for (var i = 0; i < points.length - 1; i++) {
                if (points[i] != null) {
                    drawLines(points[0], points[1]);
                    drawPerpendicular(points[0], points[1], points[2]);
                }
            }
        }

    }, false);

    canvas.addEventListener('mouseup', function(evt) {
        isDown = false;
    }, false)

    function drawPerpendicular(point1, point2, point3) {
        var r1X = (point2.x - point1.x) / 2;
        var r1Y = (point2.y - point1.y) / 2;
        var lineSlope = (point2.y - point1.y) / (point2.x - point1.x);
        var perpendicularSlope = -(1 / lineSlope);
        var yIntercept = r1Y - (r1X * perpendicularSlope);
        context.beginPath();
        context.moveTo(r1X, r1Y);
        context.lineTo(r1X, (perpendicularSlope * r1Y + yIntercept));
        context.stroke();

        var rX = (point3.x - point1.x);
        var rY = (point3.y - point1.y);
        var line1Slope


    }


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

    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
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
