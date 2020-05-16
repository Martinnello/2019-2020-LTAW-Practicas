console.log("Ejecutando cliente JS...")

var nick = prompt("Dime tu nombre");

//-- Obtener los elementos del DOM
const display = document.getElementById("display")
const msg = document.getElementById("msg")
const send = document.getElementById("send")


//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io()

//-- Se ha recibido el evento 'new':
socket.emit('new', nick);

console.log(nick + " se ha conectado");

//-- Se ha recibido el evento 'hello':
socket.on('hello', (msg) => {
  console.log("Mensaje del servidor => " + msg)
  display.innerHTML = msg
})

//-- Se ha recibido un mensaje
socket.on('msg', (msg) => {
  display.innerHTML += "<br> > " +  nick + ": " + msg
});

//-- Botón de envío
send.onclick = () => {
  if (msg.value){
    if (msg.value[0] == '/'){
      socket.emit('cmd', msg.value);
    }else {
      socket.emit('msg', msg.value);
    }
  }
  msg.value="";
}
