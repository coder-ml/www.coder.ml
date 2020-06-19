Array.prototype.css = function(p) { for (var key in p) { p.hasOwnProperty(key) ? this[0].style[key] = p[key] : null; } return this; };
Array.prototype.fams = function(p) { var i=0, elems=[], that = this; elems.forEach.call(this.parentNode.children, function(a) { if(p !== i) { elems[i] = a; i++; } }); return elems; };
Array.prototype.html = function(html) { var that = this; return new Promise(function(resolve, reject) { var i=0, elems=[]; elems.forEach.call(that, function(a) { a.innerHTML = html; }); resolve(that[0]); return that[0]; }); };
Array.prototype.children = function(a) { return a ? $(this[0].childNodes[a]) : $(this[0].childNodes); };
Array.prototype.scrollLeft = function(x) { this.scrollLeft=x; };
Array.prototype.remove = function() { this.forEach(function(a) { a.remove(); }); return this; };
Array.prototype.siblings = function(name) { var i=0, elems=[], that = this[i]; elems.forEach.call(that.parentNode.children, function(a, b, c) { if(a !== that) { elems[i] = a; i++; } }); return elems; };
Array.prototype.addClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.add(name) : null; } } else { that[0].classList.add(name); } return that; };
Array.prototype.attr = function(p) { var i=0, elems=[]; elems.forEach.call(this, function(a) { for (var key in p) { p.hasOwnProperty(key) ? a.setAttribute(key, p[key]) : null; } }); return this; };
Array.prototype.parent = function() { var that = (this.length>1) ? that = this[0] : this; return that.parentNode; };
Array.prototype.muuri = function() { for(var i = 0; i < this.length; i++) { this[i] = new Muuri(this[i], { dragEnabled: false, layoutOnResize: true }); } };
Array.prototype.removeClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.remove(name) : null; } } else { that[0].classList.remove(name); } return that; };
Array.prototype.toggleClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.hasClass(name) ? it.classList.remove(name) : it.classList.add(name); } } else { that[0].hasClass(name) ? that[0].classList.remove(name) : that[0].classList.add(name); } return that; };
Element.prototype.find = function(elem) { return this.querySelector(elem); };
Element.prototype.hasClass = function(n) { return new RegExp(' ' + n + ' ').test(' ' + this.className + ' '); };
Element.prototype.index = function() { var whl = this; [].forEach.call(whl.parentNode.children, function(a, b, c) { if(a === whl) { whl = b; } }); return whl; };
Element.prototype.insertAfter = function(a) { a.parentNode.insertBefore(this, a.nextElementSibling); return this; };
Element.prototype.isEmpty = function () { return this.hasChildNodes() ? false : true; };
Element.prototype.loadImage = function() { this.style.backgroundImage = this.dataset.img; this.removeAttribute('data-img'); };
Element.prototype.null = function() { this.value=''; return this; };
Element.prototype.on = (events,handler,useCapture) => {
  if(events === "") { throw 'on: '+'please supply an array of eventstrings '+'(like ["click","mouseover"])'; } else { events = events.split(' '); }
  for (var i=0;i<events.length;i+=1){ this.addEventListener(events[i],handler,useCapture); }
}
Element.prototype.off = (events,handler,useCapture) => {
  if(events === "") { throw 'off: '+'please supply an array of eventstrings '+'(like ["click","mouseover"])'; } else { events = events.split(' '); }
  for (var i=0;i<events.length;i+=1){ this.removeEventListener(events[i],handler,useCapture); }
}
Element.prototype.offset = function(r) { r = this.getBoundingClientRect(); return { top: r.top + (window.pageYOffset || document.documentElement.scrollTop), left: r.left + (window.pageXOffset || document.documentElement.scrollLeft) } };
Element.prototype.prev = function() { var that = (this.length>1) ? that = this[0] : this; return that.previousArraySibling; };
Element.prototype.scrollDown = function(s) { this.scrollTop=s; return this; };
Element.prototype.toggleClass = function(c) { this.hasClass(c) ? this.classList.remove(c) : this.classList.add(c); return this; };
String.prototype.extractImageUrl = function () { return this.replace(/^url\(["']?/, '').replace(/["']?\)$/, ''); }
String.prototype.getParam = function (i) { return this.replace(/(^\w+:|^)\/\//, '').split('/').slice(i+1)[0]; };
String.prototype.hash = function(state=this.valueOf(),g=[]) { 
  state.split('/').forEach((a,i) => { g[i] = a; }); 
  g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
};
String.prototype.hashBang = function (title) { history.pushState(this,title,this); document.body.dataset.href = this; };
String.prototype.jump = function (e) { history.length === 0 ?  this.dataset.href.goTo() : window.history.back(); console.log(history.length); }
String.prototype.param = function(i, j=[]) { for (i = 0; i < this.valueOf().replace(/(^\w+:|^)\/\//, '').split('/').length; i++) { j.push(this.valueOf().getParam(i)); } };
String.prototype.newTab = function (a,b) { var that = this.valueOf(), c = b ? a : a.prevArraySibling, t = document.createArray('div'); return new Promise(function(resolve, reject) { a.parentNode.insertBefore(t.attr({'class': 'whl', 'data-href':that}), c);  resolve(that); }); };
window.all = function(str) { return document.querySelectorAll(str); };
window.byId = id => { return document.getElementById(id); }
window.qs = function(str) { return document.querySelector(str); };
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }