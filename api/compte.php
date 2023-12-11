<?php
/* les informations du compte : consulter , modifier , supprimer */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,DELETE,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once ('database.php');

$mycnx = mysqli_connect($host, $user, $password, $database);


$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM compte where id!=1 ";
        
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
   
            case "PUT":
                $data = json_decode(file_get_contents("php://input"));
            
                $id = $data->id;
                $userName = $data->userName;
                $email = $data->email;
                $adresse = $data->adresse;
                $phone = $data->phone;
                $dateNaissance = $data->dateNaissance;
                $profession = $data->profession;
                $information = $data->information;
            
                $sql = "UPDATE compte SET 
                            userName = '{$userName}', 
                            email = '{$email}', 
                            adresse = '{$adresse}', 
                            phone = '{$phone}', 
                            dateNaissance = '{$dateNaissance}', 
                            profession = '{$profession}', 
                            information = '{$information}' 
                        WHERE 
                            id = '{$id}'";
                $result = mysqli_query($mycnx, $sql);
                if ($result) {
                    // Exécute une requête SELECT pour récupérer les nouvelles valeurs
                    $select_query = "SELECT * FROM compte WHERE id = $id";
                    $select_result = mysqli_query($mycnx, $select_query);
            
                    if ($select_result) {
                        $row = mysqli_fetch_assoc($select_result);
                        // Récupère les nouvelles valeurs
                        $id = $row['id'];
                        $nv_userName = $row['userName'];
                        $nv_email = $row['email'];
                        $nv_adresse = $row['adresse'];
                        $nv_phone = $row['phone'];
                        $nv_dateNaissance = $row['dateNaissance'];
                        $nv_profession = $row['profession'];
                        $nv_information = $row['information'];
            
                        // Retourne les nouvelles valeurs dans un tableau JSON
                        $nouvelles_valeurs = array(
                            "id" => $id,
                            "userName" => $nv_userName,
                            "email" => $nv_email,
                            "adresse" => $nv_adresse,
                            "phone" => $nv_phone,
                            "dateNaissance" => $nv_dateNaissance,
                            "profession" => $nv_profession,
                            "information" => $nv_information
                        );
                        echo json_encode($nouvelles_valeurs);
                    } else {
                        echo "La récupération des nouvelles valeurs a échoué.";
                    }
                } else {
                    echo "La mise à jour a échoué.";
                }
                break;
            
            



}
mysqli_close($mycnx);

?>
