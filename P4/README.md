# Práctica 4

Todos los ficheros necesarios se encuentran en la carpeta PRACTICA 4.

Esta practica se ha realizado en Google Chrome.
Para ejecutar en local debemos abrir la consola de nuestro ordenador y usar node Chat_AMM.js

Primero debemos indicar nuestro nick (nombre)

Para enviar cualquier mensaje debemos pusar SEND.

Si queremos ver los comandos introducimos /help, los comandos solo apareceran en el chat del usuario que los introduce.

Si ponemos /list, nos apareceran el numero de los usuarios conectados
Si ponemos /hello el servidor nos devolvera un saludo
Si ponemos /date nos indica la fecha y hora actual GMT +02

Cuando un nuevo usuario se conecta, se comunica a todos los usuarios previamente conectados, indicando el nombre de este nuevo usuario y la posicion en la que se conecto.

Cada vez que cualquier usuario envia un mensaje, a los demas les aparece (nick: mensaje enviado), pueden establecer la comunicacion en chat todos los usuarios que abran una nuevo pagina en el navegador en http://localhost:8080/

Todas las peticiones o envios quedan registrados en la consola.
