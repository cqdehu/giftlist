<?php

// A cookie törlése
setcookie('jwt_token', '', time() - 3600, '/', '', true, true);

include 'auth.php';

?>