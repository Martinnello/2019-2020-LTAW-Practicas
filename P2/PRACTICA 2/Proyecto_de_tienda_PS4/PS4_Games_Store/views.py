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
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    email = request.POST['email']
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona} + {email}")
    return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre'] + request.POST['email'])
