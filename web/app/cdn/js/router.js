String.prototype.router = function(a,b=(a ? a : {}), pop=(b.pop ? b.pop : null),path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;  
  return new Promise(function(resolve, reject) {
    if(path) { 
      var paths = route.get.page(path); state = paths.path;  
      view(paths);     
      pop ? null : history.pushState(null,'uiOS',state);
      resolve(state);    
    }
  });
};
window.error = code => ajax('/cdn/html/error-'+code+'.html').then(a=>popUp(a));
window.route = {
  get: {
    page: (state) => { //console.log('route.get.page',state);  
      var GOT = state===window.location.origin ? [] : route.get.path.dir(state),
          n = 0, arr1 = [], arr2 = [], view = GOT[0] ? GOT[0] : '/'; 
      if(GOT.length>0) {
        do { 
          var m = GOT[n]; 
          arr2[n] = GOT[n] ?  GOT[n].replace('#','') : '';
          if(
            (view === 'apps' && n === 1) ||
            m.includes('#')
          ) { arr1[n] = '#'; arr2[n] = m.replace("#",''); }
          else { arr1[n] = arr2[n] = m; } n++;
        } while(n<GOT.length);
      }
      return {arr:arr2,page:route.get.path.url(arr1),path:route.get.path.url(route.get.path.dir(state.replace('#','')))};
    },
    path: {
      dir: (url,g=[]) => {
        url.split('/').forEach((a,i) => { g[i] = a; }); 
        g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
      },
      url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
    }
  }
}
window.view = paths => {
  switch(paths.page) {    
    case "/": 
      byId("start-menu").className = "start-menu";
      byId("splash").className = "splash"; 
      byId("login").className = "login"; 
    break;

    case "/desktop/": 
      byId("start-menu").className = "start-menu";
      byId("splash").className = "splash screen"; 
      byId("login").className = "login screen";
      windows.desktop();
    break;

    case "/login/":
      byId("start-menu").className = "start-menu";
      byId("splash").className = "splash screen"; 
      byId("login").className = "login"; 
    break;

    case "/apps/": 
      byId("start-menu").className = "start-menu active";
      byId("splash").className = "splash screen"; 
      byId("login").className = "login screen"; 
    break;

    case "/apps/#/":       
      byId("start-menu").className = "start-menu";
      byId("splash").className = "splash screen"; 
      byId("login").className = "login screen"; 
      openApp(paths.arr[1]);
    break;
  }
}