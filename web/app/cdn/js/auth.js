window.auth = {
    config: {
        apiKey: "AIzaSyDvU3N0spH_tVwamSCylvXRPDlefe0rCiw",
        authDomain: "auth.mallzones.com",
        projectId: "mallzones-1521680758043",
        messagingSenderId: "685526447872",
        appId: "1:685526447872:web:97ef4b545ff42f54"
    },
    change: user => { console.log('auth.js auth.change', user);
        if(user) { user.photoURL ? byId('avi').innerHTML = '<div class="bkgcvr" style="background-image:url(' + user.photoURL + ')"></div>' : null; document.body.dataset.online = true; }
        else { byId('avi').innerHTML=''; document.body.removeAttribute('online'); }        
        //var row = {'created': '2019-10-07 21:22:19', 'ref': "0", 'type': 'please-login', 'uid': Math.random().toString(36).substr(2,9), 'user': '0'}, table = db.getSchema().table('alerts');
        //db.insertOrReplace().into(table).values([table.createRow(row)]).exec().then(rows => notify('Please log in to access your MallZones account.',3));            
        if(window.location.pathname === "/") { //alert('auth.change: '+user ? 'online' : 'offline');
          '/'.router({reload:true}); 
        }
    },
    isEmail: email => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
          ajax('https://localhost.api.mallzones.com:448/v1/read/auth', {dataType: "POST", data: {email, password}}).then(e => { 
            var results = JSON.parse(e); console.log(results,auth.isEmail(email));
            if(results.count>0) {                
                if(auth.isEmail(email)) {
                    firebase.auth().signInWithEmailAndPassword(results.email, password).then(e => { notify('Logged in successfully', 2);
                      (localStorage.returnUrl ? localStorage.returnUrl : '/home/').route();
                      resolve(e);
                    }).catch(error => notify(error.message,2) && resolve(error));
                } else {
                }
            }
            else { notify('There is no user matching these credentials',2) }
          });
        });
    },
    register: (email,password) => { console.log({email, auth: isOnline()});
        return new Promise((resolve, reject) => {
          ajax('https://localhost.api.mallzones.com:448/v1/read/auth', {dataType: "POST", data: {email}}).then(e => {
            var results = JSON.parse(e), count = results.count, user = isOnline(); console.log(results,user);
            if(user) {

            } else {
                if(count===0) {           
                    if(auth.isEmail(email)) {
                        firebase.auth().createUserWithEmailAndPassword(email, password).then(f => { var uid = f.user.uid; console.log(uid);
                            ajax('https://localhost.api.mallzones.com:448/v1/create/users', {dataType: "POST", data: {email,password,uid}}).then(e => { console.log('CREATE',e); });
                        }).catch(err => { var notif; console.log(err,2);
                            if(err.code === "auth/email-already-in-use") { error = 'This user exists already. Sign in as this user in order to add password authentication.'; }
                            notify(error,3);
                        });
                    } 
                    else { notify('You must register with a valid email address.',3); }
                }
                else { notify('This user exists already.',3); }
            }
          })
        });        
    },
    state: (event) => {
        if(typeof event === "string" || (typeof event === 'object')) {
          var oAuth = (net) => { var provider; firebase.auth().useDeviceLanguage();
            if(net === 'facebook') { provider = new firebase.auth.FacebookAuthProvider(); }
            else if(net === 'github') { provider = new firebase.auth.GithubAuthProvider(); }
            else if(net === 'google') { provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('https://www.googleapis.com/auth/drive'); provider.addScope('https://www.googleapis.com/auth/drive.readonly'); provider.addScope('https://www.googleapis.com/auth/drive.appdata'); }
            else if(net === 'github') { provider = new firebase.auth.GithubAuthProvider(); }
            else if(net === 'microsoft') { provider = new firebase.auth.OAuthProvider('microsoft.com'); }
            else if(net === 'twitter') { provider = new firebase.auth.TwitterAuthProvider(); } 
            isOnline() ? firebase.auth().currentUser.linkWithPopup(provider).then((result) => { var credential = result.credential, user = result.user;  }) :
              firebase.auth().signInWithPopup(provider).then(e => { localStorage[net+'Token'] = e.credential.accessToken; }).catch(error => notify(error.message,2));            
          }
          if(typeof event === "object") { event.forEach(k => oAuth(k)); }
          else if(typeof event === "string") { oAuth(event); }
        }
    },
    close: (network) => { return new Promise((resolve, reject) => firebase.auth().signOut().then(resolve()), error => reject(data)); },
    framework: (framework) => { return framework.isprotected && isOnline() ? 'isprotected' : 'unprotected'},
    update: (displayName) => {
        isOnline() ? isOnline().updateProfile({displayName}).then(() => console.log('auth.js auth.update:',displayName), () => notify('There was an error changing your username.',2)) : notify('You must be logged in to change your username',2);
    }
}
function isOnline() { return firebase.auth().currentUser; }
