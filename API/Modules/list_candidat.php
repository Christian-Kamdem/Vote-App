<?php
function list_candidat(){
      include 'Helpers/bd.php';
	$bd = bd();
    try{
			$request = $bd->prepare('SELECT *
									  FROM members WHERE photo is NOT NULL');
	        $request->execute();
			}catch(Exception $e){
				return json_encode(array('message' => 'Database connection error!','error'=>true));
        }
    $user = array();
    while($infos = $request->fetch()){
                    array_push($user,['image'=>$infos['photo'],'nom'=>$infos['nom']]);
        

				}
				return json_encode(array('data'=>$user,'error'=>false));
}
?>