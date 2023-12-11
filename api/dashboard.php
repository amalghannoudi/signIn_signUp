<?php
/* les informations su dashboard (nbr les comptes,les messages , les packs  )*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ('database.php');


$mysqli = mysqli_connect($host, $user, $password, $database);

// nombre du compte
$sql = "SELECT COUNT(*) AS num_accounts FROM compte";
$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
$num_accounts = $row["num_accounts"];

// nombre du packs
$sql = "SELECT COUNT(*) AS num_packs FROM pack";
$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
$num_packs = $row["num_packs"];
// nombre du Messages
$sql = "SELECT COUNT(*) AS num_messages FROM message";
$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
$num_messages = $row["num_messages"];
// nombre des fichiers 
$sql = "SELECT COUNT(*) AS num_fichier FROM conversion";
$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
$num_fichier = $row["num_fichier"];

$data = array(
    "num_accounts" => $num_accounts,
    "num_packs" => $num_packs,
    "num_messages" => $num_messages,
    "num_fichier" => $num_fichier


);

echo json_encode($data);

$mysqli->close();

?>





