//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http')
const fs = require('fs')
const url = require('url')

let productos = ["Death Stranding", "Bloodborne", "Dark Souls"];

console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {

  var q = url.parse(req.url, true);
  console.log("pathname:" + q.pathname)

  if (q.pathname != "/myquery") {
    let fileName = ""

    if (q.pathname == "/" ){
      fileName = "/index.html"
    }  else {
      fileName = q.pathname
    }

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

    //-- Peticion recibida
    console.log("Peticion recibida!")
    console.log("Peticion: " + q.pathname)

    //-- Crear mensaje de respuesta o error

    console.log()
    fs.readFile("." + fileName, (err, data) => {

      if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'})
      return res.end("404 Not Found")
    } else {
      res.writeHead(200, {'Content-Type': mime})
      res.write(data)
      return res.end()
      }
    })
  } else {
    //-- El array de productos lo pasamos a una cadena de texto,
    //-- en formato JSON:
    content = JSON.stringify(productos) + '\n';

    //-- Generar el mensaje de respuesta
    //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
    //-- en la cabecera Content-Type
    res.setHeader('Content-Type', 'application/json')
    res.write(content);
    return res.end();
  }
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
