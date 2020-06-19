Array.prototype.html = function(html) { var that = this; return new Promise(function(resolve, reject) { var i=0, elems=[]; elems.forEach.call(that, function(a) { a.innerHTML = html; }); resolve(that[0]); return that[0]; }); };
Element.prototype.find = function(elem) { return this.querySelector(elem); };
Element.prototype.index = function() { var whl = this; [].forEach.call(whl.parentNode.children, function(a, b, c) { if(a === whl) { whl = b; } }); return whl; };
window.all = function(str) { return document.querySelectorAll(str); };
window.byId = s => { return document.getElementById(s); }
window.qs = s => { return document.querySelector(s); }
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }
function ajax(url,params) { //console.log(url,params);
  return new Promise((resolve, reject) => { var req;
    var body = params && params.body ? JSON.stringify(params.body) : null;
    var vars = params && params.vars ? params.vars : null;
    if(params && params.dataType === 'POST') { 
      req = new Request(url, { method: 'POST', body: body, headers: new Headers() }); 
    } else { req = url; }
    fetch(req).then(response => response.text()).then(res => { try { resolve({res,vars}); } catch(err) { resolve({err,vars}); } });
  });
}
function getKey(obj,value) { return Object.keys(obj).find(key => obj[key] === value); };
function pad(str, len) { len = len || 2; var zeros = new Array(len).join('0'); return (zeros + str).slice(-len); } 
function unixTime(format,time) {  
  if(format === '24hr') {
    var date = new Date(time * 1000);
    var formattedTime = parseInt(pad(date.getHours(),2) + pad(date.getMinutes(),2).substr(-2));
  }
  return formattedTime;
}
function shuffle(max) {
  for (var array=[],i=0;i<max+1;++i) array[i]=i; console.log({array});
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  var index = array.indexOf(0);
  array.splice(0,1)
  return array;
}