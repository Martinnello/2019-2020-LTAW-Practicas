from django.shortcuts import render
from django.http import HttpResponse
from random import randint
from django.template import Template, Context
from django.template.loader import get_template

# Create your views here.

def index(request):
        numero = randint(0, 100)
        return render(request, 'index.html', {'numero':str(numero)})

def carrito(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'carrito.html', {'numero':str(numero)})

def plantilla_items(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    # -- Leer la plantilla del fichero
    t = get_template('plantilla_items.html')

    # -- Crear el contexto: Asignar el numero
    c = {'numero': str(numero)}

    # -- Obtener la pagina html final
    html = t.render(c)
    return HttpResponse(html)
