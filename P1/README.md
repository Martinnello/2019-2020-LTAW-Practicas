# Práctica 1

Todos los ficheros necesarios se encuentran en la carpeta PRACTICA 1.

Esta practica se ha realizado en Google Chrome.
Para ejecutar en local debemos abrir la consola de nuestro ordenador y usar node serverP1.js
En el navegador vamos a http://localhost:8080/

La página establece un servidor que recibe peticiones y muestra todas ellas por pantalla, el index es la primera pagina que se pide con http://localhost:8080/, carga el favicon, las imagenes, el css y todos los elementos.

Al pinchar en cualquiera de los productos nos lleva a otro html y vemos igualmente los recursos solicitados y descargados.

Al pulsar en la imagen del carrito hace la solicitud /carrito pero al no encontrar el fichero carrito.html nos muestra un error 404 not found.
