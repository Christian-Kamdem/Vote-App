<?php
function add_candidate($data){
    include 'Helpers/bd.php';
    include 'Helpers/uploadFile.php';
	$bd = bd();
		
					$nom = strip_tags($data->nom);
					$adresse = strip_tags($data->adresse);
					$tel = strip_tags($data->tel);
                    $photo = imageFromString($data->photo);
                    $description = strip_tags($data->description);
                    $prof_foi = strip_tags($data->prof_foi);
                    $election = strip_tags($data->election);
					//Do tuff
					try{
                        $req = $bd->prepare('INSERT INTO members(nom,adresse,tel,photo,description_candidat,prof_de_foi,election) 
                        			VALUES(:nom, :adresse, :tel, :photo, :description_candidat, :prof_de_foi, :election)');
                        $req->execute(array(
                                                                             'nom' => $nom,
                                                                             'adresse' => $adresse,
                                                                             'tel' => $tel,                           
                                                                             'photo' => $photo,
                                                                             'description_candidat'=>$description,
                                                                             'prof_de_foi'=>$prof_foi,
                                                                             'election'=>$election

                        ));
                        return json_encode(array('message'=>'Nouveau candidat ajouté','error' => false));
                    }catch(Exception $i){
                                  return json_encode(array('message' => 'Erreur d enregistrement du candidat!'));
}
}
?>