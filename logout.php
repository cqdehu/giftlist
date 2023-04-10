<?php
session_start();
// Töröljük az összes munkamenet változót
session_unset();
// Töröljük a munkamenetet
session_destroy();
// Átirányítjuk a felhasználót a bejelentkezési oldalra

header("Location: login.html");
exit();
?>
