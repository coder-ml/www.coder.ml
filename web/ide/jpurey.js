Array.prototype.addClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.add(name) : null; } } else { that[0].classList.add(name); } return that; };
Array.prototype.html = function(html) { var that = this; return new Promise(function(resolve, reject) { var i=0, elems=[]; elems.forEach.call(that, function(a) { a.innerHTML = html; }); resolve(that[0]); return that[0]; }); };
Array.prototype.removeClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.remove(name) : null; } } else { that[0].classList.remove(name); } return that; };
Array.prototype.siblings = function(name) { var i=0, elems=[], that = this[i]; elems.forEach.call(that.parentNode.children, function(a, b, c) { if(a !== that) { elems[i] = a; i++; } }); return elems; };
Array.prototype.toggleClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.hasClass(name) ? it.classList.remove(name) : it.classList.add(name); } } else { that[0].hasClass(name) ? that[0].classList.remove(name) : that[0].classList.add(name); } return that; };
Element.prototype.hasClass = function(n) { return new RegExp(' ' + n + ' ').test(' ' + this.className + ' '); };
Element.prototype.find = function(elem) { return this.querySelector(elem); };
window.all = function(str) { return document.querySelectorAll(str); };
window.byId = s => { return document.getElementById(s); }
window.qs = s => { return document.querySelector(s); }
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }
function ajax(url, settings) { 
  return new Promise((resolve, reject) => { var req;
      fetch(new Request(url, settings)).then(response => response.text()).then(res => { 
        try { resolve(res); } 
        catch(e) { resolve(e); }
      });
  });
}