from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('<path>.html', views.plantilla_items, name='plantilla_items'),
    path('compra/', views.compra, name='compra'),
    path('factura/', views.factura, name='factura')
]
