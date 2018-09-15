<?php
function inscription($data){
	include 'Helpers/bd.php';
	include 'Helpers/encrypt_password.php';
	include 'Helpers/uploadFile.php';
	$bd = bd();
	//We check the kind of account for registration
			if(isset($data->nom) AND isset($data->prenom) AND isset($data->email) AND isset($data->datenais)
				AND isset($data->mdp) AND isset($data->tel)){
				//For customer the type code is 2				
					$nom = strip_tags($data->nom);
					$prenom = strip_tags($data->prenom);
					$email = strip_tags($data->email);
					$mdp = complex_mdp($data->mdp);
					$tel = strip_tags($data->tel);
                    $datenais = strip_tags($data->datenais);
				//We check if this customer already exist
				if(isEmailExist($email,$bd) === true){
					return json_encode(array('message' => 'Cette adresse existe!'));
				}else{
					//Do tuff
					try{
                        $req = $bd->prepare('INSERT INTO members(nom,prenom,email,datenais,mdp,tel) 
                        			VALUES(:nom, :prenom, :email, :datenais, :mdp, :tel)');
                        $req->execute(array(
                                                                             'nom' => $nom,
                                                                             'prenom' => $prenom,
                                                                             'email' => $email,                                                                             
                                                                             'datenais' => $datenais,
                                                                             'mdp' => $mdp,
                                                                             'tel'=>$tel

                        ));
                        return json_encode(array('message' => 'Nouveau membre ajouté!'));
                    }catch(Exception $i){
                                  return json_encode(array('message' => 'Erreur d enregistrement du nouveau membre!'));
                              } 
				}
			}else{
				return json_encode(array('message' => 'Number of insufficient parameters for customer registration!'));
			}
}
}
?>