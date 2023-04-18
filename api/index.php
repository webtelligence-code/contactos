<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

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
                $username = isset($_GET['username']) ? $_GET['username'] : '';
                $concessao = isset($_GET['concessao']) ? $_GET['concessao'] : '';
                $response = getTeam($username, $concessao);
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
            case 'add_apartment':
                break;
            case 'update_apartment':
                break;
        }

        echo json_encode($response); // return $response
        break;

        // DELETE REQUESTS
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
        $delete_action = isset($_DELETE['action']) ? $_DELETE['action'] : '';

        switch ($delete_action) {
            case 'delete_apartment':
                break;
        }
        break;
}
