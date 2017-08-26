function foundImage(itemId, eve) {
  if (!$("#" + itemId).hasClass('hide')) {
    var rotateSrc = $("#area" + itemId).attr('data-img');
    $("#rotateitem").attr('src', rotateSrc);
    $("#rotateitem").css("display", "block");
    console.log($(".list-group .hide").length);
    $("#rotateitem").css("left", eve.offsetX);
    $("#rotateitem").css("top", eve.offsetY - 50);
    $("#rotateitem").rotate(360, {
      duration: 500,
      easing: 'swing',
      complete: function () {
        $("#rotateitem").css("display", "none");
        $("#" + itemId).addClass('hide');
        var found = $(".list-group .hide").length;
        $("#foundObjectCount").text(found);

        if ($(".list-group .hide").length == 7) {
          window.alert("Uspesno ste pronasli sve objekte!");
        }
        $('#mapname').imageMapResize();
      } // [Function] completed callback
    });
  }

}

function resetGame() {
  $("#foundObjectCount").text("0");
  $("li").removeClass("hide");
}
$(document).ready(function () {

  $('#mapname').imageMapResize();

});