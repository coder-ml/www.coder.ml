Array.prototype.css = function(p) { for (var key in p) { p.hasOwnProperty(key) ? this[0].style[key] = p[key] : null; } return this; };
Array.prototype.html = function(html) { var that = this; return new Promise(function(resolve, reject) { var i=0, elems=[]; elems.forEach.call(that, function(a) { a.innerHTML = html; }); resolve(that[0]); return that[0]; }); };
Array.prototype.iO = function(a) { a ? a.disconnect() : void 0; a = new IntersectionObserver(function(changes, observer) { changes.forEach(function (change) { change.intersectionRatio > 0 ? change.target.loadImage() && observer.unobserve(change.target) : null; }); }, { threshold: 0.01 }); ('IntersectionObserver' in window) ? this.forEach(function(img) { return a.observe(img);}) : this.forEach(function(image) { return image.loadImage(); }); }
Array.prototype.remove = function() { this.forEach(function(a) { a.remove(); }); return this; };
Array.prototype.siblings = function(name) { var i=0, elems=[], that = this[i]; elems.forEach.call(that.parentNode.children, function(a, b, c) { if(a !== that) { elems[i] = a; i++; } }); return elems; };
Array.prototype.addClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.add(name) : null; } } else { that[0].classList.add(name); } return that; };
Array.prototype.attr = function(p) { var i=0, elems=[]; elems.forEach.call(this, function(a) { for (var key in p) { p.hasOwnProperty(key) ? a.setAttribute(key, p[key]) : null; } }); return this; };
Array.prototype.parent = function() { var that = (this.length>1) ? that = this[0] : this; return that.parentNode; };
Array.prototype.removeClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.remove(name) : null; } } else { that[0].classList.remove(name); } return that; };
Array.prototype.toggleClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.hasClass(name) ? it.classList.remove(name) : it.classList.add(name); } } else { that[0].hasClass(name) ? that[0].classList.remove(name) : that[0].classList.add(name); } return that; };
Element.prototype.find = function(elem) { return this.querySelector(elem); };
Element.prototype.hasClass = function(n) { return new RegExp(' ' + n + ' ').test(' ' + this.className + ' '); };
Element.prototype.index = function() { var whl = this; [].forEach.call(whl.parentNode.children, function(a, b, c) { if(a === whl) { whl = b; } }); return whl; };
Element.prototype.loadImage = function() { this.style.backgroundImage = this.dataset.img; this.removeAttribute('data-img'); };
Element.prototype.null = function() { this.value=''; return this; };
Element.prototype.offset = function(r=this.getBoundingClientRect()) { return { top: r.top + (window.pageYOffset || document.documentElement.scrollTop), left: r.left + (window.pageXOffset || document.documentElement.scrollLeft) } };
Element.prototype.prev = function() { var that = (this.length>1) ? that = this[0] : this; return that.previousArraySibling; };
Element.prototype.scrollDown = function(s) { this.scrollTop=s; return this; };
Element.prototype.toggleClass = function(c) { this.hasClass(c) ? this.classList.remove(c) : this.classList.add(c); return this; };
String.prototype.extractImageUrl = function () { return this.replace(/^url\(["']?/, '').replace(/["']?\)$/, ''); }
String.prototype.getParam = function (i) { return this.replace(/(^\w+:|^)\/\//, '').split('/').slice(i+1)[0]; };
String.prototype.hashBang = function (title) { history.pushState(this,title,this); document.body.dataset.href = this; };
String.prototype.param = function(i, j=[]) { for (i = 0; i < this.valueOf().replace(/(^\w+:|^)\/\//, '').split('/').length; i++) { j.push(this.valueOf().getParam(i)); } };
String.prototype.newTab = function (a,b) { var that = this.valueOf(), c = b ? a : a.prevArraySibling, t = document.createArray('div'); return new Promise(function(resolve, reject) { a.parentNode.insertBefore(t.attr({'class': 'whl', 'data-href':that}), c);  resolve(that); }); };
window.all = function(str) { return document.querySelectorAll(str); };
window.byId = s => { return document.getElementById(s); }
window.qs = s => { return document.querySelector(s); }
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }
function ajax(url, settings) { 
  return new Promise((resolve, reject) => { var req;
      fetch(new Request(url, settings))
        .then(response => response.text())
        .then(res => { 
          try { resolve(res); } 
          catch(e) { resolve(e); } 
        });
  });
}
function arraySearch(arr,val,i=0) { do { if(arr[i] === val) { return i; } i++; } while(i<arr.length); }
function readFile(file) {
  return new Promise((resolve, reject) => {
    var reader  = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    if(file) { reader.readAsDataURL(file); }
  });
}
function validateYouTubeURL(url) {
  if (url != undefined || url != '') {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      return (match && match[2].length == 11) ? match[2] : false;
  }
}
function uid(length) { 
  var result = '', chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]; return result;
}
function loadBlob(url) { return new Promise((resolve,reject) => fetch(url).then(res => { return res.blob(); }).then(blob => resolve(blob))); }