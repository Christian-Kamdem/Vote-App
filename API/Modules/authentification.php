<?php
function authentification($data){
    include 'Helpers/isEmailExist.php';
	include 'Helpers/bd.php';
	include 'Helpers/encrypt_password.php';
	$bd = bd();
	$user = array();
	if(isEmailExist($data->cni,$bd) == false){
		return json_encode(array('message' => 'Cette CNI n existe pas!','error'=>true)); 
	}else{
		$cni = strip_tags($data->cni);
		$mdp = complex_mdp($data->mdp);
		 try{
			$request = $bd->prepare('SELECT *
									  FROM members 
									  WHERE cni = ? AND mdp = ?');
	        $request->execute([$cni,$mdp]);
			}catch(Exception $e){
				return json_encode(array('message' => 'Database connection error!','error'=>true));
			}	

			if($request->rowCount() < 1){
				return json_encode(array('message' => 'Aucun resultat trouver','error'=>true));
			}else{

				while($infos = $request->fetch()){
					$user['nom'] = $infos['nom'];
					$user['prenom'] = $infos['prenom'];
					$user['cni'] = $infos['cni'];
					$user['photo'] = $infos['photo'];

				}
				return json_encode(array('data'=>$user,'error'=>false));
			}		
		}
}
?>