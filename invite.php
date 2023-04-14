<?php

session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $invitedUser = $_POST['invitedUser'];

    if (!empty($invitedUser)) {
        echo "Invited successfull!";
    } else {
        echo $invitedUser;
    }

    

    
}