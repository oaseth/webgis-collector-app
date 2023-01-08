<?php
include 'db.php';
$show_query = "SELECT name, ST_AsGeoJson(St_Transform(geom, 3857)) as geom FROM allcities";
$resultArray = pg_fetch_all(pg_query($dbconnection, $show_query));
echo json_encode($resultArray);
