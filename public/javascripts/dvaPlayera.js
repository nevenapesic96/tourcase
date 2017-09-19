var slike = ["item1","item2","item3","item4","item5","item6","item7"];
var firstFound = 0;
var secondFound = 0;

    //ovo je kad player1 nadje
    function foundImage(itemId, eve) {
        pronasaoPlayer1(itemId);
       if (!$("#" + itemId).hasClass('foundImg')) {
         var rotateSrc = $("#area" + itemId).attr('data-img');
         $("#rotateitem").attr('src', rotateSrc);
         $("#rotateitem").css("display", "block");
         console.log($(".list-group .hide").length);
         $("#rotateitem").css("left", eve.offsetX);
         $("#rotateitem").css("top", eve.offsetY - 50);
         $("#rotateitem").css("color", "blue");
         $("#rotateitem").rotate(360, {
           duration: 500,
           easing: 'swing',
           complete: function () {
             $("#rotateitem").css("display", "none");
             $("#" + itemId).addClass('player1found foundImg');
             var index = slike.indexOf(itemId);
             console.log("Index pronadjenog: " +index);
             if (index > -1) {
                slike.splice(index, 1);
             }
             //console.log("Random element: " +vratiRandomElement());
             firstFound = $(".list-group .player1found").length;
             $("#player1ObjectCount").text(firstFound);
             secondFound = $(".list-group .player2found").length;
             $("#player2ObjectCount").text(secondFound);
             if ($(".list-group .foundImg").length == 7) {
               
               obracunajRezultat();
     
             }
             $('#mapname').imageMapResize();
           } // [Function] completed callback
         });
       }
     
     }

     function obracunajRezultat(){
         var firstFound = $(".list-group .player1found").length;
         $("#player1ObjectCount").text(firstFound);
         var secondFound = $(".list-group .player2found").length;
         $("#player2ObjectCount").text(secondFound);
       //  var brojPoena = Math.round((stopwatch.times[0]*60+stopwatch.times[1] + stopwatch.times[2]/100)*100)/100;
         if(firstFound > secondFound){
            prikaziRez("Pobedio je Player 1, sa rezultatom " +firstFound + ":" +secondFound);
            
         }else{
            prikaziRez("Pobedio je Player 2, sa rezultatom " +secondFound + ":" +firstFound);
         }
     }

     function prikaziRez(poruka) {
        if(confirm(poruka)){
            gotovaIgra();
        }else{
            gotovaIgra();
        }
     }
     
     
     //pronasao player2
     function foundByPlayer2(itemId){
         $("#" + itemId).addClass('player2found foundImg');
         var index = slike.indexOf(itemId);
         console.log("Index pronadjenog: " +index);
         if (index > -1) {
            slike.splice(index, 1);
         }
         secondFound = $(".list-group .player2found").length;
         $("#player2ObjectCount").text(secondFound);
         if ($(".list-group .foundImg").length == 7) {
           obracunajRezultat();
     
         }
     }
     $(document).ready(function () {
     
         $('#mapname').imageMapResize();
         //resetGame();
     
     });
     