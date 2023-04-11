const toast = document.querySelector('#alertToast')
var alertToast = bootstrap.Toast.getOrCreateInstance(toast)
var toastText = document.querySelector(".toast-body")

$(document).ready(function () {
    auth()
    loadItem()
})

function auth() {
    $.ajax({
        type: "GET",
        url: "mylist.php",
        success: function (data) {
            // Sikeres válasz esetén kezeljük a visszatérő adatot
            if (data == "failed") {
                // A felhasználó nincs bejelentkezve, megjelenítjük az üzenetet
                console.log("A felhasználó nincs bejelentkezve!")
                window.location.replace("login.html");

            } else {
                // A felhasználó be van jelentkezve, megjelenítjük a tartalmat
                console.log("A felhasználó be van jelentkezve!")
                $("#displayTitle").text(data)
                document.title = data + " | " + "GIFTLIST"
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    });
}



function loadItem() {
    $.ajax({
        url: "getitem.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
            // Az adatok feldolgozása
            for (var i = 0; i < data.length; i++) {
                var name = data[i].name;
                var status = data[i].status;
                var user = data[i].user;
                var createDate = data[i].createDate;
                console.log(name + ", " + status + ", " + user + ", " + createDate + ", ")

                const newCardDiv = document.createElement("div")
                newCardDiv.className = "row bg-white ms-4 mb-4 rounded-start-4 align-items-center item-card ";
                newCardDiv.id = name

                const newItemNameDiv = document.createElement("div")
                newItemNameDiv.className = "col p-3 "

                const newItemName = document.createElement("h5")
                newItemName.className = "TiltWrap m-0 user-select-none "
                newItemName.innerHTML = name

                const newItemStatusDiv = document.createElement("div")
                newItemStatusDiv.className = "col-2 text-end me-4"


                const newItemStatus = document.createElement("img")
                newItemStatus.className = "icon_status"

                if (status == 3) {
                    newItemStatus.src = "surce/3.svg"
                }
                if (status == 2) {
                    newItemStatus.src = "surce/2.svg"
                }
                if (status == 1) {
                    newItemStatus.src = "surce/1.svg"
                }
                if (status == 0) {
                    newItemStatus.src = ""
                }


                listItems.appendChild(newCardDiv)
                newCardDiv.appendChild(newItemNameDiv)
                newItemNameDiv.appendChild(newItemName)
                newCardDiv.appendChild(newItemStatusDiv)
                newItemStatusDiv.appendChild(newItemStatus)



            }

        },
        error: function (response) {
            if (response != "failed") {
                console.log("Elemek betöltése sikeres!");
            } else {
                toastText.innerHTML = response;
                alertToast.show()
            }
        }

    });
}

//logout
$(document).ready(function () {
    $("#logoutBtn").click(function () {
        // AJAX hívás küldése a szervernek
        $.ajax({
            type: "POST",
            url: "logout.php",
            success: function (data) {
                // Sikeres válasz esetén átirányítjuk a felhasználót a bejelentkezési oldalra
                window.location.href = "login.html";
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    })
});

//addItem
$(document).ready(function () {
    $("#addItemBtn").click(function () {

        if (auth) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;


            var name = $("#enterItemName")
            var status = $("#enterItemStatus")
            var createDate = formattedDate

            $.ajax({
                type: "POST",
                url: "additem.php",
                data: { name: name.val(), status: status.val(), createDate: createDate, },
                success: function (response) {
                    console.log(response);
                    if (response == "success") {
                        // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                        console.log("sikeres hozzáadás")
                        $("#listItems").empty();
                        loadItem()
                    } else {
                        // hibaüzenet megjelenítése
                        toastText.innerHTML = response;
                        alertToast.show()
                    }
                },
                error: function () {
                    // Hibás AJAX hívás esetén kezeljük a hibát
                    $("#message").html("Hiba történt az AJAX hívás során.");
                }
            })
        }

    })
})

//selectedItem
let lastClickedCard = null;

function removeCardBorder() {
    if (lastClickedCard) {
        lastClickedCard.removeClass("border border-end-0 border-4 border-danger last-clicked");
        lastClickedCard = null;
    }
}

function addCardBorder(card) {
    removeCardBorder();
    card.addClass("border border-end-0 border-4 border-danger last-clicked");
    lastClickedCard = card;
    console.log(lastClickedCard.attr("id"));
}

function handleCardClick(event) {
    const card = $(event.target).closest('.item-card');
    if (!card.length) {
        return;
    }

    addCardBorder(card);
}

if (lastClickedCard) {
    lastClickedCard.on('click', function () {
        removeCardBorder();
    });
}

$(document).on('dblclick', '.item-card', function (event) {
    const card = $(event.target).closest('.item-card');
    if (!card.length) {
        return;
    }

    if (card.is(lastClickedCard)) {
        removeCardBorder();
    } else {
        addCardBorder(card);
    }
});

$('#deleteItemBtn').on('click', function () {
    if (auth) {
        if (!lastClickedCard) {
            return;
        }

        const itemId = lastClickedCard.attr('id');
        const username = '<?php echo $_SESSION["username"]; ?>';

        $.ajax({
            type: "POST",
            url: "deleteitem.php",
            data: { itemId: itemId, username: username },
            success: function (response) {
                console.log('Sikeresen törölted az adatot az adatbázisból.');
                lastClickedCard.remove();
                lastClickedCard = null;
            },
            error: function (xhr, status, error) {
                console.error('Nem sikerült törölni az adatot az adatbázisból.', error);
            }
        });
    }

});



