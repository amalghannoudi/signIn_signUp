<?php
/* les informations du abonnement : consulter , supprimer, modifier */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,DELETE,GET,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ('database.php');

$mycnx = mysqli_connect($host, $user, $password, $database);
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT a.*, c.userName, c.email , p.titre 
        FROM abonnement a 
        JOIN compte c ON a.compte_id = c.id 
        JOIN pack p ON a.pack_id = p.id";

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

 case "DELETE":

 $data = json_decode(file_get_contents("php://input"));
 $id = $data->id;

$sql = "DELETE FROM abonnement WHERE id = '$id'";
$result = mysqli_query($mycnx, $sql);

if ($result) {
http_response_code(204); 
echo json_encode(array("message" => "Deleted."));

} else {
http_response_code(500); 
echo json_encode(array("message" => "Failed to delete record."));
}
     break ;

     case "PUT":
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        $dateF = $data->dateF;
        $sql = "UPDATE abonnement SET 
        dateF = '$dateF' 
    WHERE 
        id = $id;";
        $result = mysqli_query($mycnx, $sql);

        if ($result) {
                        // Récupère les nouvelles valeurs
            $select_query = "SELECT * FROM abonnement WHERE id = $id";
            $result = mysqli_query($mycnx, $sql);
          
            $row = mysqli_fetch_assoc($result);
            $nouveau_dateF = $row['dateF'];
           
        
            $nouvelles_valeurs = array(
                "id" => $id,
                "dateF" => $dateF,

            );
            echo json_encode($nouvelles_valeurs);
        } else {
            echo "La mise à jour a échoué.";
        
    }
break ; 
 



}
mysqli_close($mycnx);

?>