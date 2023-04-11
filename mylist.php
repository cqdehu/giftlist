<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "failed";
    include 'mylist.php';
} else {
    $username = $_SESSION['username'];
    echo $username;
}
