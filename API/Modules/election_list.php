<?php
function election_list(){
    include 'Helpers/bd.php';
	$bd = bd();
    try{
			$request = $bd->prepare('SELECT *
									  FROM election ');
	        $request->execute();
			}catch(Exception $e){
				return json_encode(array('message' => 'Database connection error!','error'=>true));
        }
    $user = array();
    while($infos = $request->fetch()){
                    array_push($user,['id'=>$infos['id_election'],'nom'=>$infos['nom']]);

				}
				return json_encode(array('data'=>$user,'error'=>false));
}
?>