//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http')
const fs = require('fs')
const url = require('url')

console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {


  let x = url.parse(req.url, true)

  //-- Peticion recibida
  console.log("Peticion recibida!")
  console.log("Recurso (URL): " + req.url)

  //-- Crear mensaje de respuesta

  console.log()
  fs.readFile('./index.html','utf8', (err, data) => {
    if (err) {
    res.writeHead(404, {'Content-Type': 'text/html'})
    return res.end("404 Not Found")
    }

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data)
    return res.end()
  })
}
//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(peticion)

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
