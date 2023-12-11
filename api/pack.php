<?php
/*manipuler les packs : Consulter , ajouter , modifier , suprimer */
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
        $sql = "SELECT * FROM pack";
        
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

 $sql = "DELETE FROM pack WHERE id = '$id'";
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
                $titre = $data->titre;
                $montant = $data->montant;
                $information = $data->information;
                $sql = "UPDATE pack SET 
                titre = '$titre', 
                montant = $montant, 
                information = '$information' 
            WHERE 
                id = $id;";
                $result = mysqli_query($mycnx, $sql);

                if ($result) {
                    // Exécute une requête SELECT pour récupérer les nouvelles valeurs
                    $select_query = "SELECT * FROM pack WHERE id = $id";
                    
                    $result = mysqli_query($mycnx, $sql);
                  
                            $row = mysqli_fetch_assoc($result);
                    // Récupère les nouvelles valeurs
                    $nouveau_titre = $row['titre'];
                    $nouveau_montant = $row['montant'];
                    $nouvelle_information = $row['information'];
                
                    // Retourne les nouvelles valeurs dans un tableau JSON
                    $nouvelles_valeurs = array(
                        "id" => $id,
                        "titre" => $nouveau_titre,
                        "montant" => $nouveau_montant,
                        "information" => $nouvelle_information
                    );
                    echo json_encode($nouvelles_valeurs);
                } else {
                    echo "La mise à jour a échoué.";
                
            }

            case "POST":
               $data = json_decode(file_get_contents("php://input"));
       
               $sql = "INSERT INTO pack (id, titre, montant, information) VALUES (NULL, '$data->titre', '$data->montant', '$data->information')";
               $result = mysqli_query($mycnx, $sql);
       
        if ($result) {
            http_response_code(204);
            echo json_encode(array("message" => "created."));
       
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to create record."));
        }
                   break ; 

           



}

mysqli_close($mycnx);

?>