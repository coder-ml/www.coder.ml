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
  popup: [''],
  excludes: ['']
}
String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;
  return new Promise(function(resolve, reject) {
    path ? view(route.page(path)).then(paths => load(paths).then(paths => resolve(paths), err => reject(err))) : reject({error:error["404"]});
  });
};
function view(paths) {
  return new Promise(function(resolve, reject) {

    var get = paths.GOT;
    var root = paths.GOT[0];
    if(auth.user()===null && (
        (root==='my' && root==='account') || 
        (root==='search' && paths.GOT.length===1) ||
        (root==='watch' && paths.GOT.length===1)
      )
    ) { '/'.router(); }
    else {

      var video = byId('video');
      video.innerHTML = ``;
      byId('video-title').textContent = '';

      if(root) {
        if(root === 'watch') {
          var id = paths.GOT[1];
          document.body.removeAttribute('data-menu');
          video.innerHTML = `<iframe autoplay class="iframe" id="iframe" src="https://www.youtube.com/embed/`+id+`?controls=0"></iframe>`;
          var endpoint = window.location.protocol+'//api.coder.'+api.tld()+'/v1/read/video/index.json';
          console.log({endpoint});
          ajax(endpoint).then((j,json=JSON.parse(j.res)) => { console.log({json});
            byId('video-title').textContent = json.snippet.title;
          }).catch(e => {
            console.log('Video data is unavailable.',{e});
            //byId('video').nextElementSibling.remove();
          });
        }
        else if(root === 'search') {
          if(paths.GOT[1]) {
            if(paths.GOT[2]) {

            } else {
              
            }
          }
        }
        resolve(paths);
      }
      else {
        resolve(paths);
      }
      
    }
  });
}
function load(paths) {
  return new Promise(function(resolve, reject) {
    var page = paths.page;
    var container = 'main';
    var group = byId(container);
    console.log({paths,page,container,group});
    if(config.popup.includes(paths.page)) { document.body.dataset.popup = container; }
    else { document.body.dataset.section = container; document.body.removeAttribute('data-popup'); }
    document.querySelector('.popup') ? $(document.querySelectorAll('.popup')).remove() : null;
    group.dataset.page = paths.page, group.dataset.path = paths.path;
    if(config.excludes.includes(paths.page)) { alert(paths.page);
      document.body.dataset.ppp1 = paths.page, document.body.dataset.ppp2 = paths.path;
      group.dataset.page = paths.page, group.dataset.path = paths.path;
    } else {
      document.body.removeAttribute('ppp1'); document.body.removeAttribute('ppp2');
      paths.GOT[0] ? document.body.dataset.view = paths.GOT[0] : document.body.removeAttribute('data-view');
      document.body.dataset.page = paths.page, document.body.dataset.path = paths.path;
      group.dataset.page = paths.page, group.dataset.path = paths.path;
    }
    if(!document.body.dataset.page || !document.body.dataset.path) {
      if(paths.page === '/my/') { 
        if(auth.user()) { document.body.dataset.page = '/home/', document.body.dataset.path = '/home/'; }
        else { document.body.dataset.page = '/', document.body.dataset.path = '/'; }
      }
    }
    history.pushState(paths.state,'uiOS',paths.state); 
    document.body.removeAttribute('data-load')
    window.GET = paths.GOT; 
    byId('article').scrollTop = 0;
    resolve(paths);
  });
}
window.error = code => ajax('/cdn/html/error-'+code+'.html').then(a=>popup.page(a));
window.route = {
  page: state => { 
    var GOT = state===window.location.origin ? [] : route.dir(state);
    var n = 0, arr1 = [], arr2 = [], view = GOT && GOT[0] ? GOT[0] : '/'; 
    if(GOT.length>0) {
      do { var m = GOT[n];
        //console.log({arr1},arr1.includes('*'));
        //if(0<1) {
          if(
            (['search'].includes(view) & n === 1)
          ) {
            arr1[n] = '#';
            arr2[n] = m.replace("#",''); 
          }
          else if(
            (['watch'].includes(view) & n === 1)
          ) { 
            arr1[n] = '*';
            arr2[n] = m.replace("*",''); 
          }
          else {
            arr1[n] = arr2[n] = m;
          } n++;
      } while(n<GOT.length);
    }
    return {GOT:arr2, page:route.url(arr1), path:route.url(route.dir(state.replace('#',''))), state};
  },
  dir: (url,g=[]) => {
    url.split('/').forEach((a,i) => { g[i] = a; }); 
    g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
  },
  url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
}