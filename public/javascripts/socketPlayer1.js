var socket=io.connect('http://localhost:3000');
var ime=document.getElementById("ime");

konektuj();

socket.on('listaOnline',function (data) {
    var niz=data.usernames;
    ispisiNiz(niz);
});

socket.on('proslediIzazov',function (data) {
    var izazivac=data.username;
    //ovde treba da se ubaci fja da izadje prozor koji salje zahtev za challange
    alert("izaziva te "+izazivac);
});

socket.on('nece',function (data) {
    alert(data.msg);
});

socket.on('hoce',function (data) {
    alert(data.msg);
});

function hocu() {
    socket.emit('hocu');
};

function necu() {
    socket.emit('necu');
};

function vratiOnline(){
    socket.emit('prikaziOnline'); 
};

function izazovi(gamerName){
    socket.emit('izazovi',{player2:gamerName});
};


function konektuj(){
    socket.emit('konektujSe',{username:ime.value});
};