document.addEventListener("DOMContentLoaded",()=>{

    const nom_election = document.getElementById("nom_election");
    const libelle = document.getElementById("libelle");
    const type_election = document.getElementById("type_election");
    const datedebut = document.getElementById("datedebut");
    const datefin = document.getElementById("datefin");
    const add_election = document.getElementById("add_election");
    const result_add_election = document.getElementById("result_add_election");
    const nom = document.getElementById("nom");
    const adresse = document.getElementById("adresse");
    const tel = document.getElementById("tel");
    const description = document.getElementById("description");
    const prof_foi = document.getElementById("prof_foi");
    const candidat_election = document.getElementById("candidate_election");
    const photo = document.getElementById("photo");
    const add_candidate = document.getElementById("add_candidate");
    const result_add_candidate = document.getElementById("result_add_candidate");
    //Event click
    let formData1 = {
        requestName:btoa(btoa(btoa("add_election"))),
        data:{}
    };
     let formData2 = {
        requestName:btoa(btoa(btoa("add_candidate"))),
        data:{}
    };
        //For the election list 
    let formData3 = {
        requestName:btoa(btoa(btoa("election_list"))),
        data:{}
    };
        const urlToSend = "API/entryPoint.php";
                let xhrSendAnnonce = new XMLHttpRequest();
                          xhrSendAnnonce.addEventListener("loadstart", () =>
                           {    
                           });
                          xhrSendAnnonce.addEventListener("load", ()=>
                           {
                                let response = JSON.parse(xhrSendAnnonce.responseText);
                              let i = 0;
                              while(i<response.data.length) {
                                candidat_election.insertAdjacentHTML('beforeend', '<option data-id='+response.data[i].id+'>'+response.data[i].nom+'</option>');
                                i++;
                              }

                           });
                          xhrSendAnnonce.addEventListener("error",()=>{
                            //console.log(e.error);
                          });
                     xhrSendAnnonce.responseType = "text";
                       xhrSendAnnonce.open('POST',urlToSend, true);
                      xhrSendAnnonce.send(JSON.stringify(formData3));
       
    //
     
    function UploadFiles(files){
      let elt = ""; 
      let reader = new FileReader();
        reader.addEventListener("load", function(){
            formData2.data.photo = this.result;
        },false);
        reader.readAsDataURL(files);      
    }
    add_election.addEventListener("click",()=>{
        formData1.data.nom_election = nom_election.value;
        formData1.data.type_election = type_election.value;
        formData1.data.libelle = libelle.value;
        formData1.data.datedebut = datedebut.value;
        formData1.data.datefin = datefin.value;
            
            if(nom_election.value != "" && type_election.value != "" && libelle.value != "" && datedebut.value != "" && datefin.value != ""){
                const urlToSend = "API/entryPoint.php";
                let xhrSendAnnonce = new XMLHttpRequest();
                          xhrSendAnnonce.addEventListener("loadstart", () =>
                           {    
                           });
                          xhrSendAnnonce.addEventListener("load", () =>
                           {
                                let response = JSON.parse(xhrSendAnnonce.responseText);
                                result_add_election.innerHTML = response.message;

                           });
                          xhrSendAnnonce.addEventListener("error",()=>{
                            //console.log(e.error);
                          });
                     xhrSendAnnonce.responseType = "text";
                       xhrSendAnnonce.open('POST',urlToSend, true);
                      xhrSendAnnonce.send(JSON.stringify(formData1));
                }
        
    },false);
    photo.addEventListener('change',()=>{
       UploadFiles(photo.files[0]);
    });
    add_candidate.addEventListener("click",()=>{
        formData2.data.nom = nom.value;
        formData2.data.adresse = adresse.value;
        formData2.data.tel = tel.value;
        formData2.data.description = description.value;
        formData2.data.prof_foi = prof_foi.value;
        formData2.data.election = candidat_election.value;
        
            
            if(nom.value != "" && adresse.value != "" && tel.value != "" && description.value != "" && 
              prof_foi.value != ""){
                const urlToSend = "API/entryPoint.php";
                let xhrSendAnnonce = new XMLHttpRequest();
                          xhrSendAnnonce.addEventListener("loadstart", () =>
                           {    
                           });
                          xhrSendAnnonce.addEventListener("load", () =>
                           {
                                let response = JSON.parse(xhrSendAnnonce.responseText);
                                result_add_candidate.innerHTML = response.message;

                           });
                          xhrSendAnnonce.addEventListener("error",()=>{
                            //console.log(e.error);
                          });
                     xhrSendAnnonce.responseType = "text";
                       xhrSendAnnonce.open('POST',urlToSend, true);
                      xhrSendAnnonce.send(JSON.stringify(formData2));
                }
        
    },false);

    //   
});

