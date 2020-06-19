window.addEventListener("popstate", e => (e.state ? e.state.router({pop:true}) : null));
window.is = {
  local: () => { return window.location.origin.includes('localhost') ? true : false; },
  mobile: () => { 
    var ua = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    ua ? document.body.dataset.mobi=true : document.body.dataset.mobi ? document.body.removeAttribute('data-mobi') : null; 
    return ua;
  }
};
window.popup = {
  counter: 0,
  exit: target => target.closest('popup').remove(),
  page: (h,i) => {
    return new Promise((resolve, reject) => {
      var div = document.createElement('popup'); div.setAttribute('class', 'popup content'); popup.zIndex(document.querySelectorAll('popup'));
      $(document.body.insertBefore(div, document.body.find('popup') ? document.body.find('popup') : byId('iframe'))).html(h).then(() => resolve(div));
    });
  },
  zIndex: elem => elem.forEach((v,k) => { v.style.zIndex = 123456789 + (elem.length - k); })
};
window.mvc = {};
window.on = {};
window.version = 1;
function plainText(html) {
    return html.replace(/<\/?[^>]+>/ig, " ");
}