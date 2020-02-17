const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
console.log("----------> Peticion recibida")
let q = url.parse(req.url, true);
console.log(q)
console.log("Recurso:" + q.pathname.substr(1))

let mime = ""
let filename = ""
var extens = q.pathname.split(".")[1]

if (q.pathname == "/"){
  filename += "index.html"
} else {
  filename = q.pathname.substr(1)
}

fs.readFile(filename, (err, data) => {
//-- Fichero no encontrado. Devolver mensaje de error
if (err) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  return res.end("404 Not Found");
}
//-- Generar el mensaje de respuesta
res.writeHead(200, {'Content-Type': mime});
res.write(data);
res.end();
});

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
