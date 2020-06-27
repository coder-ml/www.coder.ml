window.on['click'] = {

    user: () => {

        auth.user() ? null : auth.connect();

    }

}


window.on['scroll'] = {

    body: event => {


        console.log({event});
        if(document.body.dataset.page === '/') { 

        }
        

    }

}

window.on['load'] = url => {
    firebase.initializeApp(auth.config);
    var endpoint = api.endpoint()+'/v1/read/videos';
    console.log(endpoint);
    ajax(endpoint).then((j,json=JSON.parse(j.res)) => { 
        var x = 0, z = json.length, y = shuffle(z); console.log({z,y,json});
        do {
          var block = byId('feed').children[x];
          var key = block.index();
          var video = json.videos[x];
          var id = video.ytid, title = video.title, channel, views, ago;
          //console.log({video});
          var html = `<div class="picture" onclick="('/watch/`+id+`/').router()"><picture>`;
            html += `<!--
              --><source srcset="https://img.youtube.com/vi/`+id+`/0.jpg">
              <source srcset="https://img.youtube.com/vi/`+id+`/0.jpg">
              <img src="https://img.youtube.com/vi/`+id+`/0.jpg"><!--
            -->`;
          html += `</picture></div>`;
          html += `<footer class="flex">`;
            html += `<!--
              --><a class="channel" style="display:none;"><div></div></a><!--
              --><a class="snippet"><!--
                --><div class="title">`+title+`</div><!--
                --><div class="about" style="display:none"><div>`+channel+`</div><div class="stats"><div>`+views+`</div><div>`+ago+`</div></div></div><!--
              --></a><!--
              --><a class="options" data-before="&#x22EE;"><div></div></a><!--
            -->`;
          html += `</footer>`; 
          block.innerHTML = html;
        x++; } while(x<=60);
    }).catch(err => {

    });
    return new Promise((resolve, reject) => 
        firebase.auth().onAuthStateChanged(user => 
            auth.change(user).then(document.body.removeAttribute('data-nojs'))
        )
    );
}