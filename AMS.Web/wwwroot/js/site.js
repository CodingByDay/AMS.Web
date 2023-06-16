
jQuery(".navbar-toggler").on("click", function () {
    jQuery("nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark.shadow-transition").toggleClass("mobile")
});

function isMobileDevice() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};




// Implementation of the plus click functionality
modal = document.getElementById("new-inventory-modal");
jQuery(document).ready(function () {
    $("#create-new-inventory").click(function () {
        jQuery("#new-inventory-modal").css("display", "block");
   });
});

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function askForDeletion(index) {
  //  alert("The chosen line has the right side index of " + index);
}

function setCellValueItemName(newData, value, currentRowData) {
    jQuery.ajax({
        type: "POST",
        url: `UpdateRow?table=tItem&&field=acName&&type=string&&data=${value}&&anQId=${currentRowData.anQId}`,
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
}



function setCellValueItemQty(newData, value, currentRowData) {
    jQuery.ajax({
        type: "POST",
        url: `UpdateRow?table=tItem&&field=anQty&&type=int&&data=${value}&&anQId=${currentRowData.anQId}`,
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
}






function setCellValueLocationName(newData, value, currentRowData) {
    jQuery.ajax({
        type: "POST",
        url: `UpdateRow?table=tLocation&&field=acName&&type=string&&data=${value}&&anQId=${currentRowData.anQId}`,
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
}


function onDeleteIconClickInventoryAsset(e) {
    Swal.fire({
        title: 'Ali ste sigurni da želite pobrisati sredstvo?',
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
                url: `DeleteInventoryAsset?id=${e.row.rowIndex}`,
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


function onDeleteIconClickInventory(newData, value, currentRowData) {
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
}


function onConfirmIconClick(e) {
    Swal.fire({
        title: 'Ali ste sigurni da želite potrditi pozicijo?',
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






function onConfirmIconClickInventory(e) {

    if (e.row.data.closed != "") {
        Swal.fire({
            icon: 'error',
            title: 'Napaka...',
            text: 'Inventura že zaključena!',
        })
    } else {

        jQuery.ajax({
            type: "POST",
            url: `CheckDiscrepancies?id=${e.row.rowIndex}`,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {

                if (response) {
                    Swal.fire({
                        title: 'Neskladje',
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'Popravi',
                        customClass: {
                            actions: 'my-actions',
                            cancelButton: 'order-1 right-gap',
                            confirmButton: 'order-2',
                            denyButton: 'order-3',
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/Home/Discrepancies"                    
                        } 
                    })   
                } else {
                    Swal.fire({
                        title: 'Ali ste sigurni da želite potrditi inventuro?',
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
                                url: `ConfirmInventoryWhole?id=${e.row.rowIndex}`,
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

            },
            failure: function (response) {
            },
            error: function (response) {
            }
        });
    }
}


function onDeleteIconClickInventoryItem(e) {
    Swal.fire({
        title: 'Ali ste sigurni da želite pobrisati inventuro?',
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
                url: `DeleteInventoryItem?id=${e.row.rowIndex}`,
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







function onDeleteIconClickInventory(e) {
    Swal.fire({
        title: 'Ali ste sigurni da želite pobrisati inventuro?',
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
                url: `DeleteInventory?id=${e.row.rowIndex}`,
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




function onDeleteIconClickInventoryLocation(e) {
    Swal.fire({
        title: 'Ali ste sigurni da želite pobrisati lokacijo?',
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
                url: `DeleteInventoryLocation?id=${e.row.rowIndex}`,
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
        title: 'Ali ste sigurni da želite pobrisati pozicijo?',
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
            if (response) {
                window.location.reload();
            } else {
                Swal.fire({
                    title: 'Morate zapreti druge inventure',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result['isConfirmed']) {
                        window.location.reload();
                    }
                })
            }          
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
    var currentUrl = window.location.href;
    if (currentUrl.includes("login") || currentUrl.includes("resetpassword")) {
        if (isMobileDevice()) {
            Swal.fire({
                title: 'Obvestilo',
                text: 'Uporaba na mobilnih napravah trenutno ni podprta',
                icon: 'error',
                timer: 3000,
                buttons: false,
            })
                .then(() => {
                    location.href = "/"
                })
        }
    }




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

    var configObject = jQuery("#selectedItemKeys").text();
    


    jQuery.ajax({
        type: "POST",
        url: `DownloadInventory?type=${activeChoice}&ids=${configObject}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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
 
        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
});







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


function deleteUser(newData, value, currentRowData) {

    var email = newData.row.data.email

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


                        window.location.reload();

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

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: `Povabilo poslano na ${email}`,
                    showConfirmButton: false,
                    timer: 2500
                });
                setTimeout(function () {
                    location.href = "/home/index"
                }, 3500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: `Za obstoječa podjetja uporabljajte internega administratorja`,
                    showConfirmButton: false,
                    timer: 2500
                });

                setTimeout(function () {
                    location.href = "/home/index"
                }, 3500);
            }
           
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
    var address = jQuery("#username").val();
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
                    title: `Povezava je poslana na ${address}`,
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
                                            title: `Predloga ${result.value} shranjena.`,

                                            type: "success",
                                            timer: 3000
                                        }).then(() => {
                                            window.location.href = "/home/index";
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
                    Swal.fire({
                        title: `Predloga ni shranjena.`,

                        type: "success",
                        timer: 3000
                    }).then(() => {
                        window.location.href = "/home/index";
                    })
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

    var end = -1;
    if (obj.hasHeaders) {
        document.getElementById("cbCheckbox").checked = true;
    }



    for (var i = 0; i < obj.baseData.length; i++) {
        var current = obj.baseData[i];
        window.current = current;

        if (current.Value.name.includes("Stolpec")) {
            end = current.Value.name.replace("Stolpec", "").trim()
        } else {
            end = findIndex(current.Value.name);
        }

        var table = document.getElementById("names");
        var start = findElement(table, current.Key.field);
        connectElementsManualy(start, end);
    }
}


function findIndex(name) {
    var table = document.getElementById("arrow");
    for (var i = 0, row; row = table.rows[i]; i++) {
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
            if (col.innerHTML == name) {
                return i - 1;
            }
        }
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
    var line = new LeaderLine(endElement, startElement, {color: 'blue', size: 3, startSocket: 'right', endSocket: 'left', startPlug: 'disc', endPlug: 'disc'});
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

        var line = new LeaderLine(endElement, startElement, { color: 'blue', size: 3, startSocket: 'right', endSocket: 'left', startPlug: 'disc', endPlug: 'disc' });



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