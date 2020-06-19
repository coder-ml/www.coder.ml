window.api = {

    endpoint: () => { return window.location.protocol+'//api.coder.'+api.tld(); },
    tld: () => { return is.local() ? 'localhost' : 'ml'; }
    
}