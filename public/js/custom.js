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

// function getAccountID() {
//     const id = document.getElementById("accountID");
//     //alert(id);

//     if (id){
//         document.getElementById("form-accountID").value = id.value;
//     }
   
// }

function setPostTitleSize(){
    //alert($(window).width());
    if (($(window).width()) > 960){
        const postTitle = $(".postTitle");
            console.log(postTitle.length);
        for (let i = 0; i < postTitle.length; i++){
            if ($(".postTitle").width() >= 500) {
                $(".postTitle")[i].removeClass( "col-md-auto" ).addClass( "col-md-9" );
            }
        }
    }
}

$(document).ready(function(){
    //getAccountID();

    //Ngăn yêu cầu gửi lại form khi nhấn refresh
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }

});