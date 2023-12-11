<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,DELETE,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once ('database.php');
$method = $_SERVER['REQUEST_METHOD'];
//$user_id = $_POST['userId'];
switch($method) {
    case "POST":

if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) {
    $name1 = $_FILES["file"]["name"];
    $type1 = $_FILES["file"]["type"];
    $tmp_name1 = $_FILES["file"]["tmp_name"];
    $user_id = $_POST['userId'];

   $chemin1 = "C:/xampp/htdocs/projet/telechargement/FichierImporter/";
    move_uploaded_file($tmp_name1, $chemin1 . $name1);

    if (isset($_FILES["file2"]) && $_FILES["file2"]["error"] == 0) {
        $name2 = $_POST['filename2'];
        $type2 = $_FILES["file2"]["type"];
        $tmp_name2 = $_FILES["file2"]["tmp_name"];
    

    $chemin2 = "C:/xampp/htdocs/projet/telechargement/FichierResultat/";
    
    move_uploaded_file($tmp_name2, $chemin2 . $name2);
    $sql = "INSERT INTO conversion (nomF1, typeF1, cheminF1,nomF2,typeF2,cheminF2,idUser) VALUES ('$name1', '$type1', '$chemin1$name1','$name2', '$type2', '$chemin2$name2','$user_id')";
    $result = mysqli_query($mycnx, $sql);
     
if ($result) {
    echo "conversion inseré avec succées.";
  } else {
    echo "Error: " ;
  }
    }
    break ; 
}
    case "GET":
        if (isset($_GET['idUser'])) {
            $id = $_GET['idUser'];
            $sql = "SELECT cnv.*, c.email
            FROM conversion cnv 
            JOIN compte c ON cnv.idUser = c.id 
            WHERE c.id = '$id'";
            
  }else {    
    $sql = "SELECT cnv.*, c.email
    FROM conversion cnv 
    JOIN compte c ON cnv.idUser = c.id";
    
  }
$result = mysqli_query($mycnx, $sql);

if ($result->num_rows > 0) {
     $rows = array();
     while($row = $result->fetch_assoc()) {
         $rows[] = $row;
     }
     echo json_encode($rows);
 } else {
     echo "No data found";
 }
 break;


}
$mycnx->close();

?>
