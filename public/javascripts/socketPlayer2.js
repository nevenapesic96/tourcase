var socket=io.connect('http://localhost:3000');
var ime=document.getElementById("ime");

rekonektuj();

socket.on('player2',function (data) {
    foundByPlayer2(data.itemid);
 });

function rekonektuj(){
    socket.emit('rekonektujSe',{username:ime.value});
};

function pronasaoPlayer1(itemId){
    socket.emit('player1',{itemid:itemId});
};

function gotovaIgra(){
    socket.emit('gotovaIgra');
    window.open('jedanIgrac','_self');
}
