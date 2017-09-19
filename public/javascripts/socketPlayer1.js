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
    proslediIzazov(izazivac);
    
});

socket.on('nece',function (data) {
    alert(data.msg);
});

socket.on('hoce',function (data) {
    window.open('dvaIgraca','_self');
});

socket.on('napustio',function (data) {
   alert(data.user+ ' je napustio igru');
   //vrati ga na /login
});

socket.on('listaNajboljih',function (data) {
   // alert(data.najbolji[0].username);
    ispisiNajbolje(data.najbolji);
});

function upisiRezultat(brPoena){
    socket.emit('upisiUBazu',{brPoena:brPoena});
};

function prikaziNajbolje(){
    socket.emit('prikaziNajbolje');
}
function hocu() {
    socket.emit('hocu');
    window.open('dvaIgraca','_self');
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
