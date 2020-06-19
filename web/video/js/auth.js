window.auth = {
    config: {
        apiKey: "AIzaSyCcfN0FjpZH9Fz0tTSWTmGcRxAbhCwtvrk",
        authDomain: "coder-40f44.firebaseapp.com",
        projectId: "coder-40f44",
        appId: "1:476310509370:web:7efd6ba80698d883bd2203"
    },
    change: (user) => {
        return new Promise((resolve, reject, url) => {
            if(user) {
                var uid = auth.user().uid;
                document.body.dataset.uid = uid;
                user.photoURL ? byId('user').innerHTML = '<div class="bkg cvr" style="background-image:url(' + user.photoURL + ')"></div>' : null; 
                if(document.body.dataset.path) { (['///'].includes(window.location.pathname) ? '/home/' : window.location.pathname).router(); }
                else { window.location.pathname.router();}
            } else {
                document.body.removeAttribute('data-uid');
                byId('user').innerHTML = '';
                window.location.pathname.router();
            }
        });
    },
    connect: () => {
        return new Promise((resolve, reject) => {
            firebase.auth().useDeviceLanguage();
            var provider = new firebase.auth.GithubAuthProvider();
            provider.addScope('gists');
            provider.addScope('repo');
            provider.addScope('read:user');
            provider.addScope('read:repo_hook');
            provider.addScope('user:email');
            auth.user() ? 
              firebase.auth().currentUser.linkWithPopup(provider).then(e => resolve({credential:e.credential,user:e.user})) :
              firebase.auth().signInWithPopup(provider).then(e => { localStorage['githubToken'] = e.credential.accessToken; }).catch(error => reject(error));            
        });
    },
    close: (network) => { return new Promise((resolve, reject) => firebase.auth().signOut().then(resolve()), error => reject(data)); },
    update: (displayName) => { isOnline() ? isOnline().updateProfile({displayName}).then(() => console.log('auth.js auth.update:',displayName), () => notify('There was an error changing your username.',2)) : notify('You must be logged in to change your username',2); },
    user: () => { return firebase.auth().currentUser; }
}
