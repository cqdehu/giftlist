function register() {
    $.ajax({
        url: 'auth.php', // A kérés URL-je
        type: 'POST', // A kérés típusa (POST vagy GET)
        data: {username: "pelda", password: "jelszo"}, // A kéréshez tartozó adatok
        success: function(response) {
            // A szerver válaszának kezelése
            console.log(response);
        },
        error: function(xhr, status, error) {
            // A hiba kezelése, ha a kérés sikertelen
            console.log(error);
        }
    });    
}

register()


