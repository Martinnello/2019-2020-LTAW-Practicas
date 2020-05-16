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

//-- Vista Help
app.get('/help', (req, res) => {
  res.send('Comandos: <br><br> - /help: Ayuda. <br> - /list: Lista de usuarios conectados. <br> - /hello: Devuelve un saludo. <br> - /date: Fecha Actual.');
  console.log("Acceso a /help")
})

//-- Vista List
app.get('/list', (req, res) => {
  res.send('- /list: Lista de usuarios conectados.');
  console.log("Acceso a /list")
});

//-- Vista hello
app.get('/hello', (req, res) => {
  res.send('Bienvenido al chat de AMM!')
  console.log("Acceso a /hello")
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
  console.log('--> Usuario conectado!. Socket id: ' + socket.id)
  socket.emit('hello', "Bienvenido al Chat")
  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
  console.log('--> Usuario Desconectado. Socket id: ' + socket.id)
  })
})
