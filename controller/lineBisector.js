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


        var p3Dis = ((point2.y - point1.y) * (point3.x - point1.x) - (point2.x - point1.x) * (point3.y - point1.y));
        var p3Norm = p3Dis / (Math.pow((point2.y - point1.y), 2) + Math.pow((point2.x - point1.x), 2));

        var p4X = point3.x - p3Norm * (point2.y - point1.y);
        var p4Y = point3.y + p3Norm * (point2.x - point1.x);

        var a = Math.sqrt(Math.pow((p4X - point3.x), 2) + Math.pow((p4Y - point3.y), 2));
        var b = Math.sqrt(Math.pow((p4X - point2.x), 2) + Math.pow((p4Y - point2.y), 2));
        var c = Math.sqrt(Math.pow((point2.x - point3.x), 2) + Math.pow((point2.y - point3.y), 2));
        var theta = Math.acos((b * b + a * a - c * c)) / (2 * b * c);
        var rtd = theta * Math.PI / 180;
        console.log(String.valueOf(rtd));

        context.moveTo(point3.x, point3.y)
        context.lineTo(p4X, p4Y);
        context.stroke();
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
