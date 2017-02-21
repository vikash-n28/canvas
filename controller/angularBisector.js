angular.module("myApp").controller('', function($scope) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var points = [];
    var lastPos;
    var mousePos;
    var isDown = false;

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
