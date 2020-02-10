const http = require('http');
const PUERTO = 8080

//-- Configurar el servidor. Cada vez que llegue una peteicion
//-- se notifica en la consola
http.createServer( (req, res) => {
  console.log("---> Petición recibida")
  console.log("---> Cabeceras:")
  console.log("HOST: " + req.headers.host)
  console.log("USER AGENT: " + req.headers['user-agent'])
  console.log("ACCEPT:" + req.headers['accept-language'])
  console.log("ACCEPT-ENCODING:" + req.headers['accept-encoding'])
  console.log("CONNECTION: " + req.headers.connection)
  console.log("UPGRADE-INSECURE-REQUEST: " + req.headers['upgrade-insecure-requests'])
  console.log("---> Recurso solicitado (URL): " + req.url)
}).listen(PUERTO);

console.log("Arrancando servidor...")
console.log("Puerto: " + PUERTO)

//-- Crear un objeto con varias propiedades
let mi_objeto = {
  nombre: "mi-elemento",
  x : 10,
  y : 20
}

//-- Acceder a las propiedades del objeto
for (prop in mi_objeto) {
  console.log("Propiedad: " + prop + " --> Valor: " + mi_objeto[prop])
}
