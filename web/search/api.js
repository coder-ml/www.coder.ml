window.api = {

    endpoint: () => { return window.location.protocol+'//api.mallzones.'+api.tld(); },
    tld: () => { return is.local() ? 'localhost' : 'com'; }
    
}