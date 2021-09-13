from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

def explore(request):
    return render(request, 'frontend/explore.html')

def about(request):
    return render(request, 'frontend/about.html')