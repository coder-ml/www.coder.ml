window.git = {

    get: {

        archive: (owner,repo,format,ref) => {
            var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/'+format+(ref ? '/'+ref : '');
            return new Promise((resolve,reject) => {
                ajax(url, { headers: { "Authorization": git.token() } })
                    .then((j,json=JSON.parse(j)) => resolve(json))
                    .catch(e => reject(e));
            });            
        },

        branches: (owner,repo,branch) => {
            var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/branches/'+(branch ? branch : 'master');
            return new Promise((resolve,reject) => {
                ajax(url, { headers: { "Authorization": git.token() } })
                    .then((j,json=JSON.parse(j)) => resolve(json))
                    .catch(e => reject(e));
            });
        },

        contents: url => { //console.log({url});
            return new Promise((resolve,reject) => {
                ajax(url, { headers: { "Authorization": git.token() } })
                    .then((j,json=JSON.parse(j)) => resolve(json))
                    .catch(e => reject(e));
            });
        },

        import: () => {
            return new Promise((resolve,reject) => { });
        },

        rate_limit: () => {
            ajax('https://api.github.com/rate_limit', { headers: { "Authorization": git.token() } })
                .then((j,json=JSON.parse(j)) => { console.log({json}); });
        },    


        trees: (owner,repo,tree_sha)  => { 
            var url = 'https://api.github.com/repos/'+owner+'/'+repo+'/git/trees/'+tree_sha; //console.log({url});
            return new Promise((resolve,reject) => {
                ajax(url, { headers: { "Authorization": git.token() } })
                    .then((j,json=JSON.parse(j)) => resolve(json))
                    .catch(e => reject(e));
            });
        }

    },

    token: () => { return localStorage['githubToken'] ? localStorage['githubToken'] : null },

}