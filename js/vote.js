document.addEventListener("DOMContentLoaded",()=>{

    const nom_election = document.getElementById("nom_election");
    const libelle = document.getElementById("libelle");
    const type_election = document.getElementById("liste_election");
    const liste_candidat = document.getElementById("liste_candidat");
    const datedebut = document.getElementById("datedebut");
    const datefin = document.getElementById("datefin");
    const tof = document.getElementById("tof");
    const add_election = document.getElementById("add_election");
    const result_add_election = document.getElementById("result_add_election");

    //Event click
    let formData1 = {
        requestName:btoa(btoa(btoa("add_election"))),
        data:{}
    };
     let formData2 = {
        requestName:btoa(btoa(btoa("election_list"))),
        data:{}
    };
        //For the election list 
    let formData3 = {
        requestName:btoa(btoa(btoa("list_candidat"))),
        data:{}
    };
    liste_candidat.addEventListener('change',(e)=>{
        console.log(e.target.dataset.image);
    });
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
                                liste_election.insertAdjacentHTML('beforeend', '<option data-id='+response.data[i].id+' data-image='+response.data[i].id+'>'+response.data[i].nom+'</option>');
                                i++;
                              }

                           });
                          xhrSendAnnonce.addEventListener("error",()=>{
                            //console.log(e.error);
                          });
                     xhrSendAnnonce.responseType = "text";
                       xhrSendAnnonce.open('POST',urlToSend, true);
                      xhrSendAnnonce.send(JSON.stringify(formData2));
     let xhrSendAnnonce2 = new XMLHttpRequest();
                          xhrSendAnnonce2.addEventListener("loadstart", () =>
                           {    
                           });
                          xhrSendAnnonce2.addEventListener("load", ()=>
                           {
                                let response2 = JSON.parse(xhrSendAnnonce2.responseText);
                              let i = 0;
                              while(i<response2.data.length) {
                                liste_candidat.insertAdjacentHTML('beforeend', '<option data-id='+response2.data[i].id+'>'+response2.data[i].nom+'</option>');
                                i++;
                              }

                           });
                          xhrSendAnnonce2.addEventListener("error",()=>{
                            //console.log(e.error);
                          });
                     xhrSendAnnonce2.responseType = "text";
                       xhrSendAnnonce2.open('POST',urlToSend, true);
                      xhrSendAnnonce2.send(JSON.stringify(formData3));
       
    //
     
 


    //   
});

