<?php
/* les informations du emplacement : consulter  */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,DELETE,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once ('database.php');

$mycnx = mysqli_connect($host, $user, $password, $database);

        
$sql = "SELECT emp.*, c.email
FROM emplacement emp
JOIN compte c ON emp.id_compte = c.id";

        
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

 
mysqli_close($mycnx);

?>
