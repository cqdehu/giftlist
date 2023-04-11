<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "failed";
} else {
    $id = $_SESSION['id'];
    $username = $_SESSION['username'];
    echo $username.";".$id;
}
