<?php

include 'DatabaseConnect.php';

include 'session.php';

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

// Function that will fetch session username
function getUsername()
{
    return $_SESSION['USERNAME'];
}

// Function that will fetch departamento value for the current user
function getDepartment()
{
    return $_SESSION['DEPARTAMENTO'];
}

// Function that will fetch all users (guests) from the database
function getUsers()
{
    global $conn;
    $sql = 'SELECT * FROM users WHERE ACT = 1 AND COLABORADOR = 1 ORDER BY concessao ASC';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $users;
}

function getUser($username)
{
    global $conn;
    $sql = 'SELECT * FROM users WHERE USERNAME = :username';
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    return $user;
}

function getTeam($username, $concessao)
{
    global $conn;
    $sql = 'SELECT * FROM users WHERE USERNAME != :username AND CONCESSAO = :concessao';
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':concessao', $concessao);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $team = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $team;
}
