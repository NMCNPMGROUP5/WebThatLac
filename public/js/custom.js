$(".custom-file-input").on("change", function() {
    var filename = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(filename);
});

function readOneURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            $('#previewImg').attr('src', e.target.result);
            $('#previewImg').show();
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#previewImg').hide();
    }
}

function getAccountID() {
    const id = document.getElementById("accountID");
    //alert(id);

    if (id){
        document.getElementById("form-accountID").value = id.value;
    }
   
}

$(document).ready(function(){
    getAccountID();
});