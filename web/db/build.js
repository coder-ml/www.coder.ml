function build(e) {
  return new Promise((resolve, reject) => {
    document.open();
    document.write(e);
    document.close();
    resolve(e);
  });    
}
function getHTML(url) {
  return new Promise((resolve, reject) => {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200) { 
          resolve(this.responseText); 
        }
        else if(this.status == 404) { reject('404'); }
      }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  });
}