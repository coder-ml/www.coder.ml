window.on = {
    touch: {
        drag: {
            angle: 0,
            direction: '',
            start: { x:0, y:0 }, 
            offset: { x:0, y:0 },      
            percent: { x:0, y:0 },
            distance: { x:0, y:0 },
            wasd: '',
            scroll: 0,
            swipe: null,
            events: ['dragstart', 'dragmove', 'dragend'],
        },
        thresh: { 
            dblTap: () => { return is.mobile() ? 300 : 300  }, 
            drag: 0, 
            hold: () => { return is.mobile() ? 500 : 500  } 
        },
        event: '',
        ghost: 0,
        press: null,
        timer: null,
        now: 0,
        then: 0,
        touches: null,
        blur: target => { event.target.type === 'text' ? null : document.activeElement.blur() },
        handler: (event,type=event.type) => { //console.log({type});
            if (type === "touchstart") { //console.clear();
                on.touch.touches = event.touches; 
                on.touch.now = new Date().getTime(), on.touch.then = on.touch.now - on.touch.ghost;
                on.touch.drag.start.x = on.touch.touches[0].pageX, on.touch.drag.start.y = on.touch.touches[0].pageY;
                if((on.touch.then < on.touch.thresh.dblTap()) && (on.touch.then > 0)) { 
                    on.touch.event = 'dbl';
                    clearTimeout(on.touch.timer); on.touch.timer = null; 
                    on.touch.events(event,on.touch.event,type);
                }
                on.touch.press = setTimeout(() => {
                    on.touch.event= ["dragstart", "dragmove"].includes(on.touch.event) ? 'dragmove' : 'dragstart';
                    clearTimeout(on.touch.press); on.touch.press = null; 
                    clearTimeout(on.touch.timer); on.touch.timer = null; 
                    on.touch.event = "hold"; on.touch.events(event,on.touch.event,type);
                }, on.touch.thresh.hold());
            }
            else if (type === "touchmove") {


                var s = is.overflow(event.target,'Width');
                //console.log(on.touch.event);
                if(on.touch.event==='dragstart') { on.touch.drag.scroll = s ? Math.round(s.scrollLeft) : null; }
                //else {            
                    on.touch.drag.offset.x = event.touches[0].pageX, on.touch.drag.offset.y = event.touches[0].pageY;
                    var origX = on.touch.drag.start.x, origY = on.touch.drag.start.y;
                    on.touch.drag.distance.x = Math.round(Math.abs(on.touch.drag.start.x - on.touch.drag.offset.x));
                    on.touch.drag.distance.y = Math.round(Math.abs(on.touch.drag.start.y - on.touch.drag.offset.y));
                    //var a = Math.abs(on.touch.drag.start.x - on.touch.drag.offset.x), b = Math.abs(on.touch.drag.start.y - on.touch.drag.offset.y), c = Math.sqrt(a*a+b*b);
                    on.touch.event = ["dragstart", "dragmove"].includes(on.touch.event) ? 'dragmove' : 'dragstart';
                    on.touch.drag.percent.x = 100*(on.touch.drag.offset.x-on.touch.drag.start.x)/document.body.clientWidth;
                    on.touch.drag.percent.y = 100*(on.touch.drag.offset.y-on.touch.drag.start.y)/document.body.clientHeight
                    var scroller = on.touch.drag.scroll;
                    var angle = on.touch.drag.angle = Math.abs(Math.atan2(on.touch.drag.offset.y,on.touch.drag.offset.x) * 180 / Math.PI);                
                    if(angle<45 || angle>135) { on.touch.drag.direction = 'horizontal'; }
                    else if(angle>45 || angle<135) { on.touch.drag.direction = 'vertical'; }
                    var direction = on.touch.drag.wasd = Math.sign(on.touch.drag.percent.x);
                    var target = event.target;
                    if(s) {
                        var scrl = s.tagName==='MEDIA' ? true : false;
                        var scw = s.clientWidth, ssw = s.scrollWidth, scb = ssw-scw;
                    } 
                    else { scrl === null; }
                    clearTimeout(on.touch.press); on.touch.press = null;
                    clearTimeout(on.touch.timer); on.touch.timer = null; 
                    var swipe = on.touch.drag.swipe = type !== 'dragstart' && (
                            !scrl
                            || (
                                scrl && (
                                    (scroller===scb && direction===-1)
                                    || (scroller===0 && direction===1)
                                )
                            )
                        )
                    //console.log({s,scrl,scroller,scb,scw,ssw,direction,swipe});
                    swipe ? on.touch.events(event,on.touch.event,type) : null;
                //}

            }
            else if (type == "touchend") {

                    if(["dragstart","dragmove"].includes(on.touch.event)) {

                        clearTimeout(on.touch.press); on.touch.press = null;
                        clearTimeout(on.touch.timer); on.touch.timer = null;                    
                        on.touch.event = 'dragend';
                        on.touch.drag.swipe ? on.touch.events(event,on.touch.event,type) : null;

                    } else {

                        if(on.touch.then===0 || on.touch.then > on.touch.thresh.dblTap()) { 
                                if(on.touch.event==="hold") {
                                    clearTimeout(on.touch.press); on.touch.press = null;
                                    clearTimeout(on.touch.timer); on.touch.timer = null;
                                    //on.touch.events(event,on.touch.event);
                                    on.touch.event = null;
                                } else {
                                    on.touch.timer = setTimeout(() => { 
                                        on.touch.event = 'tap';                 
                                        clearTimeout(on.touch.press); on.touch.press = null;       
                                        clearTimeout(on.touch.timer); on.touch.timer = null; 
                                        on.touch.events(event,on.touch.event,type);
                                    }, on.touch.thresh.dblTap());
                                }

                        }

                    }

                on.touch.ghost = on.touch.now;
                clearTimeout(on.touch.press); on.touch.press = null;
            }
        }
    }
}