$('#deleteSection').hide()
$('#updateSection').hide()


const toast = document.querySelector('#alertToast')
var alertToast = bootstrap.Toast.getOrCreateInstance(toast)
var toastText = document.querySelector(".toast-body")


var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
if (month < 10) {
    month = "0" + month;
}
var day = today.getDate();
if (day < 10) {
    day = "0" + day;
}
var createDate = year + "-" + month + "-" + day;



//selectedItem
let lastClickedCard = null;

function removeCardBorder() {
    if (lastClickedCard) {
        lastClickedCard.removeClass("custom-border last-clicked");
        lastClickedCard = null;
    }
}

function addCardBorder(card) {
    removeCardBorder();
    card.addClass("custom-border last-clicked");
    lastClickedCard = card;
    console.log("Kiválasztott tétel: " + lastClickedCard.attr("id"));
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
        $('#deleteSection').fadeOut()
        $('#updateSection').fadeOut()
    } else {
        addCardBorder(card);
        $.ajax({
            type: "POST",
            url: "checkitem.php",
            data: {
                selectedItem: lastClickedCard.attr("id"),
                userto: userto,
            },
            success: function (result) {
                if (result === "success") {
                    $('#deleteSection').fadeIn()
                    $('#updateSection').fadeIn()
                } else {
                    $('#deleteSection').fadeOut()
                    $('#updateSection').fadeOut()
                }
            }
        });
    }
});



//////////////////////////////////////////////////////////////////////////////////


$(document).ready(function () {
    auth()
    getInvite()
})



//////////////////////////////////////////////////////////////////////////////////

//auth
function auth() {
    setTimeout(function () {
        $.ajax({
            type: "GET",
            url: "auth.php",
            dataType: "json",
            cache: false,
            success: function (data) {
                // Sikeres válasz esetén kezeljük a visszatérő adatot
                if (data === "failed") {
                    // A felhasználó nincs bejelentkezve, megjelenítjük az üzenetet
                    console.log("A felhasználó nincs bejelentkezve!")
                    $.removeCookie("selectedUser")
                    window.location.href = "login.html";



                } else {
                    var selectedUser = $.cookie('selectedUser')
                    // A felhasználó be van jelentkezve, megjelenítjük a tartalmat
                    console.log("A felhasználó be van jelentkezve!")

                    for (var i = 0; i < data.length; i++) {
                        var username = data[i].username;
                        var id = data[i].id;


                        un = username
                        userto = selectedUser

                        setTitle(userto, un)

                        $("#username").text(username)
                        $("#id").text(id)


                        console.log(un + "/////" + userto)

                        const mylist = document.querySelector('#mylist')

                        const myListCard = document.createElement('div')
                        myListCard.className = "row bg-light mx-3 mb-3 rounded-4 align-items-center invite-card"
                        myListCard.id = un

                        const myListCardCol1 = document.createElement('div')
                        myListCardCol1.className = "col p-0 "

                        const myListCardCol1P = document.createElement('p')
                        myListCardCol1P.className = "TiltWrap text-dark m-3 "
                        myListCardCol1P.innerHTML = un

                        const myListCardCol2 = document.createElement('div')
                        myListCardCol2.className = "col-2 text-end "

                        const myListCardCol2Div = document.createElement('div')
                        myListCardCol2Div.className = "me-2 "

                        mylist.insertAdjacentElement("afterend", myListCard)
                        myListCard.appendChild(myListCardCol1)
                        myListCard.appendChild(myListCardCol2)
                        myListCardCol1.appendChild(myListCardCol1P)
                        myListCardCol2.appendChild(myListCardCol2Div)


                        console.log(selectedUser)
                    }



                    loadItem(selectedUser)

                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    }, 100)


}

//Cookie érték figyelése
function watchCookie(cookieName, callback) {
    var lastCookie = document.cookie;
    setInterval(function () {
        var cookieValue = document.cookie;
        if (cookieValue !== lastCookie) {
            lastCookie = cookieValue;
            if (cookieValue.indexOf(cookieName) !== -1) {
                callback();
            }
        }
    }, 100);
}

//Műveletek a cookie módosítása esetén
function handleCookieChange() {
    if ($.cookie("PHPSESSID") !== lastSessionID) {
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
        // Itt lehet további műveleteket végezni a cookie módosítása esetén
    }
}

// Watch the cookie named "PHPSESSID" and "selectedUser" for changes
var lastSessionID = $.cookie("PHPSESSID");
watchCookie("PHPSESSID", handleCookieChange);
watchCookie("selectedUser", function () {
    console.log("selectedUser cookie changed");
});


//////////////////////////////////////////////////////////////////////////////////


//loadItem
function loadItem(username) {
    var userlist = userto
    $.ajax({
        url: "getitem.php",
        data: {
            username: username,
            userto: userto,
        },
        type: "POST",
        dataType: "json",


        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var name = data[i].name;
                    var status = data[i].status;
                    var user = data[i].user;
                    var createDate = data[i].createDate;
                    var id = data[i].id;
                    var userto = data[i].userto;
                    var itemid = data[i].itemid;
                    var linkUrl = data[i].link;

                    //Kiírás
                    console.log(name + ", " + status + ", " + linkUrl + ", " + user + ", " + userto + ", " + createDate + ", " + id + "," + itemid)

                    const newCardDiv = document.createElement("div")
                    newCardDiv.className = "row ms-4 mb-4 rounded-start-4 align-items-center item-card ";
                    newCardDiv.id = itemid

                    const newItemNameDiv = document.createElement("div")
                    newItemNameDiv.className = "col p-3 "

                    const newItemName = document.createElement("h5")
                    newItemName.className = "TiltWrap m-0 user-select-all "
                    newItemName.innerHTML = name

                    const newItemStatusDiv = document.createElement("div")
                    newItemStatusDiv.className = "col-2 text-end me-5 p-0 gap-3 "


                    const newItemStatus = document.createElement("img")
                    newItemStatus.className = "icon_status mx-2 p-0 "

                    if (status == 1) {
                        newItemStatus.src = "surce/1.svg"
                    }
                    if (status == 2) {
                        newItemStatus.src = "surce/2.svg"
                    }
                    if (status == 3) {
                        newItemStatus.src = "surce/3.svg"
                    }
                    if (status == 4) {
                        newItemStatus.src = ""
                    }


                    if (user == userto) {
                        newCardDiv.className += "bg-white"
                    } else {
                        newCardDiv.className += "other-card"
                    }


                    //Link
                    const linkA = document.createElement("a")
                    linkA.className = "mx-1 p-0"
                    
                    const linkImg = document.createElement("img")
                    linkImg.className = "m-0 p-0"



                    if (linkUrl != "") {
                        linkA.target = "_blank"
                        linkA.href = linkUrl
                        linkImg.src = "surce/Link.svg"
                        linkA.appendChild(linkImg)
                        newItemStatusDiv.appendChild(linkA)
                    }

                    


                    listItems.appendChild(newCardDiv)
                    newCardDiv.appendChild(newItemNameDiv)
                    newItemNameDiv.appendChild(newItemName)
                    newCardDiv.appendChild(newItemStatusDiv)
                    newItemStatusDiv.appendChild(newItemStatus)
                    

                }
            } else {
                toastText.innerHTML = userlist + ' list is currently empty!';
                alertToast.show()
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }

    });
}

//////////////////////////////////////////////////////////////////////////////////

//logout
$(document).ready(function () {
    $("#logoutBtn").click(function () {
        // AJAX hívás küldése a szervernek
        $.ajax({
            type: "POST",
            url: "logout.php",
            success: function (data) {
                // Sikeres válasz esetén átirányítjuk a felhasználót a bejelentkezési oldalra
                $.removeCookie("selectedUser")
                window.location.replace("login.html"); //replace metódus használata
                history.pushState(null, null, location.href); //törlés az előző oldalakból
                window.onpopstate = function () {
                    history.go(1);
                };
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    })
});

//////////////////////////////////////////////////////////////////////////////////
$("#addItemIcon").click(function () {
    $("#addItemModal").modal('show')
    enterItemStatus.value = 4
})


//addItem
$(document).ready(function () {
    $("#addItemBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "additem.php",
            data: { name: enterItemName.value, status: enterItemStatus.value, link: enterLinkUrl.value, createDate: createDate, userto: userto },
            success: function (response) {
                if (response == "success") {
                    $("#listItems").empty();
                    loadItem(un)
                    toastText.innerHTML = enterItemName.value + " item has been added to the list!";
                    alertToast.show()
                    enterItemName.value = ""
                    enterItemStatus.value = 4
                    enterLinkUrl.value = ""
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
    })
})

//addItem
$(document).ready(function () {
    $("#addItemCloseBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "additem.php",
            data: { name: enterItemName.value, status: enterItemStatus.value, link: enterLinkUrl.value, createDate: createDate, userto: userto },
            success: function (response) {
                if (response == "success") {
                    $("#listItems").empty();
                    loadItem(un)
                    toastText.innerHTML = enterItemName.value + " item has been added to the list!";
                    alertToast.show()
                    enterItemName.value = ""
                    enterItemStatus.value = 4
                    enterLinkUrl.value = ""
                    $("#addItemModal").modal('hide')
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
        
    })
})


//////////////////////////////////////////////////////////////////////////////////
$("#updateItemIcon").click(function () {
    if (lastClickedCard != null) {
        $.ajax({
            type: "POST",
            url: "updatecheckitem.php",
            data: {
                selectedItem: lastClickedCard.attr("id"),
                userto: userto,
            },
            success: function (result) {
                if (result === "success") {
                    // Az adatok elküldése a get_item_name.php oldalnak
                    $.ajax({
                        type: "POST",
                        url: "get_item_name.php",
                        data: {
                            selectedItem: lastClickedCard.attr("id"),
                            userto: userto,
                        },
                        success: function (result) {
                            var parts = result.split("|");
                            var itemName = parts[0];
                            var itemStatus = parts[1];
                            var link = parts[2]

                            $("#updateItemModal").modal('show');
                            // Az elem nevének beállítása az enterEditItemName mezőbe
                            enterEditItemName.value = itemName;
                            enterNewItemStatus.value = itemStatus;
                            enterEditLinkUrl.value = link
                        }
                    });
                } else {
                    toastText.innerHTML = result;
                    alertToast.show()
                }
            }
        });
    } else {
        toastText.innerHTML = "Please choose an item from the list!";
        alertToast.show()
    }
});



// updateItem
$(document).ready(function () {
    $("#updateItemBtn").click(function () {

        if (enterEditItemName.value.trim() === '') {
            toastText.innerHTML = 'The element name cannot be empty!';
            alertToast.show();
            return;
        }

        $.ajax({
            type: "POST",
            url: "updateitem.php",
            data: {
                name: enterEditItemName.value,
                status: enterNewItemStatus.value,
                link: enterEditLinkUrl.value,
                createDate: createDate,
                selectedItem: lastClickedCard.attr("id"),
                userto: userto,
            },
            success: function (result) {
                if (result) {
                    // Az adatbázisból visszakapott name érték beállítása
                    var itemName = result;

                    // Sikeres esetben frissítjük az oldalt
                    $("#listItems").empty();
                    loadItem(userto);

                    // A toast üzenet létrehozása
                    var message = itemName + " item has been modified.";
                    toastText.innerHTML = message;
                    alertToast.show();
                    lastClickedCard = null;
                    $("#updateItemModal").modal('hide');
                    $('#deleteSection').fadeOut()
                    $('#updateSection').fadeOut()
                } else {
                    // Hiba esetén kiírjuk a hibaüzenetet
                    toastText.innerHTML = result.error;
                    alertToast.show();
                }
            }
        });
    });
});







//deleteItem
$("#deleteItemBtn").click(function () {
    if (!lastClickedCard) {
        toastText.innerHTML = "Please choose an item from the list!";
        alertToast.show();
        return;
    }

    $.ajax({
        type: "POST",
        url: "deletecheckitem.php",
        data: {
            selectedItem: lastClickedCard.attr("id"),
            userto: userto,
        },
        success: function (result) {
            var data = JSON.parse(result);
            var status = data.status;
            var itemName = data.itemName;
            var message = data.message
            if (status == "success") {
                $('#selectedItem').text("Would you like to permanently delete the " + "'" + itemName + "'" + " item from your list?")
                $('#removeItemModal').modal('show')
            } else {
                toastText.innerHTML = message;
                alertToast.show();
            }
        },
        error: function (xhr, status, error) {
            toastText.innerHTML = "Hiba történt az elem ellenőrzésekor.";
            alertToast.show();
        }
    });
});

$("#removeItemYes").click(function () {
    $.ajax({
        type: "POST",
        url: "deleteitem.php",
        data: {
            selectedItem: lastClickedCard.attr("id"),
            userto: userto,
        },
        success: function (result) {
            if (result === "success") {
                $("#removeItemModal").modal('hide');
                lastClickedCard.remove();
            } else {
                toastText.innerHTML = result;
                alertToast.show();
            }
        },
        error: function (xhr, status, error) {
            console.error('Nem sikerült törölni az adatot az adatbázisból.', error);
        },
        complete: function () {
            $("#removeItemModal").modal("hide");
            $('#deleteSection').fadeOut()
            $('#updateSection').fadeOut()
        }
    });
});

$("#removeItemNo").click(function () {
    $("#removeItemModal").modal("hide");
});





//deleteItemModal



//invite

$('#inviteModalBtn').on('click', function () {
    $('#inviteModal').modal('show')
})

$('#inviteBtn').on('click', function () {

    const invitedUser = document.querySelector('#invitedUser')

    $.ajax({
        type: "POST",
        url: "invite.php",
        data: {
            invitedUser: invitedUser.value,
            createDate: createDate,
        },
        success: function (response) {
            if (response == "success") {
                toastText.innerHTML = response
                alertToast.show()
            } else {
                toastText.innerHTML = response
                alertToast.show()
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    })
})

//viewList

let lastClickedInviteCard = null;

function addCardBorderi(card) {
    if (lastClickedInviteCard) {
        lastClickedInviteCard.removeClass("custom-borderi last-clickedi");
    }
    card.addClass("custom-borderi last-clickedi");
    lastClickedInviteCard = card;
    console.log("Kiválasztott tétel: " + lastClickedInviteCard.attr("id"));
}



function setTitle(currentUserId, un) {
    if (currentUserId === un) {
        document.title = `${currentUserId} | GIFTLIST`;
        $("#displayTitle").text(`${currentUserId}'s list`);
    } else {
        document.title = `to ${currentUserId} | GIFTLIST`;
        $("#displayTitle").text(`to ${currentUserId}'s list`);
    }
}

$(document).ready(function () {
    $(document).on('click', '.invite-card', function (event) {
        const card = $(event.target).closest('.invite-card');
        if (!card.length) {
            return;
        }


        const currentUserId = card.attr("id");


        addCardBorderi(card);
        $("#listItems").empty();
        userto = currentUserId;
        $.cookie("selectedUser", userto);
        console.log(un + "//////" + userto);


        setTitle(currentUserId, un)

        $('#deleteSection').fadeOut()
        $('#updateSection').fadeOut()

        loadItem(currentUserId)

        $('#offcanvasMenu').offcanvas('hide');
    });
});










//getinvite

function getInvite() {
    $.ajax({
        url: "getinvite.php",
        type: "POST",
        dataType: "json",


        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var invitationUser = data[i].invitationUser;
                    var invitedUser = data[i].invitedUser
                    var createDate = data[i].createDate;

                    const inviteList = document.querySelector('#inviteList')

                    const inviteCard = document.createElement('div')
                    inviteCard.className = "row bg-light mx-3 mb-4 rounded-4 align-items-center invite-card ";
                    inviteCard.id = invitationUser

                    const inviteCardCol1 = document.createElement('div')
                    inviteCardCol1.className = "col p-0 "

                    const inviteCardCol1P = document.createElement('p')
                    inviteCardCol1P.className = "TiltWrap text-dark m-3 "
                    inviteCardCol1P.innerHTML = invitationUser

                    const inviteCardCol2 = document.createElement('div')
                    inviteCardCol2.className = "col-2 text-end "

                    const inviteCardCol2Div = document.createElement('div')
                    inviteCardCol2Div.className = "me-2 "


                    inviteList.appendChild(inviteCard)
                    inviteCard.appendChild(inviteCardCol1)
                    inviteCardCol1.appendChild(inviteCardCol1P)
                    inviteCard.appendChild(inviteCardCol2)
                    inviteCardCol2.appendChild(inviteCardCol2Div)

                }
            } else {
                //toastText.innerHTML = "Probléma van az invite-tal!!";
                //alertToast.show()
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }

    });
}



$('#logoBtn').on('click', function () {
    $('#offcanvasMenu').offcanvas('show');
});





