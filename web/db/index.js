String.prototype.goTo = function(b, a = b ? b : [], state = this.valueOf()) {
  return new Promise(function(resolve, reject) {
    if(state) {
      console.log(state); window.location.href=state;
      //getJSON(state+'/index.json', function(data) { console.log(data); });
    }
  });
};
function build(url) {
  return new Promise((resolve, reject) => {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200) { resolve(this.responseText); }
        else if(this.status == 404) { reject('404'); }
      }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  });
}
function byId(id) { return document.getElementById(id); }
function getHTML(url) {
  return new Promise((resolve, reject) => {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200) { resolve(this.responseText); }
        else if(this.status == 404) { reject('404'); }
      }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  });
}
function getJSON(url, callback) {
  var req = new XMLHttpRequest(),
    onLoad = function(event) {
      if(req.status >= 400) { onFail(event); }
      else { callback(JSON.parse(this.responseText)); }
    },
    onFail = function(event) {callback(new Error('...')); }
  req.addEventListener('load', onLoad);
  req.addEventListener('error', onFail);
  req.addEventListener('abort', onFail);
  req.open('GET', url); req.send();
}
function init() { 
  window.location.href === window.location.origin+'/db/' ? 
  getHTML('/db/table.html').then(e => { byId('content').innerHTML = e; }) :
  getJSON(window.location.pathname+'/index.json', function(e) { byId('content').innerHTML = '<pre>'+JSON.stringify(e, null, 4)+'</pre>'; });
}
getJSON('/db/tables.json', function(tables) {
  html  = '<div id="logo" class="logo">';
    html += '<div class="icon"></div>';
    html += '<div class="titling">';
      html += '<div>Cache Archive</div>';
      html += '<div>Database Manager</div>';
    html += '</div>';
  html += '</div>';
  html += '<div id="tables" class="tables">';
  tables.forEach(function(table){ html += '<div class="table" onclick="\'/db/'+table+'\'.goTo()">'+table+'</div>'; });
  html += '</div>';
  byId('nav').innerHTML = html;
});