# Práctica 3

Todos los ficheros necesarios se encuentran en la carpeta PRACTICA 3.
Se ha probado con Firefox y Google Chrome.
Para ejecutar en local debemos abrir la consola de nuestro ordenador y usar node serverP3.js

En el navegador vamos a http://localhost:8080/

Los pasos a seguir son:

  1- En el index, podemos probar a añadir cualquier producto pero nos reenvia a a la misma página de inicio indicando que, para poder comprar, debemos loguearnos.

  2- Podemos usar el buscador con enter en la celda "Encuentra tus juegos" o pulsando en el boton de buscar, nos saca el menu desplegable a partir de la 3ª letra añadida, mayusculas o minusculas. El buscador a veces en Chrome mantiene el menu desplegable aunque pinchemos en la coincidencia, si pinchamos fuera de la celda se quitara.

  3- Una vez nos hemos logueado, se guardan las cookies de email y password. Ademas tenemos acceso al carrito de compra. Si añadimos cualquiera de los productos al carrito (boton habilitado para ello en cada uno de los html de cada producto, accesibles desde busqueda o pinchando directamente encima de ellos), se añadira a la misma cookie del login, seguido de "/".

  4- Pinchando en la imagen del carrito accedemos al html de formulario de compra, donde debemos rellenar los campos que se nos piden, seleccionar el metodo de pago y pulsar en "ver mi factura antes de pagar" y asi poder ver los datos añadidos. Si no hemos seleccionado ningun producto no aparecera en la factura, si añadimos varias veces el mismo producto aparecera repetido.

  Todas las peticiones o envios quedan registrados en la consola, ademas de los añadidos al carrito y las cookies creadas.
