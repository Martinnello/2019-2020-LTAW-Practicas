# -- Fichero mi_tienda/admin.py
from django.contrib import admin
from PS4_Games_Store.models import Producto, Pedido

admin.site.register(Producto)
admin.site.register(Pedido)
