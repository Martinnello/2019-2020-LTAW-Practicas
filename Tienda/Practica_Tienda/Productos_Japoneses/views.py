from django.shortcuts import render
from random import randint
from django.http import HttpResponse

# Create your views here.

def index(request):
        numero = randint(0, 100)
        return render(request, 'pag_principal.html', {'numero':str(numero)})
