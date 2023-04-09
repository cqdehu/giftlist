<?php

// A cookie törlése
setcookie('jwt_token', '', time() - 3600, '/', '', true, true);

header("Location: /login.html");
exit;

?>