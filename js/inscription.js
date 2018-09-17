document.addEventListener("DOMContentLoaded",()=>{
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const datenais = document.getElementById("datenais");
    const mdp = document.getElementById("mdp");
    const tel = document.getElementById("tel");
    const envoyer = document.getElementById("envoyer");
    const result = document.getElementById("result");
    //Event click
    let formData = {
        requestName:btoa(btoa(btoa("inscription"))),
        data:{}
    };
    envoyer.addEventListener("click",()=>{
        formData.data.nom = nom.value;
        formData.data.prenom = prenom.value;
        formData.data.email = email.value;
        formData.data.datenais = datenais.value;
        formData.data.mdp = mdp.value;
        formData.data.tel = tel.value;
        
        const urlToSend = "API/entryPoint.php";
        let xhrSendAnnonce = new XMLHttpRequest();
                  xhrSendAnnonce.addEventListener("loadstart", () =>
                   {    
                   });
                  xhrSendAnnonce.addEventListener("load", () =>
                   {
                        let response = JSON.parse(xhrSendAnnonce.responseText);
                        result.innerHTML = response.message;
                   });
                  xhrSendAnnonce.addEventListener("error",()=>{
                    //console.log(e.error);
                  });
             xhrSendAnnonce.responseType = "text";
	           xhrSendAnnonce.open('POST',urlToSend, true);
	          xhrSendAnnonce.send(JSON.stringify(formData));
        
    },false);
    //   
});
