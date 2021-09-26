from django.http.response import HttpResponse
from django.shortcuts import render, redirect, reverse
from stories.forms import RestaurantForm, StoryForm
from stories.models import restaurants
import json
# Create your views here.
def index(request):
    if request.method == "POST" and request.user.is_authenticated:
        #user submitted new restaurants form
        form = StoryForm(request.POST)
        if form.is_valid():
            ParticalStory = form.save(commit=False)
            ParticalStory.author = request.user
            ParticalStory.save()
            return redirect(reverse('index')) # We redirect to the same view
        else:
            return HttpResponse(form.errors)
    context = {'form': StoryForm()}
    return render(request, 'frontend/index.html', context)


def nearbySearch(request):
    if request.method == "POST":
        json_data = request.read()
        data = json.loads(json_data)
        result = restaurants.objects.search(data)
        print(type(result))
        if type(result) is list:
            formatedresult = {
                'data': result,
            }
            # good
            return HttpResponse(json.dumps(formatedresult))
        else:
            return HttpResponse(json.dumps('{"status": "1", "Error":'+ result +'}'))
        

def explore(request):
    if request.method == "POST" and request.user.is_authenticated:
        #user submitted new restaurants form
        form = RestaurantForm(request.POST)
        if form.is_valid():
            newRestaurant = form.save(commit=False)
            print("blah: " +  str(form.cleaned_data['bourogh']))
            newRestaurant.borough = form.cleaned_data['bourogh']
            newRestaurant.save()
            return redirect(reverse('frontend:explore')) # We redirect to the same view
        else:
            return HttpResponse(form.errors)

    context = {'RestaurantForm':RestaurantForm()}
    return render(request, 'frontend/explore.html', context)

def about(request):
    return render(request, 'frontend/about.html')

def test(request):
    context = {'form': StoryForm()}
    return render(request, 'frontend/test.html', context)
