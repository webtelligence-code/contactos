<?php

class DatabaseConnect
{
    private $server = 'localhost';
    private $dbname = 'webtelli_amatoscar';
    private $user = 'webtelli_root';
    private $pass = 'matoscarroot';

    public function connect()
    {
        $conn = mysqli_connect($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die('Database Error:' . $conn->connect_error);
        } else {
            $conn->set_charset('utf8');
        }

        return $conn;
    }
}