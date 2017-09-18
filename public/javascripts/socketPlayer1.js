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
    alert(data.msg);
});

socket.on('napustio',function (data) {
   alert(data.user+ ' je napustio igru');
   //vrati ga na /login
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

function proba(){
    var xmlHttl=new XMLHttpRequest();

    xmlHttl.onreadystatechange=function (url,callback) {
        if(xmlHttl.status==200 && xmlHttl.readyState==4){
            //sta ovde treba
        }
    }
    
    xmlHttl.open('GET','/dvaIgraca',false);
    xmlHttl.send();
}