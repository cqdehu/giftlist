<?php

$decoded = JWT::decode($_COOKIE['jwt_token'], "kodolt_jelszo", array('HS256'));
$now = time();
if ($decoded->exp < $now) {
    // Ha a token lejárt, akkor visszairányítjuk a felhasználót a bejelentkezési oldalra
    header("Location:/login.html");
    exit;
}

?>