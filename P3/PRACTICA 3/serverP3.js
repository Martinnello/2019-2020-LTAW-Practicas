//-- Puerto donde recibir las peticiones
const PUERTO = 8080

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

  var q = url.parse(req.url, true)
  let cookie = req.headers.cookie

  // Cuando no gestionamos peticiones
  if (q.pathname != "/myquery") {

    if (q.pathname == "/" ) {

      fileName = "/index.html"

      fs.readFile("." + fileName, (err, data) => {

        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'})
          return res.end("404 Not Found")
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(data)
          return res.end()
        }
      })

    // Para gestionar las busquedas que vienen por formulario
    } else if (q.pathname == "/search") {

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

    // Gestiona el logueo del usuario
    } else if (q.pathname == "/login") {

      if (req.method == 'POST') {

        req.on('data', chunk => {

          // Recogemos los datos
          data = chunk.toString()

          let id = data.split("&")[0].split("=")[1]
          let pass = data.split("&")[1].split("=")[1]
          let login = false

          console.log("Email: " + id)
          console.log("Password: " + pass)

          // Vemos si esta registrado
          if (cookie){
            for (let valor in cookie.split("; ")) {
              console.log("Cookie: " + cookie.split("; ")[valor])
              if (cookie.split("; ")[valor].split("=")[0] == id) {
                login = true
              }
            }
          }

          // Guardando cookie
          if (!login) {
            res.setHeader('Set-cookie', id + "=" + pass)
          }

          req.on('end', ()=> {

            fs.readFile("./index_registrado.html", (err, data) => {

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
          })
        }
    // Para la creacion de la pagina de facturacion
    } else if (q.pathname == "/factura") {

        if (req.method == 'POST') {

          req.on('data', chunk => {

            data = chunk.toString()

            console.log(data)

            nombre = data.split("&")[0].split("=")[1]
            apellidos = data.split("&")[1].split("=")[1]
            email = data.split("&")[2].split("=")[1]
            email = email.replace("%40","@")
            metodo = data.split("&")[3].split("=")[1]

            console.log(nombre)
            console.log(apellidos)
            console.log(email)
            console.log(metodo)

            var products_carrito = ""

            // Cogemos los productos del carrito
            for (var i = 1; i<cookie.split("/").length; i++){
              products_carrito += " " + cookie.split("/")[i]
            }

            console.log("Productos carrito:" + products_carrito)

            content = `
              <!DOCTYPE html>
              <html lang="es" dir="ltr">
                <head>
                  <meta charset="utf-8">
                  <title>PS4 GAMES</title>
                  <link rel="stylesheet" href="static/css/micss.css">
                </head>
                <body>
                  <div class="portada">
                    <br>
                    <h1 style="color:white; padding-top:8%">  Todos los juegos en menos de 24 horas en casa</h1>
                    <br>
                  </div>
                  <br>
                  <div id="factura" style="text-align:center" >
                      <h2>FACTURA:</h2><br>
                    <div>
                      <p>`
              content += 'Nombre: ' + nombre + "<br><br><br> Apellidos: "
                         + apellidos + "<br><br><br> Email: " + email +
                         "<br><br><br> Metodo de pago: " + metodo
                         + "<br><br><br>Tus productos en carrito son: <br>" + products_carrito
              content +=
                    `</p>
                    </div>
                  </div>
                  <br><br>
                  <a style="text-align:center" href="/"><h2>INICIO</h2></a>
                </body>
              </html> `

            req.on('end', ()=> {
                  res.writeHead(200, {'Content-Type': 'text/html'})
                  res.write(content)
                  return res.end()
                })
            })
          }
    // Para añadir productos al carrito
    } else if (q.pathname == "/carrito") {

          req.on('data', chunk => {

            // Recogemos los datos
            data = chunk.toString()

            name_producto = data.split("=")[0]

            console.log("Producto añadido al carrito: " + name_producto)

            // Vemos si esta registrado
            if (cookie){
              for (let valor in cookie.split("; ")) {
                id = cookie.split("; ")[valor].split("=")[0]
                pass = cookie.split("; ")[valor].split("=")[1]
              }
              // Añadimos el producto en el valor de la cookie
              res.setHeader('Set-cookie', id + "=" + pass + "/" + name_producto)

              req.on('end', ()=> {

                fs.readFile("./index_registrado.html", (err, data) => {

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
            } else{
              req.on('end', ()=> {

                fs.readFile("./index_must_log.html", (err, data) => {

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
            }
            return
            })
    // Para gestionar las peticiones
    } else {

    fileName = q.pathname

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
      mime = "application/javascript"
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
    }
  //-- Leer los parámetros recibidos en la peticion del buscador
  } else {

  const params = q.query
  let parametro1 = params.param1.toLowerCase()

  console.log("Parametros: " + parametro1)

  let busqueda = ""

  if (params.param1.length > 2) {
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].toLowerCase().indexOf(parametro1) != -1) {
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
server.listen(PUERTO)

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO + "\n")
