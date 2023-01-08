<?php
$server = 'localhost';
$username = 'postgres';
$password = '*********';
$db_name = 'spatialdata';

$dbconnection = pg_connect("host=$server port=5432 dbname=$db_name user=$username password=$password");
