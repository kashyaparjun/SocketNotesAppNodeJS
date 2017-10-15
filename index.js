var server = require('http').createServer();
var io = require('socket.io')(server);
notes = {};
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
io.on('connection', (client) => {
    io.on('connection', (client) => {
        console.log("Client Connected");
    });
    client.on('getNotes', (data) => {
        if(data.id == 'e5js12534125wwer'){
            client.emit('response', notes);
        }
        else{
            client.emit('reponse', 'No Hacking Here!');
        }
    });
    client.on('addNote', (data) => {
        if(data.id == 'e5js12534125wwer'){
            var len = makeid();
            var p = {
                "note": data.note,
                "title": data.title
            };
            notes[len] = p;
            io.emit('broadcast', notes);
            client.emit('response', true);
        }
        else{
            client.emit('response', 'No Hacking Here!');
        }
    });
    client.on('deleteNote', (data) => {
        if(data.id == 'e5js12534125wwer'){
            delete notes[data.del];
            client.emit('response', true);
            io.emit('broadcast', notes);
        }
        else{
            client.emit('response', 'No Hacking Here!');
        }
    });
    client.on('disconnect', () => {
        console.log("Client Disconnected");
    });
});
server.listen(3000);