//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
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

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let fich = __dirname + '/Chat.html'
  res.sendFile(fich)
  console.log("Acceso a " + fich)
})

//-- Vista date
app.get('/date', (req, res) => {
  res.send('Fecha de hoy!')
  console.log("Acceso a /date")
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'))

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  //-- Usuario conectado. Imprimir el identificador de su socket
  num_clients += 1
  console.log('--> Usuario conectado!. Socket id: ' + socket.id + "Usuario nº: " + num_clients.toString())
  socket.emit('hello', "Servidor: Bienvenido al Chat, eres el usuario: " + num_clients.toString())

  //-- Función de retrollamada de mensaje recibido del cliente
   socket.on('msg', (msg) => {
     console.log("Cliente: " + socket.id + ': ' + msg)
     //-- Enviar el mensaje a TODOS los clientes que estén conectados
     io.emit('msg', msg)
   })
  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
  num_clients -= 1
  console.log('--> Usuario Desconectado. Socket id: ' + socket.id)
  })

  // -- Gestión comandos
  socket.on('cmd', (msg) => {
    console.log("Servidor: " + socket.id + ': ' + msg);
    let message = "";

    if (msg == "/help") {
    message += "Comandos: <br><br> - /help: Ayuda. <br> - /list: Lista de usuarios conectados. <br> - /hello: Devuelve un saludo. <br> - /date: Fecha Actual."
    }else if (msg == "/list") {
    message += "Número de usuarios conectados = " + num_clients.toString()
    }else if (msg == "/hello") {
    message += "Hola, yo soy el servidor"
    }else if (msg == "/date") {
    message += new Date();
    }else {
    message += "Comando incorrecto, /help para más información"
    }

    socket.emit('msg', message)
  })

})
