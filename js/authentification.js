document.addEventListener("DOMContentLoaded",()=>{
    const cni = document.getElementById("cni");
    const prenom = document.getElementById("mdp");
    const result = document.getElementById("result");
    const envoyer = document.getElementById("envoyer");
    //Event click
    let formData = {
        requestName:btoa(btoa(btoa("authentification"))),
        data:{}
    };
    envoyer.addEventListener("click",()=>{
        formData.data.cni = cni.value;
        formData.data.mdp = mdp.value;
        
            if(cni.value != "" && mdp.value != ""){
                const urlToSend = "API/entryPoint.php";
                let xhrSendAnnonce = new XMLHttpRequest();
                          xhrSendAnnonce.addEventListener("loadstart", () =>
                           {    
                           });
                          xhrSendAnnonce.addEventListener("load", () =>
                           {
                                let response = JSON.parse(xhrSendAnnonce.responseText);
                              if(response.error === false){
                                  sessionStorage.setItem('isConnected', 'true');
                                 if(response.data.cni === "admin@1234"){
                                      document.location.replace('admin.html');
                                  }else{
                                      document.location.replace('electeur.html');
                                  }                     
                                }else{
                                     result.innerHTML = response.message;
                                }
                           });
                          xhrSendAnnonce.addEventListener("error",()=>{
                            //console.log(e.error);
                          });
                     xhrSendAnnonce.responseType = "text";
                       xhrSendAnnonce.open('POST',urlToSend, true);
                      xhrSendAnnonce.send(JSON.stringify(formData));
            }
        
    },false);
    //   
});
