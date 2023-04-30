<?php
session_start();
// Töröljük az összes munkamenet változót
session_unset();
// Töröljük a munkamenetet
session_destroy();

// Törlés a session-tárolóból
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}


setcookie('PHPSESSID', '', time()-3600);

?>
