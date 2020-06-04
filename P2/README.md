# Práctica 2

Todos los ficheros necesarios se encuentran en la carpeta PRACTICA 2.

Esta practica se ha realizado en Google Chrome.
Para ejecutar en local debemos abrir la consola de nuestro ordenador y usar node python3 manage.py runserver
En el navegador vamos a http://localhost:8000/PS4_Games_Store/ para acceder a la tienda.
Para acceder al administrador puede usar http://localhost:8000/admin/ con usuario martinello y la contraseña 159753

En el admin existen 2 modelos:
-Producto, con los parametros: nombre, path, imagen, descripcion, precio y stock
-Pedido, con los parametros: nombre y juego.

En la página de inicio se hace un bucle sobre el modelo Producto y nos muestra todos los juegos añadidos con una imagen, si pinchamos en ella nos redirecciona a la pagina de cada articulo. En el html de cada juego cogemos cada uno de los parámetros de este y los mostramos por pantalla, usando plantilla_items.html, nos llevara al path de cada juego.

Para comprar el producto rellenando el formulario hay que hacer click en "¿Quieres comprar el producto? Haz click aqui" y nos redirige a /compra donde debemos rellenar los campos email ("nombre") y juego (modelo del producto).

Para que su stock disminuya en 1 hay que poner el nombre exacto del juego a elegir entre Death Stranding, Bloodborne o Dark Souls (con sus mayusculas). Redirige al usuario a la pagina /factura donde se muestran los datos recibidos, que ademas son añadidos en el modelo Pedido, con los dos parametros que hemos metido por teclado en el formulario.

Si el stock es 0 no se nos permite comprarlo ni acceder a /compra.
