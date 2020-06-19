Array.prototype.html = function(html) { var that = this; return new Promise(function(resolve, reject) { var i=0, elems=[]; elems.forEach.call(that, function(a) { a.innerHTML = html; }); resolve(that[0]); return that[0]; }); };
Element.prototype.find = function(elem) { return this.querySelector(elem); };
window.all = function(str) { return document.querySelectorAll(str); };
window.byId = s => { return document.getElementById(s); }
window.qs = s => { return document.querySelector(s); }
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }
function ajax(url, settings) { //console.log(url,settings);
  return new Promise((resolve, reject) => { var req;
    if(settings && settings.dataType === 'POST') { req = new Request(url, { method: 'POST', body: (settings.data ? JSON.stringify(settings.data) : null), headers: new Headers() }); } else { req = url; }
    fetch(req).then(response => response.text()).then(res => { try { resolve(res); } catch(e) { resolve(e); } });
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