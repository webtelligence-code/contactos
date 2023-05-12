<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

include 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // GET REQUESTS
  case 'GET':
    $get_action = isset($_GET['action']) ? $_GET['action'] : '';
    switch ($get_action) {
      case 'get_username':
        $response = getUsername();
        break;
      case 'get_users':
        $response = getUsers();
        break;
      case 'get_user':
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $response = getUser($username);
        break;
      case 'get_team':
        $chefia = isset($_GET['chefia']) ? $_GET['chefia'] : '';
        $chefe = isset($_GET['chefe']) ? $_GET['chefe'] : '';
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $response = getTeam($chefe, $username, $chefia);
        break;
      default:
        if ($get_action == '') {
          $response = 'Get action not specified. Please add an action type to the request.';
        } else {
          $response = 'Get action "' . $get_action . '" does not exist in the API.';
        }
        break;
    }

    echo json_encode($response);
    break;

    // POST REQUESTS
  case 'POST':
    $post_action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($post_action) {
        // UPDATE USER RESPONSE
      case 'update_user':
        $username = isset($_POST['username']) ? $_POST['username'] : '';
        $personalEmail = isset($_POST['personalEmail']) ? $_POST['personalEmail'] : '';
        $pants = isset($_POST['pants']) ? $_POST['pants'] : '';
        $shirt = isset($_POST['shirt']) ? $_POST['shirt'] : '';
        $jacket = isset($_POST['jacket']) ? $_POST['jacket'] : '';
        $polo = isset($_POST['polo']) ? $_POST['polo'] : '';
        $pullover = isset($_POST['pullover']) ? $_POST['pullover'] : '';
        $shoe = isset($_POST['shoe']) ? $_POST['shoe'] : '';
        $sweatshirt = isset($_POST['sweatshirt']) ? $_POST['sweatshirt'] : '';
        $tshirt = isset($_POST['tshirt']) ? $_POST['tshirt'] : '';

        $response = updateUser($username, $personalEmail, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt);

        break;
      case 'generate_vcard':
        if (isset($_POST['user'])) {
          $user = json_decode($_POST['user'], true);

          $response = generateVCardUser($user);
        } else if (isset($_POST['concessao'])) {
          $concessao = $_POST['concessao'];

          $response = generateVCardConcession($concessao);
        }
        break;
      case 'update_avatar':
        //$response = ['success' => false, 'message' => 'Entered update_avatar case.'];
        if (isset($_FILES['image']) && isset($_POST['username'])) {
          $username = $_POST['username'];
          $image = $_FILES['image'];

          $response = updateAvatar($username, $image);
        }
        break;
      case 'update_password':
          if (isset($_POST['password']) && isset($_POST['username'])) {
            $password = $_POST['password'];
            $username = $_POST['username'];

            $response = updatePassword($password, $username);
          }
        break;
      default:
        if ($post_action == '') {
          $response = 'POST action not specified. Please add an action type to the request.';
        } else {
          $response = 'POST action "' . $post_action . '" does not exist in the API.';
        }
        break;
    }

    echo json_encode($response); // return $response
    break;
}
