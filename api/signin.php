<?php
/*sign In*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ('database.php');



$user = json_decode(file_get_contents('php://input'));

$email = $user->email;
$password = $user->password;



$stmt = mysqli_prepare($mycnx, "SELECT * FROM compte WHERE  email = ? AND password = ?");

mysqli_stmt_bind_param($stmt, 'ss', $email, $password);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
if (!empty($user->email) && !empty($user->password)){
    if ($row = mysqli_fetch_assoc($result)) {
        if ($row['email'] == 'admin' && $row['password'] == 'admin') {
            // User is admin, redirect to dashboard
            echo json_encode(array(
                "success" => true,
                "message" => "admin signed in successfully.",
                "user" => array(
                    "id" => $row['id'],
                    "password"=> $row['password'],
                    "email" => $row['email']
                )
            ));
        } else {
            // User found, return success response
            echo json_encode(array(
                "success" => true,
                "message" => "User signed in successfully.",
                "user" => array(
                    "id" => $row['id'],
                    "userName"=> $row['userName'],
                    "email" => $row['email'],
                    "adresse"=> $row['adresse'],
                    "phone"=> $row['phone'],
                    "information"=> $row['information'],
                    "dateNaissance"=> $row['dateNaissance']
                )
            ));
        }
    } else { 
        echo json_encode(array("success" => false, "message" => "ce compte n'existe pas."));
    }
} else { 
    echo json_encode(array("success" => false, "message" => "les champs obligatoires."));
}

mysqli_close($mycnx);
?>
