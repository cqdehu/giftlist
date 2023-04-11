<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "failed";
} else {
    $username = $_SESSION['username'];
    echo $username;
}
