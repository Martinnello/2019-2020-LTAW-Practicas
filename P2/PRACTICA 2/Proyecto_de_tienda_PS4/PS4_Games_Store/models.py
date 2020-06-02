from django.db import models

# Create your models here.

class Producto(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    imagen = models.CharField(max_length=50, default="Indica url de la imagen")
    path = models.CharField(max_length=50, default="Indica url del producto")
    descripcion = models.CharField(max_length=2000, default="Indica aqui la descripcion")
    stock = models.IntegerField(default=10)
    precio = models.FloatField(default=59.90)

    # -- Usamos el nombre para identificar el producto
    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    """Modelo de datos de clientes"""

    usuario = models.CharField(max_length=50)
    juego =  models.CharField(max_length=50)

    # -- Usamos el nombre para identificar el producto
    def __str__(self):
        return self.usuario
