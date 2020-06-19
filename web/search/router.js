window.error = {
  "200": "OK",
  "201": "Created",
  "204": "No Content",
  "304": "Moved Permanently",
  "400": "Bad Request",
  "401": "Unauthorized",
  "404": "Not Found",
  "406": "Not Acceptable",
  "409": "Conflict",
  "500": "Internal Server Error"
}
window.config = {
  excludes: {
    section: ['my', 'random', 'containers']
  }
}
String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) {
  return new Promise(function(resolve, reject) {
    path ? view(path).then(path => load(path).then(path => resolve(path), err => reject(err))) : reject({error:error["404"]});
  });
};
function view(path) {
  return new Promise(function(resolve, reject) {
    if(path === '/') {
        ajax(window.location.protocol+'//db.'+window.app+'.'+api.tld()+'/v1/read/photo/index.json').then((j,json=JSON.parse(j)) => {
          console.log({json});
          var mosaic = byId('photo-mosaic');
          var sections = mosaic.children;
          var values = Object.values(json);
          if(values.length>0) { var x=0; do {
            var section = sections[x];
            var row = json[x+1];
            console.log(x,{section,row});
            section ? section.style.backgroundImage = 'url('+row+')' : null;
          x++; } while(x<=values.length); }
        });
        ajax(window.location.protocol+'//db.'+window.app+'.'+api.tld()+'/v1/read/video/index.json').then((j,json=JSON.parse(j)) => {
          console.log({json});
          var mosaic = byId('latest-videos');
          var sections = mosaic.children;
          var values = Object.values(json);
          if(values.length>0) { var x=0; do {
            var section = sections[x];
            var row = json[x+1];
            console.log(x,{section,row});
            section ? section.querySelector('picture').style.backgroundImage = 'url(https://img.youtube.com/vi/'+yt.id(row)+'/0.jpg)' : null;
          x++; } while(x<=values.length); }
        });
        resolve(path); 
    }
    else { resolve(path); }
  });
}
function load(path) {
  return new Promise(function(resolve, reject) {

    history.pushState(path,'Coder | Web IDE',path); 
    document.body.removeAttribute('data-load');
    document.body.dataset.path = path;
    var GOT = window.GET = route.dir(path);

    if(GOT[0]) { //USER

      if(GOT[0] === 'blogs') { }

      else if(GOT[0] === 'merch') { }

      else if(GOT[0] === 'photo') { }

      else if(GOT[0] === 'video') { }

    } else {

      resolve(path);

    }

  });
}
window.route = {
    dir: (url,g=[]) => {    
        url.split('/').forEach((a,i) => { g[i] = a; }); 
        g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
    },
    url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
}
window.error = code => ajax('/cdn/html/error-'+code+'.html').then(a=>popup.page(a));