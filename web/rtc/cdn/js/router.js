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
String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;
  return new Promise(function(resolve, reject) { //alert(path);
    path ? view(route.page(path)).then(paths => load(paths).then(paths => resolve(paths), err => reject(err))) : reject({error:error["404"]});
  });
};
function view(paths) {
  return new Promise(function(resolve, reject) {
    var page = paths.page;
    var elem = section(page);
    console.log({paths,elem,page});
    var path = routes[elem][paths.dir[0] ? paths.dir[0] : '/'];
    if(page === '/blog/') { 
      //ajax('/cdn/json/posts.json').then((j,json=JSON.parse(j)) => {
        var keys = routes.main.blog;
        //var values = Object.values(json);
        if(keys.length > 0) {
          var k=0; do {
            var key = keys[k];
            if(key) {
              if(k<key.length) {
                var url = '/cdn/html/'+key.slice(1,-1).replace('/','.')+'.html';                            
                !["/cdn/html/blog.#.html", "/cdn/html/blog.html"].includes(url) ? ajax(url,{data:k}).then(html => {
                  var HTML = new DOMParser().parseFromString(html, "text/html");
                  var path = HTML.body.find('.path').dataset.path;
                  var index = getKey(routes.main.blog,path);
                  var title = HTML.body.find('.title').textContent;
                  var post = byId('blogs').children[index];
                  var article = HTML.body.find('.index-about').textContent;      
                  console.log({index,path});  
                  post.find('header').textContent = title;
                  post.find('section > section').textContent = article;
                  post.dataset.path = path;
                  //console.log(index,{post,title,url});
                }) : null;
                resolve(paths);
              }
            } else {
              //console.log({post});
              //post.remove();
            }
          k++; } while(k<dom.blogs.children.length);
        }
      //});
    }
    else if(page === '/blog/#/') { 
      ajax('/cdn/html/blog.'+paths.dir[1]+'.html').then(html => {
         qs('section[data-page="'+paths.page+'"]').innerHTML = html;
         resolve(paths);
      });
    }
    else { resolve(paths); }
  });
}
function load(paths) {
  return new Promise(function(resolve, reject) {
    var container = section(paths.page), page = paths.page, group = byId(container);
    group.dataset.page = paths.page, group.dataset.path = paths.path;
    if(!config.excludes.section.includes(section(paths.page))) {
      document.body.dataset.page = paths.page, document.body.dataset.path = paths.path;
      group.dataset.page = paths.page, group.dataset.path = paths.path;
    }
    history.pushState(paths.state,'uiOS',paths.state); 
    document.body.removeAttribute('data-load')
    window.GET = paths.GOT; 
    resolve(paths);
  });
}
window.error = code => ajax('/cdn/html/error-'+code+'.html').then(a=>popup.page(a));
window.route = {
  page: state => { 
    var GOT = state===window.location.origin ? [] : route.path.dir(state);
    var n = 0, arr1 = [], arr2 = [], view = GOT && GOT[0] ? GOT[0] : '/'; 
    if(GOT.length>0) {
      do { var m = GOT[n];
        if(
          (['blog'].includes(view) && n === 1) ||
          m.includes('#')
        ) { arr1[n] = '#'; arr2[n] = m.replace("#",''); }
        else { arr1[n] = arr2[n] = m; } n++;
      } while(n<GOT.length);
    }
    return {dir:arr2, page:route.path.url(arr1), path:route.path.url(route.path.dir(state.replace('#',''))), state};
  },
  path: {
    dir: (url,g=[]) => {
      url.split('/').forEach((a,i) => { g[i] = a; }); 
      g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
    },
    url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
  }
}
function section(url, k=0, s=url===''?'/':url) {
  for(container of Object.keys(routes)) {
    var group = Object.keys(routes)[k];
    var path = route.path.dir(s)[0] ? route.path.dir(s)[0] : "/";
    var kk=0; if(Object.keys(routes[group]).includes(path)) {
      var paths = routes[group];
      var views = Object.keys(paths);
      var v=0; do {
        var port = Object.keys(paths)[v];
        var ports = paths[port];
        if(views.includes(port)) { 
          var p=0; do {
            if(ports.includes(url)) { return group; }
          p++; } while(p<ports.length);
        }
      v++; } while(v<views.length);
    kk++; } k++;
  }
}