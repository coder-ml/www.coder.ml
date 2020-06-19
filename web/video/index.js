window.app = 'coder';
window.version = 1;
window.addEventListener("popstate", e => (e.state ? e.state.router({pop:true}) : null));
window.global = () => {
   time: 0
};
window.is = {
  local: () => { return window.location.origin.includes('localhost') ? true : false; },
  external: u => { return u.includes('://') || u.includes(';base64,'); },
  mobile: () => { 
    var ua = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    ua ? document.body.dataset.mobi=true : document.body.dataset.mobi ? document.body.removeAttribute('data-mobi') : null; 
    return ua;
  },
  numeric: a => { return a===0 || parseInt(a)>0 ? true : false; },
  mode: (sunrise, sunset, now) => { return now < sunrise || now > sunset ? 'dark' : 'lite'; }
};
window.change = {
  mode: mode => {
    var mode = document.body.dataset.mode;
    var modes = ["auto", "dark", "lite"];
    var index = modes.indexOf(mode);
    var shade = modes[index===2?0:index+1];
    var i = modes.indexOf(shade);
    document.body.dataset.mode = shade;
    console.log({index,mode,shade});
    localStorage.setItem("mode", shade);
  }
};
window.on = {};
window.version = 1;