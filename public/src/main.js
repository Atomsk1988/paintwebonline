$( document ).ready(function() {
    console.log( "ready!" );


	var hammertime = new Hammer(document.body, {});
	hammertime.on('pan', function(ev) {
	    //console.log(ev);
	});


	hammertime.on("hammer.input", function(ev) {
	  // console.log($('canvas'));


	   if($(ev.target)[0] == $('canvas.paintweb_bufferCanvas')[0]){
	   		//console.log(ev);
	   		touchHandler(ev.srcEvent);
	   }
	});
  $(document).on('configChange', function(e){
   //console.log('*',e.originalEvent.detail.config.value);
   var ev_data = {value:e.originalEvent.detail.config.value , previousValue:e.originalEvent.detail.config.previousValue, config:e.originalEvent.detail.config.config, group:e.originalEvent.detail.config.group ,groupRef:e.originalEvent.detail.config.groupRef }
    steps.push(ev_data);
    sendData(ev_data);
  });
   $(document).on('toolChange', function(e){
    //console.log('*',e.originalEvent);
    steps.push(e.originalEvent.detail);
    sendData(e.originalEvent.detail);
  });
});

var steps = Array();

function touchHandler(event){
  if(event.changedTouches && event.changedTouches.length>0){
   
  }
   
  var type = "";
  switch(event.type){
    case "touchstart": type = "mousedown"; break;
    case "touchmove":  type="mousemove"; break;        
    case "touchend":   type="mouseup"; break;
    //default: return;
  }

    
    if(type!=''){
      var touches = event.changedTouches,
      first = touches[0];
      ev = simulateEv(first.screenX,first.screenY,first.clientX,first.clientY);

      first.target.dispatchEvent(ev);
     // console.log(first.target,'-_-')
    }
    type = (type=='')?event.type:type;
     switch(type){
      case 'mousedown':
        console.log('mousedown');
        steps.push([[event.screenX,event.screenY,event.clientX,event.clientY,'mousedown']]);
        index = steps.length-1;
      break;
      case 'mousemove':
        console.log('mousemove');
        steps[index].push([event.screenX,event.screenY,event.clientX,event.clientY,'mousemove']);
      break;
      case 'mouseup':
        console.log('mouseup');
        steps[index].push([event.screenX,event.screenY,event.clientX,event.clientY,'mouseup']);
        index = null;
        sendData(steps[index]);
      break;
    }

    event.preventDefault();
}
var sendData = function(data){
  console.log(steps);
  
  var headers = {
    'Content-Type': 'application/json',
    //'Content-Length': JSON.stringify(data)
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/data",
    dataType: 'json',
    data: JSON.stringify(steps),
    headers: headers
  })
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });
  }
var simulateEv = function(sx,sy,cx,cy){
  var simulatedEvent = document.createEvent("MouseEvent");
    //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //           screenX, screenY, clientX, clientY, ctrlKey, 
    //           altKey, shiftKey, metaKey, button, relatedTarget);
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              sx, sy, 
                              cx, cy, false, 
                              false, false, false, 0, null);
    return simulatedEvent;
}
var replicateSteps = function(steps){
  //console.log(steps);
}
