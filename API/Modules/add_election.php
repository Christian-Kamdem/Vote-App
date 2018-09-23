<?php
function add_election($data){
	include 'Helpers/bd.php';
	$bd = bd();
		
					$nom_election = strip_tags($data->nom_election);
					$type_election = strip_tags($data->type_election);
					$date_debut = strip_tags($data->datedebut);
                    $date_fin = strip_tags($data->datefin);
                    $libelle = strip_tags($data->libelle);
					//Do tuff
					try{
                        $req = $bd->prepare('INSERT INTO election(nom,type_election,date_debut,date_fin,libelle) 
                        			VALUES(:nom, :type_election, :date_debut, :date_fin, :libelle)');
                        $req->execute(array(
                                                                             'nom' => $nom_election,
                                                                             'type_election' => $type_election,
                                                                             'date_debut' => $date_debut,                           
                                                                             'date_fin' => $date_fin,
                                                                             'libelle'=>$libelle

                        ));
                        return json_encode(array('message'=>'Nouvelle election ajoutee','error' => false));
                    }catch(Exception $i){
                                  return json_encode(array('message' => 'Erreur d enregistrement de l election!'));
                              } 

}
?>