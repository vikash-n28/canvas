angular.module("myApp").controller('', function($scope) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var points = [];
    var isDown;


    canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        points.push(mousePos);
        isDown = true;
        if (points.length <= 3) {
            drawPoint(mousePos.x, mousePos.y);
            getDistance(points[0], points[1], points[2]);

        } else {
            console.log("valid input", points);
        }
    }, false);

    function getDistance(center, point1, point2) {
        console.log(center, point1, point2);

        // distance between centre and point1
        var r1X = point1.x - center.x;
        var r1Y = point1.y - center.y;
        var r1 = Math.sqrt(r1X * r1X + r1Y * r1Y);
        console.log("distance1", r1);
        context.moveTo(center.x, center.y);
        context.lineTo(point1.x, point1.y);

        // distance between centre and point1
        var r2X = point2.x - center.x;
        var r2Y = point2.y - center.y;
        var r2 = Math.sqrt(r2X * r2X + r2Y * r2Y);
        console.log("distance2", r2);
        //  joining line between points
        context.moveTo(center.x, center.y);
        context.lineTo(point2.x, point2.y);
        context.closePath();
        context.stroke();


        // getting point between point1 and point2
        var dxX = point2.x - center.x / r2;
        var dyY = point2.y - center.y / r2;
        var x3 = center.x + r1 * dxX;
        var y3 = center.y + r1 * dyY;


        // getting distance from the center to midPoint
        var r3X = x3 - center.x;
        var r3Y = y3 - center.y;
        var r3 = Math.sqrt(r3X * r3X + r3Y * r3Y);
        // console.log("distance", r3);

        var segs = Math.ceil(Math.abs(360) / 1);
        var segAngle = 360 / segs;
        var theta = -(segAngle / 180) * Math.PI;
        var startAngle = 0;
        var angleMid;
        var angle = -(startAngle / 180) * Math.PI;

        for (var i = 0; i < segs; i++) {
            angle = angle + theta;
            var angleMid = angle - (theta / 2);
            var endX = center.x + Math.cos(angle) * (r1);
            var endY = center.y - Math.sin(angle) * (r1);
            var cpX1 = center.x + Math.cos(angleMid) * ((r1) / Math.cos(theta / 2));
            var cpY1 = center.y - Math.sin(angleMid) * ((r1) / Math.cos(theta / 2));
            var d1 = calDistance(point1, {
                x: endX,
                y: endY
            });
            var d2 = calDistance(point1, {
                x: cpX1,
                y: cpY1
            });
            if ((d1 < 1) || (d2 < 1)) {
                startAngle = angle;
                break;
            }

        }

        context.beginPath();
        context.moveTo(endX, endY);
        for (var i = 0; i < segs; i++) {
            angle += theta;
            angleMid = angle - (theta / 2);
            endX = center.x + Math.cos(angle) * (r1);
            endY = center.y - Math.sin(angle) * (r1);
            cpX1 = center.x + Math.cos(angleMid) * ((r1) / Math.cos(theta / 2));
            cpY1 = center.y - Math.sin(angleMid) * ((r1) / Math.cos(theta / 2));

            var d1 = calDistance({
                x: x3,
                y: y3
            }, {
                x: endX,
                y: endY
            });
            var d2 = calDistance({
                x: x3,
                y: y3
            }, {
                x: cpX1,
                y: cpY1
            });
            if ((d1 < 2) || (d2 < 2)) {
                angle += theta;
                context.quadraticCurveTo(cpX1, cpY1, endX, endY);
                break;
            }
            context.quadraticCurveTo(cpX1, cpY1, endX, endY);
        }
        // context.fill();
        context.stroke();
    }

    function calDistance(pd1, pd2) {
        var diff1 = pd2.x - pd1.x;
        var diff2 = pd2.y - pd1.y;
        return Math.sqrt((diff1 * diff1) + (diff2 * diff2));
    }

    function drawPoint(x, y) {
        context.beginPath();
        context.fillstyle = 'black';
        context.arc(x, y, 3, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
        context.stroke();
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
});
