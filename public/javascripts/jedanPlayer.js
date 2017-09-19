var slike = ["item1","item2","item3","item4","item5","item6","item7"];
var firstFound = 0;
var iskoriscenHint=0;

class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));

  

    function foundImage(itemId, eve) {
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
             console.log("Random element: " +vratiRandomElement());

             if ($(".list-group .foundImg").length == 7) {
               var brojPoena = Math.round((stopwatch.times[0]*60+stopwatch.times[1] + stopwatch.times[2]/100)*100)/100;
               window.alert("Uspesno ste pronasli sve objekte za " +brojPoena + " sekundi!");
               stopwatch.stop();

               //ovde ide fja za upis u bazu
                upisiRezultat(brojPoena);
             }
             $('#mapname').imageMapResize();
           } // [Function] completed callback
         });
       }
     
     }

     
    function vratiRandomElement(){
        var brojElemenata = slike.length;
    
        return slike[Math.floor(Math.random()*brojElemenata)];
    }
    
    function resetGame() {
      slike = ["item1","item2","item3","item4","item5","item6","item7"];
      $("#foundObjectCount").text("0");
      $("li").removeClass("player1found player2found foundImg");
      $("#player1ObjectCount").text(0);
      $("#player2ObjectCount").text(0);
       
      iskoriscenHint=0;
      stopwatch.reset();
      stopwatch.start();
    }
    
    function hint(){
        if(iskoriscenHint==0){
            iskoriscenHint=1;
        var item = vratiRandomElement();
        switch (item[4]) {
        case "1":
            window.alert("Avalski toranj: Pogledaj levo, u oblacima");
            break;
        case "2":
            window.alert("Pobednik: Donji levi cosak");
            break;
        case "3":
            window.alert("Teniski teren: Malo narandzasto pored velike sive zgrade");
            break;
        case "4":
            window.alert("Spomenik knezu Mihailu: Kamuflirano uz drvece, pored velike sive zgrade");
            break;
        case "5":
            window.alert("Beogradjanka: Kako bre ovo ne vidis 'bem te coravog");
            break;
        case "6":
            window.alert("Hram Svetog Save: Negde ka sredini");
            break;
        default:
            window.alert("Kombank arena: Izmedju dve vatre hehe");
            
        }
        
    }
    else{
        window.alert("Iskoristili ste hint!");
    }
    }


    $(document).ready(function () {
        
            $('#mapname').imageMapResize();
            resetGame();
        
        });



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("gamersBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function targetGamer(gamerName) {
    izazovi(gamerName);

    modal.style.display = "none";
}

// When the user clicks on the button, open the modal 
btn.onclick = function() {

    vratiOnline();
}


var curUser=document.getElementById("ime").value;

function ispisiNiz(niz){
    modal.style.display = "block";
    var gamersList = document.getElementById("gamers-list");
    gamersList.innerHTML = "";

    for(var i=0; i<niz.length; i++) {
        if(niz[i]!=curUser)
        gamersList.innerHTML += "<p><a onclick=\"targetGamer('"+niz[i]+"')\">"+niz[i]+"</a></p>";
    }

    if(gamersList.innerHTML=="")
        gamersList.innerHTML="Trenutno nema online igraca";

}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function proslediIzazov(izazivac){
    if(confirm(izazivac+ " te izaziva, prihvatas izazov? ")){
        hocu();
    }else{
        necu();
    }
}

function ispisiNajbolje(najbolji){
    modal.style.display = "block";
    var najboljiList = document.getElementById("najbolji-list");
    najboljiList.innerHTML = "";

    for(var i=0; i<najbolji.length; i++) {
        najboljiList.innerHTML += "<p>"+najbolji[i].username+": "+najbolji[i].score+"</p>";
    }

    if(najboljiList.innerHTML=="")
        najboljiList.innerHTML="Nema skora";

}