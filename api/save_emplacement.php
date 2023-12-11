<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,DELETE,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once ('database.php');

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "POST":
        $data = json_decode($_POST['shape']);
        $userId = $_POST['userId'];
        /* echaper les caracteres spéciaux */
        $layerId = mysqli_real_escape_string($mycnx, $data->layerId);
        $type = mysqli_real_escape_string($mycnx, $data->type);
        $coordinates = json_encode($data->coordinates);
        echo $coordinates ; 
        $sql = "INSERT INTO  emplacement (num, type, coordonnes, idUser) VALUES ('$layerId', '$type', '$coordinates', '$userId')";
      
        
        if ($result) {
            echo json_encode(array("success" => "true", "message" => "Emplacement crée!"));
        
        } else {
            echo json_encode(array("success" => "false", "message" => "Operation failed!"));
        }
        
        break ; 
  case "PUT" : 
    $data = json_decode(file_get_contents("php://input"));
    $coordinates = json_encode($data->coordinates);


$sql = "SELECT MAX(id) AS max_id FROM emplacement";
$result = mysqli_query($mycnx, $sql);
$row = mysqli_fetch_assoc($result);
$id = $row['max_id'];

$sql = "update emplacement set 
coordonees = '$coordinates'
WHERE 
id = $id ";
$result = mysqli_query($mycnx, $sql);
if ($result) {
   echo json_encode(array("success" => "true", "message" => "Emplacement modifié!"));
} else {
    echo json_encode(array("success" => "false", "message" => "Operation failed!"));
}

break ; 
    case "DELETE":
$sql = "SELECT MAX(id) AS max_id FROM emplacement";
$result = mysqli_query($mycnx, $sql);
$row = mysqli_fetch_assoc($result);
$id = $row['max_id'];

$sql = "DELETE FROM emplacement WHERE id = $id";
$result = mysqli_query($mycnx, $sql);
if ($result) {
    echo json_encode(array("success" => "true", "message" => "Emplacement supprimé!"));
} else {
    echo json_encode(array("success" => "false", "message" => "Operation failed!"));
}


      break ; 




}

$mycnx->close();
?>
