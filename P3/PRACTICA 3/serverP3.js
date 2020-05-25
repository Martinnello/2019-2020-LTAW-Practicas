//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http')
const fs = require('fs')
const url = require('url')

let productos = ["Death Stranding", "Bloodborne", "Dark Souls"]
let content = ""

console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {

  var q = url.parse(req.url, true);
  console.log("pathname:" + q.pathname)

  if (q.pathname != "/myquery") {
    let fileName = ""

    if (q.pathname == "/" ) {

      fileName = "/index.html"

    } else if (q.pathname == "/myform") {

          if (req.method === 'POST') {
          // Handle post info...

          switch (content) {
            case "Death Stranding":
              content = "death_stranding.html";
            break;

            case "Bloodborne":
              content = "bloodborne.html";
            break;

            case "Dark Souls":
              content = "darksouls.html";
            break;

            default:
              content = "";
          }

          req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();

              //-- Añadir los datos a la respuesta
              content += data;

              //-- Fin del mensaje. Enlace al formulario
              content += `
                  </p>
                  <a href="/">[Formulario]</a>
                </body>
              </html>
              `
              //-- Mostrar los datos en la consola del servidor
              console.log("Datos recibidos: " + data)
              res.statusCode = 200;
           });

           req.on('end', ()=> {
             //-- Generar el mensaje de respuesta
             res.setHeader('Content-Type', 'text/html')
             res.write(content);
             res.end();
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
    content = JSON.stringify(productos) + '\n'

    //-- Leer los parámetros recibidos en la peticion
    const params = q.query

    //-- No hacemos nada con ellos, simplemente los mostramos en
    //-- la consola
    console.log("Parametros: " +params.param1 + ' y ' + params.param2)

  //  let prod_similar = [];
  //  if (params.producto.length > 0) {
  //    for (var i = 0; i < productos.length; i++) {
  //      if (productos[i].toLowerCase().indexOf(params.producto.toLowerCase()) != -1) {
  //          prod_similar.push(productos[i]);
  //          resultado = productos[i];
  //  }
  //}
//}

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
