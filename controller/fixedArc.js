angular.module("myApp").controller('', function($scope) {
    simpleCircle(canvas, 167);

    function simpleCircle(canvas, angle) {
        var context = canvas.getContext("2d");
        var step = 2 * Math.PI / 70;
        var h = 350;
        var k = 450;
        var r = 200;

        context.beginPath();
        // for(var theta=0; theta<1.5*Math.PI; theta+=step){
        //   var x = h + r*Math.cos(theta);
        //   var y = k + r*Math.sin(theta);
        //   console.log(x+","+y);
        //   context.lineTo(x,y);
        // }
        context.moveTo(h, k);
        var x1 = [];
        var y1 = [];
        for (var theta = 1.5 * Math.PI; theta < 1.8 * Math.PI; theta += step) {
            x1.push(h + r * Math.cos(theta));
            y1.push(k - r * Math.sin(theta));
        }
        // console.log(x1,y1);
        var r2 = [];
        for (var i = 0; i < x1.length && i < y1.length; i++) {
            r2.push(Math.sqrt(Math.pow((x1[i] - x1[i + 1]), 2) + Math.pow((y1[i] - y1[i + 1]), 2)));
        }
        // console.log(r2);

        var segs = Math.ceil(Math.abs(360) / 1);
        var segAngle = 360 / segs;
        var theta = -(segAngle / 180) * Math.PI;
        var startAngle = 0;
        var angleMid;
        var angle = -(startAngle / 180) * Math.PI;
        for (var i = 0; i < segs; i++) {
            angle = angle + theta;
            var angleMid = angle - (theta / 2);
            var endX = x1[i] + Math.cos(angle) * (r2[i]);
            var endY = y1[i] - Math.sin(angle) * (r2[i]);
            var cpX1 = x1[i] + Math.cos(angleMid) * ((r2[i]) / Math.cos(theta / 2));
            var cpY1 = y1[i] - Math.sin(angleMid) * ((r2[i]) / Math.cos(theta / 2));
            // console.log(endX,endY,cpX1,cpY1);
            context.quadraticCurveTo(cpX1, cpY1, endX, endY);
        }
        context.closePath();
        context.stroke();
    }
});
