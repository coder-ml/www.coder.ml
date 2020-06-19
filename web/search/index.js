window.app = 'coder';
window.mvc = {};
window.version = 1;
window.addEventListener("popstate", e => (e.state ? e.state.router({pop:true}) : null));
window.onresize = () => draw();
window.global = {
   "clock": { "date": null, "time": 0 }
};
window.is = {
  local: () => { return window.location.origin.includes('localhost') ? true : false; },
  mode: (sunrise, sunset, now) => { document.body.dataset.mode = now < sunrise || now > sunset ? 'dark' : 'lite'; },
  mobile: () => { 
    var ua = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    ua ? document.body.dataset.mobi=true : document.body.dataset.mobi ? document.body.removeAttribute('data-mobi') : null; 
    return ua;
  },
  online: () => { return firebase.auth().currentUser; },
};
window.on = {};
function ajax(url, settings) { //console.log(url,settings);
  return new Promise((resolve, reject) => { var req;
    if(settings && settings.dataType === 'POST') { req = new Request(url, { method: 'POST', body: (settings.data ? JSON.stringify(settings.data) : null), headers: new Headers() }); } else { req = url; }
    fetch(req).then(response => response.text()).then(res => { try { resolve(res); } catch(e) { resolve(e); } });
  });
}  
function draw() {
    is.mobile();
}
function pad(str, len) { len = len || 2; var zeros = new Array(len).join('0'); return (zeros + str).slice(-len); } 
function unixTime(format,time) {  
  if(format === '24hr') {
    var date = new Date(time * 1000);
    var formattedTime = parseInt(pad(date.getHours(),2) + pad(date.getMinutes(),2).substr(-2));
  }
  return formattedTime;
}