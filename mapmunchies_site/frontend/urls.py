
from . import views
from django.urls import path

app_name='frontend'
urlpatterns = [
    path('', views.index, name="index"),
    path('explore', views.explore, name="explore"),
    path('about', views.about, name="about"),
    path('test', views.test, name="test"),
    path('nearbySearch', views.nearbySearch, name="nearbySearch"),
]
