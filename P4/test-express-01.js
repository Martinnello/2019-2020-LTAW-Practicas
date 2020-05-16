//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Puerto donde lanzar el servidor
const PORT = 8080

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let fich = __dirname + '/index.html';
  res.sendFile(fich);
  console.log("Acceso a " + fich);
});

//-- Vista Help
app.get('/help', (req, res) => {
  res.send('Comandos: <br> - /list: Lista de usuarios conectados. <br> - /hello: Devuelve un saludo. <br> - /date: Fecha Actual.');
  console.log("Acceso a /woala");
});

//-- Vista List
app.get('/List', (req, res) => {
  res.send('Comandos: <br><br> - /list: Lista de usuarios conectados. <br> - /hello: Devuelve un saludo. <br> - /date: Fecha Actual');
  console.log("Acceso a /woala");
});
