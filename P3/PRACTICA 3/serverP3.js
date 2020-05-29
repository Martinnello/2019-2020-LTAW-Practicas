//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http')
const fs = require('fs')
const url = require('url')

let productos = ["Death Stranding", "Bloodborne", "Dark Souls"]

console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {

  var q = url.parse(req.url, true);

  if (q.pathname != "/myquery") {

    if (q.pathname == "/" ) {

      fileName = "/index.html"

    } else if (q.pathname == "/myform") {

          if (req.method === 'POST') {

          req.on('data', chunk => {

              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString()

              //-- Añadir los datos a la respuesta
              content = data.split("=")[1].toLowerCase()

              //-- Mostrar los datos en la consola del servidor
              console.log("Datos recibidos: " + content)

              switch (content) {
                case "death+stranding":
                  content = "productos/death_stranding.html"
                break;

                case "bloodborne":
                  content = "productos/bloodborne.html"
                break;

                case "dark+souls":
                  content = "productos/darksouls.html"
                break;

                default:
                  content = ""
              }
           })

           req.on('end', ()=> {

             fs.readFile(content, (err, data) => {

               if (err) {
                 res.writeHead(404, {'Content-Type': 'text/html'})
                 return res.end("404 Not Found")
               } else {
                 res.writeHead(200, {'Content-Type': 'text/html'})
                 res.write(data)
                 return res.end()
               }
             })
           })
           return
        }
    } else {
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

    if (ext == "js"){
      mime = "application/javascript" + ext
    }

    //-- Peticion recibida
    console.log("Peticion recibida: " + q.pathname)

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
  } else if (q.pathname == "/myquery") {

    //-- Leer los parámetros recibidos en la peticion
    const params = q.query

    console.log("Parametros: " + params.param1)

    let busqueda = ""

    if (params.param1.length > 2) {
      for (var i = 0; i < productos.length; i++) {
        if (productos[i].toLowerCase().indexOf(params.param1) != -1) {
            busqueda += productos[i];
        }
      }
    }
    //-- El array de productos lo pasamos a una cadena de texto, en formato JSON
    busqueda = JSON.stringify(busqueda)
    res.setHeader('Content-Type', 'application/json')
    res.write(busqueda)
    return res.end()
  }
}

//-- Inicializar el servidor
const server = http.createServer(peticion)
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO + "\n")
