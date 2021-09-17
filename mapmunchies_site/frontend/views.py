from django.shortcuts import render
from stories import forms
# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

def explore(request):
    return render(request, 'frontend/explore.html')

def about(request):
    return render(request, 'frontend/about.html')

def test(request):
    x = forms.RestaurantForm()
    return render(request, 'frontend/test.html', {'form':x})
