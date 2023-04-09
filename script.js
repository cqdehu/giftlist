$(document).ready(function(){
    $("#logoutBtn").click(function(){
        $.ajax({
            type: "POST",
            url: "logout.php",
            success: function() {
                console.log("A jwt_token cookie sikeresen törölve lett!");
            },
            error: function() {
                console.log("Hiba történt a jwt_token cookie törlésekor!");
            }
        });
    })
})