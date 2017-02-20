angular.module('myApp').controller('', function($scope) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var startX;
    var startY;
    var isDown = false;

    function downOval(x, y) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(startX, startY + (y - startY) / 2);
        context.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        context.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        context.closePath();
        context.stroke();
    }

    function handleMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        isDown = true;
    }

    function handleMouseUp(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        isDown = false;
    }

    function handleMouseOut(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        isDown = false;
    }

    function handleMouseMove(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        drawOval(mouseX, mouseY);
    }

    $("#canvas").mousedown(function(e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function(e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function(e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function(e) {
        handleMouseOut(e);
    });

})
