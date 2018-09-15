<?php
function authentification($data){
    include 'Helpers/isEmailExist.php';
	include 'Helpers/bd.php';
	include 'Helpers/encrypt_password.php';
	$bd = bd();
	$user = array();
	if(isEmailExist($data->email,$bd) == false){
		return json_encode(array('message' => 'Cette adresse mail n existe pas!')); 
	}else{
		$email = strip_tags($data->email);
		$mdp = complex_mdp($data->password);
		 try{
			$request = $bd->prepare('SELECT *
									  FROM members 
									  WHERE email = ? AND mdp = ?');
	        $request->execute([$email,$mdp]);
			}catch(Exception $e){
				return json_encode(array('message' => 'Database connection error!','error'=>true));
			}	

			if($request->rowCount() < 1){
				return json_encode(array('message' => 'Not found','error'=>true));
			}else{

				while($infos = $request->fetch()){
					$user['nom'] = $infos['nom'];
					$user['prenom'] = $infos['prenom'];
					$user['email'] = $infos['email'];
					$user['photo'] = $infos['photo'];

				}
				return json_encode($user);
			}		
		}
}
?>