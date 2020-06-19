window.touch = {
    access: e => {
        if(e.target.id === 'fullscreen') { toggleFullScreen(); }
        //if(e.target.id === 'avatar') { openApp('account'); }
        //if(e.target.id === 'explorer') { openApp('cloud'); }
        //if(e.target.id === 'settings') { openApp('settings'); }
        if(e.target.id === 'power') { byId("login").className = "login"; byId("splash").className = "splash screen"; '/login/'.router(); }
    },
    body: e => {
        //if(event.target.closest('#start-menu')) { }
        //else { byId('start-button').classList.remove('menu'); }
    },
    desktop: e => {
      if(e.target) { var target = e.target;
        //if(target.classList.contains("ico")) { openApp(target.dataset.id); }
        if(target.closest('.app')) { app = target.closest('.app');
          if(e.target.closest('.window')) {
            app.style.zIndex = document.querySelectorAll('.desktop > app').length * 100;
            if(e.target.parentNode.classList.contains('resize')) {
              if(target.classList.contains('mini')) {
                app.classList.add('mini'); app.classList.remove('medi', 'maxi');
                history.pushState(null, 'uiOS - Desktop', '/desktop/');
              }
              if(target.classList.contains('medi')) {
                app.classList.add('medi'); app.classList.remove('mini', 'maxi');
                history.pushState(null, 'uiOS - Desktop', '/desktop');
              }
              if(target.classList.contains('maxi')) {
                app.classList.add('maxi'); app.classList.remove('mini', 'medi');
                history.pushState(null, 'uiOS - Desktop', '/desktop');
              }
              if(target.classList.contains('exit')) {
                app.classList.add('exit'); app.classList.remove('mini');
                target.closest('.app').remove();
                byId('tasks').querySelector('.ico[data-id="'+target.closest('.app').dataset.id+'"]').remove();
                history.pushState(null, 'uiOS - Desktop', '/desktop');
              }
            }
          }
        }
      }
    },
    taskbar: e => {
        if(e.target.id === 'start-button') { var state; 
            if(window.location.pathname === '/apps/') {
                if(byId('desktop').querySelector('.app.maxi')) { state = '/apps/'+byId('desktop').querySelector('.app.maxi > .window .title').textContent+'/'; }
                else { state = '/desktop/'; }
                state= '/desktop/';
            }
            else { state = '/apps/'; }
            state.router();
        }
    }
}