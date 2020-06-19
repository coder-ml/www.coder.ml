window.on['click'] = {
    browser: event => {
        if(event.target.id === 'browse-files') {
            var nm = (byId('wysiwyg').innerHTML==='' || byId('wysiwyg').innerHTML==='404: Not Found' ? 1 : 2);
            var ls = GET.length - nm;
            var cd = GET[nm]; console.log({GET,cd,ls,nm});
            window.location.pathname.split(cd)[0].router();
        } else {             
            ('/'+GET[0]+'/'+GET[1]+'/tree/master'+(byId('browse-files').dataset.path+event.target.dataset.after)).router();
        }     
    },
    preview: () => {
        var preview = byId('main-preview');   
        if(preview.classList.contains('show')) {
            preview.classList.remove('show');
        } else {
            var iframe = preview.querySelector('#iframe');   
            var endpoint = api.endpoint()+window.location.pathname;
            console.log({endpoint});
            preview.classList.add('show');
            var app = 'https://app.coder.'+api.tld()+'/'+window.location.pathname.substring(1);
            iframe.src = app;
        }
    }
}

window.on['mouseup'] = { 
    nav: target => {
        var header = target.closest('header');
        var handler = header.dataset && header.dataset.handler ? header.dataset.handler : null;
        var before = target.closest('#header-section > [data-before]');
        if(header.dataset.evt === "mouseover" || header.dataset.evt === "mouseup") {

            header.dataset.evt = "mouseup";

            if(header.dataset.handler) { header.removeAttribute('data-handler'); }
            else { 
                before.id !== "menu" ? header.dataset.handler = before.dataset.before : null;
                fileMenu(target); 
            }

            target.dataset.command ? mvc.c.command[target.dataset.command] : null;

        } 
        else if(header.dataset.evt === "mouseover") {    
            header.dataset.evt = "mouseup";    
        }
    }
}

window.on['contextmenu'] = event => { 
    event.preventDefault();
    body.dataset.contextmenu = true;
};

window.on['mouseover'] = { 
    nav: target => { //console.log({target});    
        if(target.id === "header-section") {
             byId('header').removeAttribute('data-handler');
        }
        if(target.id === "nav") { 
            //console.log({handler,before:before.dataset.before});
            byId('header').removeAttribute('data-handler');
        } 
        if(target.parentNode.id==="header-section") {
            var header = target.closest('header');
            var handler = header.dataset && header.dataset.handler ? header.dataset.handler : null;
            var before = target.closest('#header-section > [data-before]');  
            //console.log(12345,{handler:header.dataset.handler,handler,before:before.dataset.before});        
            header.dataset.evt = "mouseover";
            target.closest('#header-section > [data-before]').setAttribute('data-handler',target.closest('#header-section > [data-before]').dataset.before);
            fileMenu(target,'mouseover');        
            $(target).addClass('show').siblings().removeClass('show');   

            if(target.id === "header") { 
                //console.log({handler,before:before.dataset.before});
                header.removeAttribute('data-handler');
            } 
            else {
                header.setAttribute('data-handler',before.dataset.before);   
            }
            //console.log({handler,before:before.dataset.before});
        }
        //$(target).addClass('show')
    }
}
window.on['mouseleave'] = { 
    body: target => { 
        byId('header').removeAttribute('data-evt');
        byId('header').removeAttribute('data-handler');
    },
    header: target => { 
        //console.log('MOUSELEAVE',{target});
        byId('header').removeAttribute('data-evt');
        byId('header').removeAttribute('data-handler');
    },
    nav: target => { 
        //console.log('MOUSELEAVE',{target});
        byId('header').removeAttribute('data-evt');
        byId('header').removeAttribute('data-handler');
    }
}

window.on['load'] = url => {
    firebase.initializeApp(auth.config);
    return new Promise((resolve, reject) => 
        firebase.auth().onAuthStateChanged(user => 
            auth.change(user).then(document.body.removeAttribute('data-nojs'))
        )
    );
}

window.addEventListener("resize", () => { 
    var header = byId('header');
    header.dataset && header.dataset.handler ? fileMenu(header.find('[data-handler="'+header.dataset.handler+'"]'),'resize') : null;
})

function fileMenu(target,evt) { //console.log({target,evt});

    var header = target.closest('header');
    var before = target.closest('#header-section > [data-before]');
    if(before) {
            var fc = target.firstChild;
            if(fc) {
                var ol = before.parentNode.clientWidth - target.offsetLeft - target.clientWidth;
                var pl = target.offsetLeft;
                var hs = before.parentNode;
                var wd = pl + 240 > header.clientWidth;
                //console.log(header.clientWidth,{hs,ol,pl,wd,hs});
                if(wd) {
                  if(ol + 240 > header.clientWidth) { 
                      fc.style.left = 0;
                      fc.style.right = 0;
                  }
                  else {
                      fc.style.left = 'unset';
                      fc.style.right = ol+'px';
                  }
                } else {
                  fc.style.left = pl+'px';
                  fc.style.right = 'unset';
                }
            }

    }

}