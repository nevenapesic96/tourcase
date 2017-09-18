var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');


var index = require('./routes/index');
var sockets = require('./routes/users');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//resi ovo secret
app.use(session({secret:'secret',resave: false,
  saveUninitialized: true,
  cookie: { secure: !true }}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


var sockets=[];
var usernames=[];
var onlineUsers=[];
var gamesUser=[];


io.on('connection',function (socket) {
    console.log('New client connected, id: '+socket.id);

    socket.on('konektujSe',function (data) {
        var user=data.username;
        sockets[user]=socket.id;
        usernames[socket.id]=user;
        console.log("User: "+sockets[user]);
        onlineUsers.push(user);
      });

    socket.on('prikaziOnline',function () {
        socket.emit('listaOnline',{usernames:onlineUsers});
    });

    socket.on('izazovi',function (data) {
        var socketZa=sockets[data.player2];
        gamesUser[data.player2]=usernames[socket.id];
        gamesUser[usernames[socket.id]]=data.player2;
        //gamesSoc[socket.id]=socketZa;
       // gamesSoc[socketZa]=socket.id;
        console.log(gamesUser[data.player2]+" salje: "+data.player2);
        socket.broadcast.to(socketZa).emit('proslediIzazov',{username:usernames[socket.id]});
      });

      socket.on('hocu',function () {
        socket.broadcast.to(sockets[gamesUser[usernames[socket.id]]]).emit('hoce',{msg:'Hoce da igra'});
        //socket.broadcast.to(gamesSoc[socket.id]).emit('hoce',{msg:'Hoce da igra'});
        console.log(usernames[socket.id]+" i "+gamesUser[usernames[socket.id]]);
      });
    
      socket.on('necu',function () {
        socket.broadcast.to(sockets[gamesUser[usernames[socket.id]]]).emit('nece',{msg:'Nece da igra'});
       // socket.broadcast.to(gamesSoc[socket.id]).emit('nece',{msg:'Nece da igra'});
       delete gamesUser[gamesUser[usernames[socket.id]]]; 
       delete gamesUser[usernames[socket.id]];
       //delete gamesSoc[gamesSoc[socket.id]];
        //delete gamesSoc[socket.id];
      });

      socket.on('rekonektujSe',function (data) {
        var user=data.username;
        sockets[user]=socket.id;
        usernames[socket.id]=user;
        console.log("User: "+user);
        onlineUsers.push(user);
      });

      socket.on('player1',function (data) {
        var itemid=data.itemid;
        console.log(usernames[socket.id]+"je pronasao "+itemid);
        socket.broadcast.to(sockets[gamesUser[usernames[socket.id]]]).emit('player2',{itemid:itemid});
      });

    socket.on('disconnect',function () {
        var index=onlineUsers.indexOf(usernames[socket.id]);

        if(index!=-1){
        onlineUsers.splice(index,1);
        delete sockets[usernames[socket.id]];
        delete usernames[socket.id];
        console.log('Client gone: ',socket.id);
        }
        });
    
    
    });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs');
  });
  
  server.listen(3000,function(){
    console.log('Server started on port 3000');
  });
  
  module.exports = app;
  