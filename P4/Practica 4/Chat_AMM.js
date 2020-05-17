//-- Cargar las dependencias, Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos los gestiona la app
const http = require('http').Server(app)

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http)

//-- Puerto donde lanzar el servidor
const PORT = 8080
var num_clients = 0

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT)
});

//-------- PUNTO DE ENTRADA DE LA APLICACION WEB
app.get('/', (req, res) => {
  let fich = __dirname + '/Chat.html'
  res.sendFile(fich)
  console.log("Acceso a " + fich)
})

app.use('/', express.static(__dirname +'/'))

// Establecer conexión
io.on('connection', function(socket){

   socket.on('new', (nick) => {
     //-- Nuevo usuario -- Un nuevo cliente se ha conectado!
     num_clients += 1
     console.log(nick + " se ha conectado! | Usuario nº: " + num_clients.toString())
     io.emit('new', nick + " se ha conectado! | Usuario nº: " + num_clients.toString())

     //-- Función de retrollamada de mensaje recibido del cliente
     socket.on('msg', (msg) => {
       console.log( nick + ": " + msg)
       //-- Enviar el mensaje a TODOS los clientes que estén conectados
       io.emit('msg', nick + ": " + msg)
     })

     //-- Usuario desconectado.
     socket.on('disconnect', function(){
       num_clients -= 1
       console.log(nick + " se ha desconectado!")
       io.emit('new', nick + " se ha desconectado!")
     })

      // -- Gestión comandos
     socket.on('cmd', (msg) => {
       console.log(nick + ': ' + msg)
       let message = "";

       switch (msg) {
         case "/help":
           message += "> /help => Comandos: <br><br> - /help: Ayuda. <br> - /list: Lista de usuarios conectados. <br> - /hello: Devuelve un saludo. <br> - /date: Fecha Actual."
           break;
         case "/list":
           message += "> /list => Número de usuarios conectados = " + num_clients.toString()
           break;
         case "/hello":
           message += "> /hello => Hola, yo soy el servidor"
           break;
         case "/date":
           message += "> /date =>" + new Date();
           break;
         default:
           message += "Comando incorrecto!!! Introduce /help para más información"
       }
       socket.emit('msg', message)
    })
  })
})
