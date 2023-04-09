function auth() {
    var token = getCookie('jwt_token'); // JWT lekérése a süti értékéből
    $.ajax({
        type: "POST",
        url: "auth.php",
        headers: {
            "Authorization": "Bearer " + token // JWT átadása az Authorization fejlécben
        },
        success: function() {
            console.log("Érvényes Token.")
        },
        error: function() {
            console.log("Érvénytelen Token.")
        }
    })
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


auth()

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
        auth()
    })
})

