window.on['load'] = () => {
          
    draw();
    firebase.initializeApp(auth.config);
    document.body.removeAttribute('data-nojs');
    ajax('https://api.mallzones.com/v1/read/ampm').then((j,json=JSON.parse(j)) => {
      var sunrise = unixTime('24hr',json.results.sunrise),
          sunset = unixTime('24hr',json.results.sunset);
      is.mode(sunrise,sunset,global.clock.time);
    });
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        console.log({user});
        auth.change(user);
      });
    });
}

window.on['submit'] = {
  
    search: event => { event.preventDefault();

        var target = event.target;
        console.log({target});

    }
    
};

function vars() {
      
    global.clock.date = gcd = new Date();  
    global.clock.time = parseInt(pad(gcd.getHours(),2)+''+pad(gcd.getMinutes(),2));
    window.app = 'mallzones';
    
}