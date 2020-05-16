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

  let fileName = ""

  if (req.url == "/" ){
    fileName = "/index.html"
  }  else {
    fileName = req.url
  }

  //-- Peticion recibida
  console.log("Peticion recibida!")
  console.log("Recurso (URL): " + req.url)

  let ext = fileName.split(".")[-1]
  let mime = ""

  if (ext == "png" || ext == "jpg" || ext == "webp" || ext == "ico"){
    mime = "image/" + ext
  }

  if (ext == "css" || ext == "html" || ext == "txt"){
    mime = "text/" + ext
  }

  if (ext == "ttf"){
    mime = "font/" + ext
  }

  //-- Crear mensaje de respuesta o error

  console.log()
  fs.readFile("." + fileName, (err, data) => {

    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'})
      return res.end("404 Not Found")
    } else {

      content = "Bienvenido a mi tienda "
      res.setHeader('Set-Cookie','user=Martin')
      res.write(content)
      res.writeHead(200, {'Content-Type': mime})
      res.write(data)
      return res.end()
    }
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
