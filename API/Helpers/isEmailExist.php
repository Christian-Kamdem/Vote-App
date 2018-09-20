<?php
function isEmailExist($cni,$bd){
	$email = strip_tags($cni);
	$req = $bd->prepare('SELECT cni FROM members WHERE cni = :cni');
	$req->execute(array('cni'=> $cni));
	if($req->rowCount() >= 1){
		return true;
	}else{
		return false;
	}
}
?>