var simulateEv = function(sx,sy,cx,cy,type){
	//console.log(type)
	var simulatedEvent = document.createEvent("MouseEvent");
	//initMouseEvent(type, canBubble, cancelable, view, clickCount, 
	//           screenX, screenY, clientX, clientY, ctrlKey, 
	//           altKey, shiftKey, metaKey, button, relatedTarget);
	simulatedEvent.initMouseEvent(type, true, true, window, 1, 
	                          sx, sy, 
	                          cx, cy, false, 
	                          false, false, false, 0, null);
	//console.log($('.paintweb_bufferCanvas')[0]);
	$('.paintweb_bufferCanvas')[0].dispatchEvent(simulatedEvent);
}
var replicateSteps = function(steps){
	//console.log(steps);

	steps[0].data.forEach(function(c, i, a){
		//console.log(c,i,a);
		//Discriminate between arrays & objects
		switch(Object.prototype.toString.call(c)){
			case '[object Array]':
			//Mouse movements
				/*
				c.forEach(function(c1, i1, a1){
					switch(i1){
						case 0:
						//console.log(i1);
						console.log(c1);
						simulateEv(c1[0],c1[1],c1[2],c1[3],'mousedown');
						break;
						case (a.length-1):
						//console.log(i1);
						simulateEv(c1[0],c1[1],c1[2],c1[3],'mouseup');
						break;
						default:
						//console.log(i1);
						simulateEv(c1[0],c1[1],c1[2],c1[3],'mousemove');
						break;
					}
				});*/
			break;
			/*case 'mousedown':
			case 'mouseup':
			case 'mousemove':

			break; */
			default:
			//Tool change or config change
				
				if(c.toolId!=null{
					pw.toolActivate(c.toolId);
					console.log('lho');
				}else{
					//var ev = new appEvent.configChange(strokeStyle, fillStyle, 'fillStyle', '', _self.config);
   			 		//_self.events.dispatch(ev);
   			 		console.log('-_-',c);
   			 		pw.events.dispatch(new appEvent.configChange(c.value, c.previousValue,c. config, c.group,c.groupRef));
				}
			break;
		}
		/**/
	})	
}
$( document ).ready(function() {

	$('#play').on('click', function(e){
		replicateSteps(paint);
	});
	
	


});