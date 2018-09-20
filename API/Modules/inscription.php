<?php
function inscription($data){
	include 'Helpers/bd.php';
    include 'Helpers/isEmailExist.php';
	include 'Helpers/encrypt_password.php';
	include 'Helpers/uploadFile.php';
	$bd = bd();
	//We check the kind of account for registration
			if(isset($data->nom) AND isset($data->prenom) AND isset($data->cni) AND isset($data->datenais)
				AND isset($data->mdp) AND isset($data->tel)){		
					$nom = strip_tags($data->nom);
					$prenom = strip_tags($data->prenom);
					$cni = strip_tags($data->cni);
					$mdp = complex_mdp($data->mdp);
					$tel = strip_tags($data->tel);
                    $datenais = strip_tags($data->datenais);
				//We check if this customer already exist
				if(isEmailExist($cni,$bd) === true){
					return json_encode(array('message' => 'Cette CNI existe!'));
				}else{
					//Do tuff
					try{
                        $req = $bd->prepare('INSERT INTO members(nom,prenom,cni,datenais,mdp,tel) 
                        			VALUES(:nom, :prenom, :cni, :datenais, :mdp, :tel)');
                        $req->execute(array(
                                                                             'nom' => $nom,
                                                                             'prenom' => $prenom,
                                                                             'cni' => $cni,                                                  
                                                                             'datenais' => $datenais,
                                                                             'mdp' => $mdp,
                                                                             'tel'=>$tel

                        ));
                        return json_encode(array('message' => 1));
                    }catch(Exception $i){
                                  return json_encode(array('message' => 'Erreur d enregistrement du nouveau membre!'));
                              } 
				}
			}else{
				return json_encode(array('message' => 'Veuillez remplir tous les champs!'));
			}

}
?>