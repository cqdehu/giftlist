<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo ":C";
    header("Location: login.html");
    exit();
}

echo ":D"
?>