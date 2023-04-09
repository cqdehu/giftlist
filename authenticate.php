<?php

require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

// JWT secret kulcsa
$jwt_secret = "kodolt_jelszo";

// JWT token kinyerése a cookie-ból
if (isset($_COOKIE['jwt_token'])) {
    $jwt = $_COOKIE['jwt_token'];

    try {
        // JWT token ellenőrzése és dekódolása
        $decoded_jwt = JWT::decode($jwt, $jwt_secret, array('HS256'));

        // Ha a token érvényes, akkor visszatérünk a felhasználónévvel
        return $decoded_jwt->sub;
    } catch (Exception $e) {
        // Ha a token érvénytelen, akkor false értékkel térünk vissza
        echo ":C";
        return false;
    }
} else {
    // Ha nincs JWT token a cookie-ban, akkor false értékkel térünk vissza
    echo ":C";
    return false;
    
}

?>
