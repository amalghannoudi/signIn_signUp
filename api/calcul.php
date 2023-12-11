<?php
/* Calcul*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ('database.php');
 $data = json_decode(file_get_contents("php://input"));
$idUser = $data->idUser ; 
$operation = $data->operation ; 
$resultat = $data->	resultat ; 
$nomF = $data->	nomF;


$stmt = $mycnx->prepare("INSERT INTO calcul (idUser, operation,nomF,resultat) VALUES (?, ?, ?,?)");
$stmt->bind_param("ssss", $idUser, $operation,$nomF, $resultat);
$stmt->execute();

$stmt->close();

echo json_encode(array("message" => "New row inserted."));
mysqli_close($mycnx);

 

?>