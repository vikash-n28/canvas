angular.module("myApp").controller('', function($scope) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var points = [];
    var isDown = false;
    var lastPos;
    var r1X;
    var r1Y;
    var r1;
    var r2X;
    var r2Y;
    var r2;
    var d1;
    var d2;
    var move

    canvas.addEventListener('mousedown', function(evt) {
        isDown = true;
        evt.preventDefault()
        lastPos = getMousePos(canvas, evt);
        points.push(lastPos);
        if (points.length == 2) {
            canvas.addEventListener('mousemove', function(evt) {
                isDown = false;
                evt.preventDefault()
                lastPos = getMousePos(canvas, evt);
                if (points.length != 3 && points.length <= 3) {
                    randomMovement(points[0], points[1], {
                        x: lastPos.x,
                        y: lastPos.y
                    });
                }
            }, false);
        }
        if (points.length <= 3) {
            drawPoints(lastPos.x, lastPos.y);
            getDistance(points[0], points[1], points[2]);
        }
    }, false);

    /**
     *@method - getDistance
     */
    function getDistance(center, point1, point2) {

        // distance between centre and point1
        r1X = point1.x - center.x;
        r1Y = point1.y - center.y;
        r1 = Math.sqrt(r1X * r1X + r1Y * r1Y);

        // joining line between center & point1
        context.moveTo(center.x, center.y);
        context.lineTo(point1.x, point1.y);

        // distance between centre and point1
        r2X = point2.x - center.x;
        r2Y = point2.y - center.y;
        r2 = Math.sqrt(r2X * r2X + r2Y * r2Y);

        // joining line between center & point2
        context.moveTo(center.x, center.y);
        context.lineTo(point2.x, point2.y);
        context.stroke();

        // calling controllingPoint function
        controllingPoint(r1, r2, center, point1, point2);
    }

    /**
     *@method - randomMovement
     */
    function randomMovement(center, point1, point2) {

        r1X = point1.x - center.x;
        r1Y = point1.y - center.y;
        r1 = Math.sqrt(r1X * r1X + r1Y * r1Y);

        r2X = point2.x - center.x;
        r2Y = point2.y - center.y;
        r2 = Math.sqrt(r2X * r2X + r2Y * r2Y);

        //calling clearRecord function
        clearRecord(center, r1);

        //calling controllingPoint function
        controllingPoint(r1, r2, center, point1, point2);
    };


    /**
     *@method - controllingPoint
     */
    function controllingPoint(r1, r2, center, point1, point2) {

        // getting point on point2 that is equalTo radius r1
        var dxX = (point2.x - center.x) / r2;
        var dyY = (point2.y - center.y) / r2;
        var x3 = center.x + (dxX * r1);
        var y3 = center.y + (dyY * r1);

        // getting distance from the center to midPoint
        var r3X = x3 - center.x;
        var r3Y = y3 - center.y;
        var r3 = Math.sqrt(r3X * r3X + r3Y * r3Y);

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
            var cpX1 = center.x + Math.cos(angleMid) * ((r3) / Math.cos(theta / 2));
            var cpY1 = center.y - Math.sin(angleMid) * ((r3) / Math.cos(theta / 2));

            d1 = calDistance(point1, {
                x: endX,
                y: endY
            });
            d2 = calDistance(point1, {
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

            d1 = calDistance({
                x: x3,
                y: y3
            }, {
                x: endX,
                y: endY
            });
            d2 = calDistance({
                x: x3,
                y: y3
            }, {
                x: cpX1,
                y: cpY1
            });

            if ((d1 < 1) || (d2 < 1)) {
                angle += theta;
                context.quadraticCurveTo(cpX1, cpY1, endX, endY);
                break;
            }
            context.quadraticCurveTo(cpX1, cpY1, endX, endY);
        }
        context.stroke();
    }

    /**
     *@method - calDistance
     */
    function calDistance(pd1, pd2) {
        var diff1 = pd2.x - pd1.x;
        var diff2 = pd2.y - pd1.y;
        return Math.sqrt((diff1 * diff1) + (diff2 * diff2));
    }

    /**
     *@method - clearRecord -use to erase previous line
     */
    function clearRecord(center, r1) {
        context.beginPath();
        context.clearRect(center.x - r1 - 1, center.y - r1 - 1, r1 * 2 + 2, r1 * 2 + 2);
        context.closePath();
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
