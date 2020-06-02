from django.shortcuts import render
from django.http import HttpResponse
from random import randint
from django.template import Template, Context
from django.template.loader import get_template
from PS4_Games_Store.models import Producto

# Create your views here.

def index(request):
    productos = Producto.objects.all()
    return render(request, 'index.html', {'Items':productos})

def carrito(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'carrito.html', {'numero':str(numero)})

# Pagina de cada producto
def plantilla_items(request, path):
    try:
        producto = Producto.objects.get(path__startswith=path)
        return render (request, 'plantilla_items.html', {'Item': producto})
    except:
        return HttpResponse("Error 404: File not found")

def compra(request):
    return render(request, 'compra.html', {})

def factura(request):
    try:
        # -- Obtener el nombre de la persona y producto del formulario
        email = request.POST['email']
        producto = request.POST['producto']
        # -- Imprimirlo en la consola del servidor y en factura.html
        print(f" Se ha recibido un pedido... {email} Solicita la compra de {producto}")
        item = Producto.objects.get(nombre=producto)
        return render(request, 'factura.html', {'Item':item, 'Email':email})
    except:
        return HttpResponse("Error 404: File not found. <br><br> EL PRODUCTO NO SE ENCUENTRA EN NUESTRA LISTA DE PRODUCTOS!!!")
