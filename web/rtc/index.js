window.version = 1;
window.addEventListener("popstate", e => (e.state ? e.state.router({pop:true}) : null));
window.global = () => {
   time: 0
};
window.init = url => {
    var dt = new Date();
    document.body.removeAttribute('data-nojs');
    global.time = parseInt(pad(dt.getHours(),2)+''+pad(dt.getMinutes(),2));
    if(localStorage.mode && localStorage.mode !== 'auto') {
      document.body.dataset.mode = localStorage.mode;  
      localStorage.setItem("mode", document.body.dataset.mode);
      change.mode(localStorage.mode); 
    } else {
      ajax('https://api.chree.ga/v1/read/ampm').then((j,json=JSON.parse(j)) => {
        var sunrise = unixTime('24hr',json.results.sunrise);
        var sunset = unixTime('24hr',json.results.sunset);
        document.body.dataset.mode = is.mode(sunrise,sunset,global.time);
        change.mode(document.body.dataset.mode);      
        localStorage.setItem("mode", document.body.dataset.mode);
      });      
    }
    console.log({mode:localStorage.mode});
    window.dom = { 
      "header": byId('header'), 
      "main": byId('main'),
      "blogs": byId('blogs')
    };
    url.router();
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
}