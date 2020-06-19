window.error = {
  "200": "OK",
  "201": "Created",
  "204": "No Content",
  "304": "Moved Permanently",
  "400": "Bad Request",
  "401": "Unauthorized",
  "404": "Not Found",
  "406": "Not Acceptable",
  "409": "Conflict",
  "500": "Internal Server Error"
}
window.config = {
  excludes: {
    section: ['my', 'random', 'containers']
  }
}
String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) {
  return new Promise(function(resolve, reject) {
    path ? view(path).then(path => load(path).then(path => resolve(path), err => reject(err))) : reject({error:error["404"]});
  });
};
function view(path) {
  return new Promise(function(resolve, reject) {
    if(path === '/') { 
        byId('aside').classList.remove('show');
        resolve(path); 
    }
    else { resolve(path); }
  });
}
function load(path) {
  return new Promise(function(resolve, reject) {

    history.pushState(path,'Coder | Web IDE',path); 
    document.body.removeAttribute('data-load');
    document.body.dataset.path = path;
    var GOT = window.GET = route.dir(path);

    if(GOT[0]) { //USER

        var user = GOT[0];

        byId('filter-repos').textContent = GET[0];

        if(GOT[1]) { //REPO

            var paths = route.dir(path); paths.splice(0,1);
            var repo = paths.splice(0,1)[0]; //console.log({repo});
            var vog = 'https://github.com/'+user+'/'+repo+'/';

            document.body.dataset.repo = byId('current-repository').dataset.after = repo;

            if(GOT[2]) { //
                
                var type = paths.splice(0,1)[0]; //console.log({type}); 
                if(GET[2] === "preview") { byId('preview').click(); }               
                
                if(GOT[3]) { //BRANCH

                    var branch = paths.splice(0,1)[0]; //console.log({branch});                    
                    document.body.dataset.branch = byId('current-branch').dataset.after = branch;
                    var contents = 'https://api.github.com/repos/'+user+'/'+repo+'/contents';

                    git.get.branches(user,repo,branch)
                      .then(e => git.get.trees(user, repo, branch, e.commit.sha).then(tree => console.log({branch:e,tree})));


                        var dir = paths.splice(0,1)[0];
                        var filepath = '';
                        var code = 'https://raw.githubusercontent.com/'+user+'/'+repo+'/'+branch;

                        if(GOT[4]) {
                            var file = paths;
                        }

                        if(filepath === '' || !filepath) { document.body.removeAttribute('data-file'); } 
                        else { document.body.dataset.file = dir; }

                        var filename = 'https://api.github.com/repos/'+user+'/'+repo+'/contents'+(filepath ? filepath : '');
                    
                    git.get.contents(filename).then(json => { //console.log({json,filepath,contents,filename,json});
                        if(json.length>0) { 
                          gc(json,GOT,file); 
                          var pathname = window.location.pathname.split(GET[3]+'/')[1];
                          var endpoint = "https://api.github.com/repos/"+user+"/"+repo+"/contents"+(pathname ? '/' : '');
                          byId('browse-files').dataset.path = pathname ? "/"+pathname : "/";
                          byId('browse-files').dataset.api = endpoint;
                        }
                        else {
                          var pathname = json.path.split(json.name)[0];
                          var endpoint = "https://api.github.com/repos/"+user+"/"+repo+"/contents"+(pathname ? '/' : '');
                          if(json.type === 'file') {
                              byId('browse-files').dataset.path = pathname;
                              byId('browse-files').dataset.api = endpoint;
                              var ep = "https://api.github.com/repos/"+user+"/"+repo+"/contents/"+window.location.pathname.split(GET[3])[1].split('/'+'article.css')[0];
                              console.log({ep});
                              git.get.contents(ep)
                                .then(js => gc(js,GOT,file))
                                .catch(tree => console.log({tree}));
                          }
                          else if(json.type === 'dir') {
                              byId('browse-files').dataset.path = pathname ? "/"+pathname : "/";
                              byId('browse-files').dataset.api = endpoint;
                              alert(endpoint);                              
                          }
                        }

                        
                    });
                    function gc(json,GOT,file) { console.log({json,GOT,file});
                      
                        var browser = byId('browse-files');

                        var c=0, html = ``; do { 
                            var vals = Object.values(json)[c];
                            html += `<div data-after="`+vals.name+`" data-type="`+vals.type+`"></div>`;                                
                            if(vals.path === filepath) {

                            }
                            if(c === json.length - 1) {
                              
                              browser.innerHTML = html;


                                  if(GOT[4] && file) { //FILE

                                      var sel = '[data-after="'+file[file.length-1]+'"]';
                                      var blob = browser.querySelector(sel);
                                      var type = blob ? blob.dataset.type : null;
                                      if(blob && blob.dataset.type === "file") {
                                          filepath = '/'+dir+'/'+file.join('/'); //console.log({filepath});
                                          code += filepath;
                                      } else {
                                          filepath = '/'+dir; console.log({dir});
                                          code += filepath;
                                      }           
                                      contents += filepath;

                                      console.log({browser:browser.innerHTML,code,dir,file,blob,type,sel});       
                                      ajax(code).then(txt => {
                                          byId('wysiwyg').innerHTML = txt; console.log({txt});

                                              ajax(code).then(html => func(html))
                                              function func(html) {
                                                var wysiwyg = byId('wysiwyg');
                                                var data = html.split("\n");
                                                var code = '<pre contenteditable="true"></pre>'.repeat(data.length);
                                                wysiwyg.innerHTML = code;
                                                console.log({data,html,code});
                                                var x=0; do { 
                                                  var elem = wysiwyg.children[x];
                                                  var fig = ["css","html","js","php"]
                                                  elem.classList.add(GOT[GOT.length-1] && fig.includes(GOT[GOT.length-1].split('.')[1]) ? 'sh_'+GOT[GOT.length-1].split('.')[1] : 'sh_html');
                                                  elem.textContent = data[x];
                                                x++; } while(x<data.length);
                                                sh_highlightDocument();
                                              }

                                      });

                                  } else {                        
                                      document.body.removeAttribute('data-file');
                                      byId('wysiwyg').innerHTML = '';                      
                                  }


                            }
                        c++; } while(c<json.length);
                    }

                } else {
                    document.body.removeAttribute('data-file');
                    document.body.removeAttribute('data-branch');
                    byId('wysiwyg').innerHTML = '';
                }

                //console.log({repo,file,vog})

            } else {
                document.body.removeAttribute('data-branch');
                document.body.removeAttribute('data-file');
                byId('wysiwyg').innerHTML = '';
            }

            byId('view-on-github').href = vog;
            //console.log({GOT,user,repo,branch,file,vog})

        } else {
            document.body.removeAttribute('data-branch');
            document.body.removeAttribute('data-file');
            document.body.removeAttribute('data-repo');
            byId('wysiwyg').innerHTML = '';
            //byId('current-repository').dataset.after = 'Select a repository';
        }

    }
    else {

        document.body.removeAttribute('data-branch');
        document.body.removeAttribute('data-repo');
        document.body.removeAttribute('data-file');
        byId('current-repository').dataset.after = 'Select a repository';

    }

    resolve(path);

  });
}
window.route = {
    dir: (url,g=[]) => {    
        url.split('/').forEach((a,i) => { g[i] = a; }); 
        g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
    },
    url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
}
window.error = code => ajax('/cdn/html/error-'+code+'.html').then(a=>popup.page(a));