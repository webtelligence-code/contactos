<?php

include 'DatabaseConnect.php';

include 'session.php';

use JeroenDesloovere\VCard\VCard;
use ZipStream\ZipStream;

require 'vendor/autoload.php';

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GET////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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
  $sql = 'SELECT * FROM users WHERE ACT = 1 AND COLABORADOR = 1 ORDER BY CONCESSAO ASC';
  $result = $conn->query($sql);

  $users = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
} else {
    echo "No data found";
}

  return $users;
}
function getUser($username)
{
  global $conn;
  $sql = 'SELECT * FROM users WHERE USERNAME = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $user = $result->fetch_assoc();

  return $user;
}
function getTeam($username, $cidade, $empresa)
{
  global $conn;
  $sql = 'SELECT * FROM users WHERE USERNAME != ? AND CIDADE = ? AND EMPRESA = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $cidade, $empresa);
  $stmt->execute();
  $result = $stmt->get_result();

  $team = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $team[] = $row;
    }
  }

  return $team;
}
function getUsersByConcession($concession)
{
  global $conn;
  $sql = 'SELECT * FROM users WHERE ACT = 1 AND COLABORADOR = 1 AND CONCESSAO = ? ORDER BY NAME ASC';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $concession);
  $stmt->execute();
  $result = $stmt->get_result();

  $users = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }
  }

  return $users;
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////POST////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function updateUser($username, $phone, $dateOfBirth, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt)
{
  global $conn;
  $sql = 'UPDATE users
          SET
          CONTACTO = ?,
          DATA_NASCIMENTO = ?,
          nCalcas = ?,
          nCamisa = ?,
          nCasaco = ?,
          nPolo = ?,
          nPullover = ?,
          nSapato = ?,
          nSweatshirt = ?,
          nTshirt = ?
          WHERE USERNAME = ?
        ';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sdissssisss', $phone, $dateOfBirth, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt, $username);
  $result = $stmt->execute();

  if ($result) {
    $response = [
      'status' => 'success',
      'message' => 'Perfil atualizado com successo!',
      'title' => 'Atualizado!'
    ];
  } else {
    $response = [
      'status' => 'error',
      'message' => 'Ocorreu um erro ao ao tentar atualizar dados na base de dados. Tente novamente e, se o erro persistir, informe o Departamento Informático.',
      'title' => 'Erro!'
    ];
  }

  return $response;
}

function escapeVCardValue($value)
{
  $value = iconv(mb_detect_encoding($value, mb_detect_order(), true), "UTF-8", $value);
  $value = str_replace(";", "\\;", $value);
  $value = str_replace(",", "\\,", $value);
  $value = str_replace("\n", "\\n", $value);
  return $value;
}

function generateVCardUser($user)
{
  $vcard = new VCard();

  $vcard->setCharset('UTF-8');

  // Separate first and last names
  $nameParts = explode(' ', $user['NAME']);
  $firstName = $nameParts[0];
  $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

  // Add user information to the VCard
  $vcard->addName($lastName, $firstName);
  $vcard->addCompany($user['EMPRESA'], $user['DEPARTAMENTO']);
  $vcard->addJobTitle($user['FUNCAO']);
  $vcard->addRole($user['FUNCAO']);
  $vcard->addEmail($user['EMAIL']);
  $vcard->addPhoneNumber($user['CONTACTO'], 'PREF;WORK;VOICE');

  // Send the VCard as a response
  header('Content-Type: text/vcard');
  header('Content-Disposition: attachment; filename="' . $user['USERNAME'] . '.vcf"');

  echo $vcard->getOutput();
}

function generateVCardConcession($concession)
{
  $users = getUsersByConcession($concession);

  // Create a zip archive to store multiple vcards
  $zip = new ZipStream('vcards_concessao_' . $concession . '.zip');

  foreach ($users as $user) {
    $vcard = new VCard();

    $vcard->setCharset('UTF-8');

    // Separate first and last names
    $nameParts = explode(' ', $user['NAME']);
    $firstName = $nameParts[0];
    $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

    // Add user information to the VCard
    $vcard->addName($lastName, $firstName);
    $vcard->addCompany($user['EMPRESA'], $user['DEPARTAMENTO']);
    $vcard->addJobTitle($user['FUNCAO']);
    $vcard->addRole($user['FUNCAO']);
    $vcard->addEmail($user['EMAIL']);
    $vcard->addPhoneNumber($user['CONTACTO'], 'PREF;WORK;VOICE');

    // Add the VCard to the zip archive
    $zip->addFile($user['USERNAME'] . '.vcf', $vcard->getOutput());
  }

  $zip->finish(); // Finish the zip creation
}
