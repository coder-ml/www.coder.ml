if('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').then(function() { console.log("Service Worker Registered"); }); }

var imp, sortable, desktop, footer, dock, menu, usr, clock;

window.addEventListener("popstate", e => { console.log(e); e.state ? e.state.router({pop:true}) : null; e.preventDefault(); });
windows = {
  window: {
    maximize: target => {
      if(target.closest('.app').className==='app') { target.closest('.app').classList = 'app medi'; }
      else { target.closest('.app').classList = 'app'; }
      history.pushState(null, 'uiOS - Desktop', '/desktop/');
    },
    minimize: target => { 
      target.closest('.app').classList = 'app mini';  
      history.pushState(null, 'uiOS - Desktop', '/desktop/');
    },
    exit: target => { 
      target.closest('.app').remove();  
      byId('tasks').querySelector('[data-app="'+(target.closest('.app').dataset.app)+'"]').remove();
      history.pushState(null, 'uiOS - Desktop', '/desktop/');
    }
  },
  desktop: () => {
    var wins = document.querySelectorAll('#desktop > .app');
    var i=0; if(apps.length>0) { var i; //console.log(apps,apps[i]);
      do { wins[i].classList.add('mini'); i++; } 
      while(i<wins.length);
    }
  }
}

function ajax(url, settings) { //console.log(url,settings);
  return new Promise((resolve, reject) => { var req;
    if(settings && settings.dataType === 'POST') { req = new Request(url, { method: 'POST', body: (settings.data ? JSON.stringify(settings.data) : null), headers: new Headers() }); } else { req = url; }
    fetch(req).then(response => response.text()).then(res => { try { resolve(res); } catch(e) { resolve(e); } });
  });
}  
function arraySearch(arr,val) { for (var i=0; i<arr.length; i++) if (arr[i] === val) return i; return false; }
function openApp(path) { 
   var values = Object.values(apps);
   var keys = Object.keys(apps);
   var id = arraySearch(keys,path);
   var app = apps[path]; console.log(apps,app,id,path);
   return new Promise(function(resolve, reject) {
     if(byId('desktop').querySelector('.app[data-app="'+path+'"]')) {
       var i=0; wins = byId('desktop').querySelectorAll('.app');
       do {
          if(wins[i].dataset.app===path) { wins[i].classList.remove('mini'); }
          else { wins[i].classList.add('mini'); }
          i++;
       } while(i<wins.length);
       byId('desktop').querySelector('.app[data-app="'+path+'"]');
       //history.pushState(null, "uiOS - " + path.charAt(0).toUpperCase(), path ? path : "/apps/" + path+"/");
    } else {
      var layer = document.createElement('div'),
      innerHTML  = '<div class=\'window\'>'
        +'<div class=\'info\'>'
          +'<inline onclick="window.location.href = event.target.closest(\'.window\').querySelector(\'iframe\').src"><icon class="icon" style="background-image:url(/cdn/png/ico/logo-' + path + '_50.png)"></icon>'
          +'<inline class="title">' + path + '</inline></inline>'
          +'<inline class="about">?</inline>'
        +'</div>'
        +'<div class="resize">'
          +'<div class=\'mini btn\' onclick="windows.window.minimize(event.target)"></div>'
          +'<div class=\'medi btn\' onclick="windows.window.maximize(event.target)"></div>'
          +'<div class=\'exit btn\' onclick="windows.window.exit(event.target)"></div>'
        +'</div>'
        +'<iframe src=\'https://' + path + '.uios.me\' allow="microphone *; camera *; geolocation;" /></iframe>'
      +'</div>';
      layer.className = 'app medi'; layer.dataset.id = id; layer.dataset.app = path;
      promise = $(layer).html(innerHTML).then(function(){ 
        byId("start-menu").className = "start-menu";
        byId('desktop').append(layer);
        var task = document.createElement('div');
        task.className = 'ico'; task.dataset.id = id; task.dataset.app = path; 
        task.style = 'background-color:'+app['color']+';background-image:url(/cdn/png/ico/logo-'+path+'_50.png)';
        task.onclick = ('/apps/'+path+'/').router();
        if(byId('desktop').querySelector('.app[data-app="'+path+'"]')) { byId('tasks').append(task); }
        //history.pushState(null, "uiOS - "+path.charAt(0).toUpperCase(), "/apps/"+path+"/");
      });
    }

   });
}
function openDesktop() {
  byId("splash").className = "splash screen"; 
  byId("login").className = "login screen"; 
}
function getParam(index) {
  return window.location.href.replace(/(^\w+:|^)\/\//, '').split('/').slice(index)[0];
}
function getUrlVars() {
  var vars = {}, parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) { vars[key] = value; }); return vars;
}
function init(state) {

  var html=["",""], key=0;
  do { 
    var path = Object.keys(apps)[key]; ///cdn/png/ico/logo-" + path + "_50.png
    html[0] += "<div class='app' data-app='"+path+"' data-id='"+path+"'>" + path + "</div>";
    html[1] += "<div class='ico' data-app='"+path+"' data-id='"+path+"' style='background-color:"+path.color+";background-image:url(/cdn/png/ico/logo-" + path + "_50.png)'></div>";
    key++
  } while(key<Object.keys(apps).length);
  byId('apps').innerHTML = html[0];
  byId('desktop').innerHTML = html[1];
  //document.body.on('click', touch.body, {passive: true});
  //byId('desktop').on('click', touch.dekstop, {passive: true}); 
  byId('taskbar').on('click', touch.taskbar, {passive: true}); 
  byId('access').on('click', touch.access, {passive: true});

  state.router({pop:true});

}
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) { document.documentElement.requestFullScreen(); }
        else if (document.documentElement.mozRequestFullScreen) { document.documentElement.mozRequestFullScreen(); }
        else if (document.documentElement.webkitRequestFullScreen) { document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); }
    } else {
        if (document.cancelFullScreen) { document.cancelFullScreen(); }
        else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
        else if (document.webkitCancelFullScreen) { document.webkitCancelFullScreen(); }
    }
}
function update() {
    var date = new Date(),
        ampm = date.getHours() < 12 ? 'AM' : 'PM',
        hours = date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
        dayOfWeek = days[date.getDay()],
        month = date.getMonth(),
        day = date.getDate(),
        year = date.getFullYear(),
        dateString = (month + 1) + '/' + day + '/' + year,
        clock = { hours, minutes, seconds, ampm };
    by('taskbar').find('.hour').html(clock.hours + ':' + clock.minutes + ' ' + clock.ampm).end().find('.min').html(dateString);
}

function loadScript( url, callback ) {
  var script = document.createElement("script"); script.type = "text/javascript";
  (script.readyState) ? script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) { script.onreadystatechange = null; callback(); }
    } : script.onload = function() { callback(); };
  script.src = url; document.getElementsByTagName( "head" )[0].appendChild( script );
}