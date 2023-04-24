


// Implementation of the plus click functionality
modal = document.getElementById("new-inventory-modal");
jQuery(document).ready(function () {
    $("#create-new-inventory").click(function () {
        jQuery("#new-inventory-modal").css("display", "block");
   });
});





function onConfirmIconClick(e) {
    Swal.fire({
        title: 'Ali ste sigurni da želite podriti poziciju?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Da',
        denyButtonText: 'Ne',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            jQuery.ajax({
                type: "POST",
                url: `ConfirmInventory?id=${e.row.rowIndex}`,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    window.location.reload();
                },
                failure: function (response) {

                },
                error: function (response) {
                }
            });
        } else if (result.isDenied) {

        }
    })

    
}


function onDeleteIconClick(e) {

    Swal.fire({
        title: 'Ali ste sigurni da želite pobrisati poziciju?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Da',
        denyButtonText: 'Ne',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            jQuery.ajax({
                type: "POST",
                url: `DeleteInventoryPosition?id=${e.row.rowIndex}`,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    window.location.reload();
                },
                failure: function (response) {

                },
                error: function (response) {
                }
            });
        } else if (result.isDenied) {
            
        }
    })




   
  
}


jQuery(".close-create").click(function () {
    jQuery("#new-inventory-modal").toggle();

});



jQuery("#create-inventory-button").click(function () {
    var name = document.getElementById("nameInventory")
    var date = document.getElementById("dateInventory")
    if (name.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Napaka...',
            text: 'Podatki manjkajo!',
        })

        return;
    }

    if (date.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Napaka...',
            text: 'Podatki manjkajo!',
        })

        return;
    }

    var correctLeader = jQuery("#users").val()
    jQuery.ajax({
        type: "POST",
        url: `CreateInventory?name=${name.value}&&date=${date.value}&&leader=${correctLeader}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            window.location.reload();
        },
        failure: function (response) {

        },
            error: function (response) {
        }
    });
})









activeChoice = "";


$(document).ready(function () {
    // MAIN ON READY EVENT

    jQuery(".remove-icon").click(function () {
        id = jQuery(this).parent().parent().attr("data-unique");
        // Ask whether or not the user is sure about deleting the item
        Swal.fire({
            title: 'Ali ste sigurni da želite pobrisati inventuru?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Da',
            denyButtonText: 'Ne',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                jQuery.ajax({
                    type: "POST",
                    url: `DeleteInventory?qid=${id}`,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        window.location.reload();
                    },
                    failure: function (response) {
                    },
                    error: function (response) {
                    }
                });
            } else if (result.isDenied) {
               // Inventura ni pobrisana 
            }
        })





    })




    jQuery(".choice-div").click(function () {
        activeChoice = jQuery(this).attr("data-choice");
        jQuery(".choice-div").css('background-color', 'transparent');
        jQuery(this).css('background-color', '#3DA5FF');
    });
});


// Button processing
function processButtonClick() {
    var type = ""

    if (activeChoice == 1) {
        type = "d"
    }

    var configObject = jQuery("#btnExport").attr("data-config");
    jQuery.ajax({
        type: "POST",
        url: `DownloadInventory?type=${activeChoice}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: configObject,
        success: function (response) {
            // This is the 
            var a = document.createElement('a');
            a.href = response.url;
            a.download = response.name;
            a.click();
            window.URL.revokeObjectURL(url);
            var el = jQuery(".close");
            el[0].click()
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
}


function exportPDF(selectedInventory) {
    jQuery.ajax({
        type: "POST",
        url: "ExportInventory?type=pdf",
        data: { },
        success: function (response) {
            console.log(response)
           // window.location.href = "DownloadFile?data = " + JSON.stringify(response);       
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
}


function exportExcel(selectedInventory) {
    jQuery.ajax({
        type: "POST",
        url: "ExportInventory?type=excel",
        data: { },
        success: function (response) {
            if (response) {
            }
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
}


function exportNotepad(selectedInventory) {
    jQuery.ajax({
        type: "POST",
        url: "ExportInventory?type=notepad",
        data: {  },
        success: function (response) {
            if (response) {
            }
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
}


selectedInventory = 0;

function selectInventory(which) {
    var row = jQuery("#inventory_1");
    row.css('background', 'rgba(138, 193, 254, 5')
    selectedInventory = which;
    // Change this to be dinamic
}


var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
$("#export-inventory").click(function () {
    if (selectedInventory == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka...',
            text: 'Morate izbrati dokument inventure!',
        })
        return;
    } else {
        modal.style.display = "block";
    }
});
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var currentChosen = -1;
var currentChosenOther = -1;
var currentChosenRow = -1;
var currentChosenFirst = -1;


function deleteUser(which) {
    var row = document.getElementById(`user_${which}`)
    var email = row.children[0].innerHTML;
    Swal.fire({
        title: 'Ali ste sigurni da želite pobrisati uporabnika?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Da',
        denyButtonText: 'Ne',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            jQuery.ajax({
                type: "POST",
                url: "DeleteUserByEmail",
                data: { "email": email },
                success: function (response) {
                    if (response) {
                        Swal.fire({
                            icon: 'success',
                            title: `Uporabnik pobrisan`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                },
                failure: function (response) {
                },
                error: function (response) {
                }
            });
        } else if (result.isDenied) {
        }
    })
}

function changePassword() {
    var password = jQuery("#password").val()
    var repassword = jQuery("#repassword").val()
    if (password != repassword) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka...',
            text: 'Gesla se ne ujemata!',
        })
    } else {

        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        const value = parameters.get('uid');
        jQuery.ajax({
            type: "POST",
            url: "ChangeUserPassword",
            data: { "uid": value, "password": password },
            success: function (response) {

                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: `Geslo spremenjeno`,
                        showConfirmButton: false,
                        timer: 2500
                    });

                    setTimeout(function () {
                        location.href = "/auth/login"
                    }, 3500);

                }
            },
            failure: function (response) {
            },
            error: function (response) {
            }
        });
    }

}




function registerUser() {
    var email = jQuery("#email").val()
    var password = jQuery("#password").val()
    var repassword = jQuery("#repassword").val()

    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const company = parameters.get('company');

    if (email === null || email.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: `Email naslov ne sme biti prazen`,
            showConfirmButton: false,
            timer: 2500
        });
    }

    if (password === null || password.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: `Geslo ne more biti prazno`,
            showConfirmButton: false,
            timer: 2500
        });
    }


    if (password != repassword) {
        Swal.fire({
            icon: 'error',
            title: `Gesla se ne ujemata`,
            showConfirmButton: false,
            timer: 2500
        });
    }

    if (email !== null && email.trim() !== "" && password !== null && password.trim() !== "" && password == repassword) {

        jQuery.ajax({
            type: "POST",
            url: "RegisterUserWithData",
            data: { "email": email, "password": password, "company": company },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: `Uspešno aktiviran račun.`,
                    showConfirmButton: false,
                    timer: 2500
                });

                setTimeout(function () {
                    location.href = "/auth/login"
                }, 3500);


            },
            failure: function (response) {
            },
            error: function (response) {
            }
        });







        // Upon succesfull registration notify
        Swal.fire({
            icon: 'success',
            title: `Registracija izvedena`,
            showConfirmButton: false,
            timer: 2500
        });
    }




}




function inviteAdmin() {
    var email = jQuery("#admin").val();
    var company = jQuery("#company").val();

    jQuery.ajax({
        type: "POST",
        url: "SendInvitationAdmin",
        data: { "email": email, "company": company },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: `Povabilo poslano na ${email}`,
                showConfirmButton: false,
                timer: 2500
            });

            setTimeout(function () {
                location.href = "/auth/login"
            }, 3500);

           
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
    
}




function updateUserPassword() {

    var email = jQuery("#email").val()
    var password = jQuery("#password").val()
    var repassword = jQuery("#repassword").val()

    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const company = parameters.get('company');

    if (email === null || email.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: `Email naslov ne sme biti prazen`,
            showConfirmButton: false,
            timer: 2500
        });


        return;
    }

    if (password === null || password.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: `Geslo ne more biti prazno`,
            showConfirmButton: false,
            timer: 2500
        });



        return;
    }


    if (password != repassword) {
        Swal.fire({
            icon: 'error',
            title: `Gesla se ne ujemata`,
            showConfirmButton: false,
            timer: 2500
        });



        return;
    }

    if (email !== null && email.trim() !== "" && password !== null && password.trim() !== "" && password == repassword) {


        jQuery.ajax({
            type: "POST",
            url: "UpdatePassword",
            data: { "email": email, "password": password },
            success: function (response) {
                setTimeout(function () {
                    location.href = "/auth/login"
                }, 3500);
            },
            failure: function (response) {
            },
            error: function (response) {
            }
        });

    }



}

function inviteUser() {
    var email = jQuery("#user").val();

    jQuery.ajax({
        type: "POST",
        url: "SendInvitationUser",
        data: { "email": email },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: `Povabilo poslano na ${email}`,
                showConfirmButton: false,
                timer: 2500
            });

            setTimeout(function () {
                location.href = "/auth/login"
            }, 3500);


        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });


    
}



function requestReset() {

    var email = jQuery("#username").val();

    jQuery.ajax({
        type: "POST",
        url: "RequestReset",
        data: { "username": email },
        success: function (response) {
            var guid = response.guid;
            var email = response.email;
            var error = response.error;

            if (error != "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Napaka...',
                    text: 'Email ni registriran!',
                })
            } else {

                Swal.fire({
                    icon: 'success',
                    title: `Povezava je poslana na ${email}`,
                    showConfirmButton: false,
                    timer: 2500
                })

                setTimeout(function () {
                    location.href = "/auth/login"
                }, 3500);



            }
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
}


function changeColor(id) {

    if (currentChosen != -1) {
        jQuery(`#${currentChosen}`).css("background-color", "unset");
    }

    jQuery(`#${id}`).css("background-color", "#f0f8ff");
    currentChosen = id;
}


function changeColorOther(id) {

    if (currentChosenOther != -1) {
        jQuery(`#${currentChosenOther}-connect`).css("background-color", "unset");
    }

    jQuery(`#${id}-connect`).css("background-color", "#f0f8ff");
    currentChosenOther = id;
}

function colorRow(id) {
    if (currentChosenRow != -1) {
        jQuery(`#row-${currentChosenRow}`).css("background-color", "unset");
    }

    jQuery(`#row-${id}`).css("background-color", "#f0f8ff");


    if (currentChosenRow != id) {
        currentChosenRow = id;
        connectElements()
        return;
    }



}
jQuery(document).ready(function () {
    jQuery("#login-button").click(function () {
    })
});


function toggleTheme() {
    var toggler = jQuery("#toggler");
    if (toggler.is(':checked')) {
        // White mode
    } else {
        // Dark mode
    }

}


function sync(type) {
    isComplete = false;

    if (type == "vse") {
        isComplete = true;
    }


    var array_startObjects = [];
    var array_endObjects = [];
    if (window.start.length != window.end.length) {
        return;
    }
    for (var i = 0; i < window.start.length; i++) {
        array_startObjects.push(getValuesAtRowNames("names", window.start[i]));
    }
    for (var j = 0; j < window.end.length; j++) {
        array_endObjects.push(getValuesAtRowArrow("arrow", window.end[j]));
    }
    var data = JSON.stringify({
        startObjects: array_startObjects,
        endObjects: array_endObjects
    });

   var c = !!document.getElementById("cbCheckbox").checked
    $.ajax({
        type: 'POST',
        url: `Connection?headers=${c}&complete=${isComplete}`,
        data: data,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (view) {
            var message = view.message;
            Swal.fire({
                title: 'Ali želite shraniti predlogo?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Da',
                denyButtonText: 'Ne',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Vpišite ime predloge',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Potrditev',
                        showLoaderOnConfirm: true,               
                    }).then((result) => {
                        if (result.value != "") {
                            if (result.isConfirmed) {

                                // Get the value of the checkbox
                                var checked = document.getElementById("cbCheckbox").value

                                $.ajax({
                                    type: 'POST',
                                    url: `saveConfig?header=${!!checked}&name=${result.value}`,
                                    data: data,
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (test) {
                                        Swal.fire({
                                            title: `Predloga ${result.value} shranjena`,
                                        })
                                    },
                                    error: function () {
                                    }
                                });                               
                            }
                        } else {                           
                        } 
                    })
                } else if (result.isDenied) {
                    Swal.fire('Predloga ni shranjena', '', 'info')
                }
            })
            jQuery(".loader").css("visibility", "hidden");

        },
        failure: function (response) {
        }
    });


    
}


function askAboutHeaders() {

            Swal.fire({
                title: 'Ali datoteka vsebuje naslove?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Da',
                denyButtonText: 'Ne',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    header = true;
                    document.getElementById("header").value = "true"
                    document.getElementById("cbCheckbox").checked = true;
                    var form = document.getElementById("mainForm")
                    form.submit()
                    // Form submit            
                } else if (result.isDenied) {
                    header = false;
                    document.getElementById("header").value = "false"
                    document.getElementById("cbCheckbox").checked = false;

                    var form = document.getElementById("mainForm")
                    form.submit()
                    // Form submit 
                }
            })
                 

}


var header = false;


function getValuesAtRowNames(table_id, row) {
    var rowSingle = document.getElementById(table_id).rows[row];
    var table = rowSingle.cells[0].innerHTML;
    var field = rowSingle.cells[1].innerHTML;
    var name = rowSingle.cells[2].innerHTML;
    var name_internal = rowSingle.cells[3].innerHTML;
    var description = rowSingle.cells[4].innerHTML;

    var rowValues = {
        table: table,
        field: field,
        name: name,
        name_internal: name_internal,
        description: description,

    }
    return rowValues;

}
function getValuesAtRowArrow(table_id, row) {
    var rowSingle = document.getElementById(table_id).rows[row+1];

    var name = rowSingle.cells[0].innerHTML;



    var rowValues = {
        name: name,
    }


    return rowValues;

}

function chooseFirst(id) {

    if (currentChosenFirst != -1) {
        jQuery(`#row-first-${currentChosenFirst}`).css("background-color", "unset");
    }

    jQuery(`#row-first-${id}`).css("background-color", "#f0f8ff");


    if (currentChosenFirst != id) {
        currentChosenFirst = id;   
        connectElements()
        return;
    }

    
}

function hasDuplicates(item_start, item_end) {
    // create a set to store unique values
    var duplicates = false;
    // loop through the array
    for (let i = 0; i < window.start.length; i++) {
        if (window.start[i] == item_start) {
            duplicates = true;
       }
    }
   // for (let i = 0; i < window.end.length; i++) {
     //   if (window.end[i] == item_end) {
       //     duplicates = true;
        //}
    //}
    // if the loop completes and there are no duplicates, return false
    return duplicates;
}

function removeAllConnections() {

    for (var i = 0; i < window.lines.length; i++) {
        var line = window.lines[i];
        line.remove();
    }

    window.lines = []
    window.start = []
    window.end = []
    window.visible = []
}

$(document).ready(function () {
    var element = document.getElementById("namesScroll");
    $("#namesScroll").scroll(function () {
        for (var i = 0; i < window.lines.length; i++) {
                var line = window.lines[i];
                var elm = document.getElementById(window.visible[i]);
                var container = document.getElementById("namesScroll");
                if (isVisible(elm, container)) {
                    line.show();
                    line.position();
                } else {
                line.hide();
           }
        }
    });
});







const isVisible = function (ele, container) {
    const eleTop = ele.offsetTop;
    const eleBottom = eleTop + ele.clientHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    // The element is fully visible in the container
    return (
        (eleTop >= containerTop && eleBottom <= containerBottom) ||
        // Some part of the element is visible in the container
        (eleTop < containerTop && containerTop < eleBottom) ||
        (eleTop < containerBottom && containerBottom < eleBottom)
    );
};



function chooseConfig(name, company) {


    $.ajax({
        type: 'POST',
        url: `getConfig?name=${name}`,
        data: "",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (test) {
            var obj = JSON.parse(test);
            resolveImport(obj);
        },
        error: function () {
        }
    });
}



function chooseConfigHome(name, company) {


    $.ajax({
        type: 'POST',
        url: `getConfig?name=${name}`,
        data: "",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (test) {

            var obj = JSON.parse(test);
            resolveImportHome(obj, name);
        },
        error: function () {
        }
    });
}


function resolveImportHome(obj, name) {
    var btn = document.getElementById("dropdownMenuButton");
    btn.innerHTML = name;
    btnExport = document.getElementById("btnExport");
    jQuery(btnExport).attr("data-config", JSON.stringify(obj));
}




function resolveImport(obj) {


    if (obj.hasHeaders) {
        document.getElementById("cbCheckbox").checked = true;
    }



    for (var i = 0; i < obj.baseData.length; i++) {
        var current = obj.baseData[i];
        window.current = current;
        var end = current.Value.name.replace("Stolpec", "").trim()
        var table = document.getElementById("names");
        var start = findElement(table, current.Key.field);
        connectElementsManualy(start, end);
    }
}




function findElement(table, key) {
    for (var i = 0, row; row = table.rows[i]; i++) {
        try {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (col.innerHTML == current.Key.field) {
                    return i;
                }
            }
        } catch (err) {
            continue;
        }
    }
    return -1;
}



function removeLastConnection() {
    var len = window.lines.length;
    var last = window.lines[len - 1];
    last.remove();
    window.lines.pop();
    window.start.pop();
    window.end.pop();
    window.visible.pop();
}






function connectElementsManualy(start, end) {

    // This is the method for manualy inputing the arrow by having a saved configurations.

    var startElement = document.getElementById(`row-first-${start}`),
        endElement = document.getElementById(`row-${end}`);
    window.start.push(start);
    window.end.push(end);

    // He
    var line = new LeaderLine(endElement, startElement, {color: 'blue', size: 2, startSocket: 'right', endSocket: 'left' });
    window.visible.push(`row-first-${start}`)
    window.lines.push(line);
    
}






































function connectElements() {
    if (currentChosenRow != -1 && currentChosenFirst != -1 && typeof currentChosenRow !== "undefined" && typeof currentChosenFirst !== "undefined") {

        if (typeof window.lines === "undefined") {
            window.lines = []
        }
        if (hasDuplicates(currentChosenFirst, currentChosenRow)) {
            cleanSelection(currentChosenFirst, currentChosenRow);

            return;
        }

        var startElement = document.getElementById(`row-first-${currentChosenFirst}`),
            endElement = document.getElementById(`row-${currentChosenRow}`);

        window.start.push(currentChosenFirst);
        window.end.push(currentChosenRow);

        var line = new LeaderLine(endElement, startElement, { color: 'blue', size: 2, startSocket: 'right', endSocket: 'left' });



        window.visible.push(`row-first-${currentChosenFirst}`)




        cleanSelection(currentChosenFirst, currentChosenRow);
        window.lines.push(line);
    }
}



function cleanSelection(start, end) {
    jQuery(`row-first-${start}`).css("background-color", "unset");
    jQuery(`row-${end}`).css("background-color", "unset");

    currentChosenRow = -1;
    currentChosenFirst = -1;

}