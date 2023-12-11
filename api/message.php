<?php
/* les informations su messgaes : consulter , supprimer , envoyer */
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
        if (isset($_GET['email'])) {
            $email = $_GET['email'];
            // pour spécifique mail
            $sql = "SELECT * FROM message WHERE destinataire = '$email'";
        } else {
            $sql = "SELECT * FROM message";
        }
$result = mysqli_query($mycnx, $sql);

if ($result->num_rows > 0) {
     $rows = array();
     while($row = $result->fetch_assoc()) {
         $rows[] = $row;
     }
     echo json_encode($rows);
 } 
  break;
   
 case "DELETE":
 $data = json_decode(file_get_contents("php://input"));
 $id = $data->id;

$sql = "DELETE FROM message WHERE id = '$id'";
$result = mysqli_query($mycnx, $sql);

if ($result) {
http_response_code(204); 
echo json_encode(array("message" => "Deleted."));

} else {
http_response_code(500); 
echo json_encode(array("message" => "Failed to delete record."));
}
     break ; 
    
 case "POST": 
    $user = json_decode(file_get_contents('php://input'));
    
    if (!empty($user->userName) && !empty($user->email) && !empty($user->destinataire) && !empty($user->message)) {
        $stmt = mysqli_prepare($mycnx, "INSERT INTO message (username, email, destinataire, message, date) VALUES (?, ?, ?, ?, ?)");
        $currentDate = date('Y-m-d'); // Ajoutez cette ligne pour obtenir la date actuelle
        mysqli_stmt_bind_param($stmt, "sssss", $user->userName, $user->email, $user->destinataire, $user->message, $currentDate); // Modifiez cette ligne pour inclure la date
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    
        echo json_encode(array(
            'success' => true,
            'message' => 'msg envoyé.',
        ));
    } else {
        echo json_encode(array(
            'success' => false,
            'message' => 'Les champs sont obligatoires !',
            "user" => array(
                "userName"=> $user->userName,
                "email" => $user->email,
                "message"=> $user->message,
                "destinataire"=> $user->destinataire
            )
        ));
    }
    
  


}
mysqli_close($mycnx);

?>