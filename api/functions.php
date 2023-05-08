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
function getTeam($chefe, $username, $chefia)
{
  global $conn;
  $sql = 'SELECT * FROM users WHERE COLABORADOR = 1 AND ACT = 1 AND (CHEFIA = ? OR USERNAME = ?)';

  $stmt = $conn->prepare($sql);

  if ($chefe == 1) {
    $stmt->bind_param('ss', $username, $chefia);
  } else {
    $stmt->bind_param('ss', $chefia, $chefia);
  }

  $stmt->execute();
  $result = $stmt->get_result();

  $team = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $team[] = $row;
    }
  }

  usort($team, function ($a, $b) {
    if ($a['CHEFE'] == 1 && $b['CHEFE'] != 1) {
      return -1;
    } elseif ($a['CHEFE'] != 1 && $b['CHEFE'] == 1) {
      return 1;
    } else {
      return 0;
    }
  });

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

function generateLogMessage($username, $personalEmail, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt)
{
  global $conn;
  // Fetch existing user data
  $sql = 'SELECT * FROM users WHERE USERNAME = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $stmt->execute();

  $existingUser = $stmt->get_result()->fetch_assoc();
  // Compare new values with existing values and construct log messag
  $logMessage = 'O utilizador fez mudanças nos campos ';
  $changeFields = [];

  // Add current date and time to the log message
  $dateTime = new DateTime('now', new DateTimeZone('Europe/Lisbon'));
  $formattedDateTime = $dateTime->format('Y-m-d H:i:s');

  if ($personalEmail !== '' && $personalEmail !== $existingUser['EMAIL_PESSOAL']) {
    $changeFields[] = 'EMAIL_PESSOAL ("' . $personalEmail . '")';
  }
  if ($pants !== 0 && $pants !== $existingUser['nCalcas']) {
    $changeFields[] = 'nCalcas ("' . $pants . '")';
  }
  if ($shirt !== '' && $shirt !== $existingUser['nCamisa']) {
    $changeFields[] = 'nCamisa ("' . $shirt . '")';
  }
  if ($jacket !== '' && $jacket !== $existingUser['nCasaco']) {
    $changeFields[] = 'nCasaco ("' . $jacket . '")';
  }
  if ($polo !== '' && $polo !== $existingUser['nPolo']) {
    $changeFields[] = 'nPolo ("' . $polo . '")';
  }
  if ($pullover !== '' && $pullover !== $existingUser['nPullover']) {
    $changeFields[] = 'nPullover ("' . $pullover . '")';
  }
  if ($shoe !== 0 && $shoe !== $existingUser['nSapato']) {
    $changeFields[] = 'nSapato ("' . $shoe . '")';
  }
  if ($sweatshirt !== '' && $sweatshirt !== $existingUser['nSweatshirt']) {
    $changeFields[] = 'nSweatshirt ("' . $sweatshirt . '")';
  }
  if ($tshirt !== '' && $tshirt !== $existingUser['nTshirt']) {
    $changeFields[] = 'nTshirt ("' . $tshirt . '")';
  }

  // Log message
  $logMessage .= implode(', ', $changeFields);
  $logMessage .= ' em ' . $formattedDateTime;

  return $logMessage;
}

function updateUser($username, $personalEmail, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt)
{
  global $conn;

  // Call the function to generate a log message
  $logMessage = generateLogMessage($username, $personalEmail, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt);

  // Update the user with the new values and log message
  $sql = "UPDATE users
          SET
          EMAIL_PESSOAL = COALESCE(NULLIF(?, ''), EMAIL_PESSOAL),
          nCalcas = COALESCE(NULLIF(?, 0), nCalcas),
          nCamisa = COALESCE(NULLIF(?, ''), nCamisa),
          nCasaco = COALESCE(NULLIF(?, ''), nCasaco),
          nPolo = COALESCE(NULLIF(?, ''), nPolo),
          nPullover = COALESCE(NULLIF(?, ''), nPullover),
          nSapato = COALESCE(NULLIF(?, 0), nSapato),
          nSweatshirt = COALESCE(NULLIF(?, ''), nSweatshirt),
          nTshirt = COALESCE(NULLIF(?, ''), nTshirt),
          LOG = ?
          WHERE USERNAME = ?
        ";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sissssissss', $personalEmail, $pants, $shirt, $jacket, $polo, $pullover, $shoe, $sweatshirt, $tshirt, $logMessage, $username);
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

/**
 * This function will remove any accentuation from the string given in the parameter
 * @param mixed $string 
 * @return mixed Final string without accentuation
 */
function removeAccents($string)
{
  if (class_exists('Normalizer')) {
    $string = Normalizer::normalize($string, Normalizer::FORM_D);
    $string = preg_replace('/[\x{0300}-\x{036f}]/u', '', $string);
  }

  return $string;
}

/**
 * THis function will generate a VCard for the user given
 * @param mixed $user 
 * @return void 
 */
function generateVCardUser($user)
{
  $vcard = new VCard();

  $vcard->setCharset('UTF-8');

  // Separate first and last names
  $nameParts = explode(' ', $user['NAME']);
  $firstName = removeAccents($nameParts[0]);
  $lastName = isset($nameParts[1]) ? removeAccents($nameParts[1]) : '';

  // Add user information to the VCard
  $vcard->addName($lastName, $firstName);
  $vcard->addCompany(removeAccents($user['EMPRESA']), removeAccents($user['DEPARTAMENTO']));
  $vcard->addJobTitle(removeAccents($user['FUNCAO']));
  $vcard->addRole(removeAccents($user['FUNCAO']));
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
    $firstName = removeAccents($nameParts[0]);
    $lastName = isset($nameParts[1]) ? removeAccents($nameParts[1]) : '';

    // Add user information to the VCard
    $vcard->addName($lastName, $firstName);
    $vcard->addCompany(removeAccents($user['EMPRESA']), removeAccents($user['DEPARTAMENTO']));
    $vcard->addJobTitle(removeAccents($user['FUNCAO']));
    $vcard->addRole(removeAccents($user['FUNCAO']));
    $vcard->addEmail($user['EMAIL']);
    $vcard->addPhoneNumber($user['CONTACTO'], 'PREF;WORK;VOICE');

    // Add the VCard to the zip archive
    $zip->addFile($user['USERNAME'] . '.vcf', $vcard->getOutput());
  }

  $zip->finish(); // Finish the zip creation
}

function updateAvatar($username, $image) {

  $response = ['success' => true, 'message' => 'updateAvatar Function'];
  $directoryPath = "workers/{$username}";

  if (!file_exists($directoryPath)) {
    mkdir($directoryPath, 0755, true);
  }

  $targetPath = "{$directoryPath}/{$username}.webp";

  // Extract base64 data
  $base64Data = substr($image, strpos($image, ',') + 1);

  // Decode base64 data
  $decodedData = base64_decode($base64Data);

  // Save the decoded data as a file
  if (file_put_contents($targetPath, $decodedData)) {
    $response = ['success' => true, 'message' => 'Avatar atualizado com sucesso!'];
  } else {
    $response = ['success' => false, 'message' => 'Erro ao guardar avatar'];
  }

  return $response;
}

