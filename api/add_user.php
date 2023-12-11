<?php
/* sign up*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ('database.php');

// recuperer user input du requete
$user = json_decode(file_get_contents('php://input'));

if (!empty($user->userName) && !empty($user->email) && !empty($user->adresse) && !empty($user->phone) && !empty($user->password)&& !empty($user->profession)&& !empty($user->dateNaissance)&& !empty($user->information)) {
  // verifier si l email existe deja
  $stmt = mysqli_prepare($mycnx, "SELECT COUNT(*) FROM compte WHERE email = ?");
  mysqli_stmt_bind_param($stmt, "s", $user->email);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_bind_result($stmt, $count);
  mysqli_stmt_fetch($stmt);
  mysqli_stmt_close($stmt);
  
  if ($count > 0) {
   echo json_encode(array(
      'success' => false,
      'message' => 'Email existe déja.',
    ));

    }   else if (!filter_var($user->email, FILTER_VALIDATE_EMAIL)) {

        echo json_encode(array("success" => false, "message" => "Email invalid !"));

    } else if (!is_numeric($user->phone)) {

        echo json_encode(array("success" => false, "message" => "Phone invalide ."));
    }
    else if  (strlen($user->phone) != 8) {

        echo json_encode(array("success" => false, "message" => "Longeur Phone invalide ."));
    }
    else if (!DateTime::createFromFormat('Y/m/d', $user->dateNaissance) || $user->dateNaissance !== DateTime::createFromFormat('Y/m/d', $user->dateNaissance)->format('Y/m/d')) {
     {
      echo json_encode(array("success" => false, "message" => "Date de Naissance invalide."));
    }
   
  }
  
  else {
    // creer account si email n'existe pas
    $stmt = mysqli_prepare($mycnx, "INSERT INTO compte (username, email, adresse, phone,information,dateNaissance,profession, password) VALUES (?, ?, ?, ?, ?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "ssssssss", $user->userName, $user->email, $user->adresse, $user->phone,$user->information,$user->dateNaissance, $user->profession,$user->password);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
  

    echo json_encode(array(
      'success' => true,
      'message' => 'User account created.',
    ));

  }
} else {

  
 echo json_encode(array(
    'success' => false,
    'message' => 'Les champs sont obligatoires !',
  ));

}

// Close database connection
mysqli_close($mycnx);

 

?>