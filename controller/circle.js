angular.module("myApp").controller('', function($scope) {

  var canvas = new fabric.Canvas('canvas', {selection: false});
  var circle, isDown, origX, origY;
  canvas.on('mouse:down', function(o) {
    isDown =true;
    var pointer = canvas.getPointer(o.e);
    origX=pointer.x;
    origY=pointer.y;
    console.log(origX+","+origY);
    var pointer = canvas.getPointer(o.e);
    circle = new fabric.Circle({
       left: pointer.x,
       top: pointer.y,
       radius: 1,
       strokeWidth: 1,
       stroke: 'red',
       fill: 'rgba(255,0,0,0.5)',
       transparentCorners: false,
       selectable: true,
       originX: 'center', originY: 'center'
     });
     canvas.add(circle);
   });
   canvas.on('mouse:move', function(o){
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);
  circle.set({ radius: Math.abs(origX - pointer.x) });
  canvas.renderAll();
});
 canvas.on('mouse:up', function(o){
  isDown = false;
  });
});
