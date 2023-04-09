$(document).ready(function(){
    $("#logoutBtn").click(function(){
        $.ajax({
            type: "POST",
            url: "delete_jwt_token.php",
            success: function() {
                console.log("A jwt_token cookie sikeresen törölve lett!");
            },
            error: function() {
                console.log("Hiba történt a jwt_token cookie törlésekor!");
            }
        });
    })
})