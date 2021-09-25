from django.http.response import HttpResponse
from django.shortcuts import render
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
        else:
            return HttpResponse(form.errors)
    context = {'form': StoryForm()}
    return render(request, 'frontend/index.html', context)


def nearbySearch(request):
    if request.method == "POST":
        json_data = request.read()
        data = json.loads(json_data)
        restaurants.objects.search(data)
        return HttpResponse(json.dumps('{"status": "good"}'))

def explore(request):
    if request.method == "POST" and request.user.is_authenticated:
        #user submitted new restaurants form
        form = RestaurantForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data['name'])
            newRestaurant = restaurants(
                name = form.cleaned_data['name'],
                borough = form.cleaned_data['bourogh'],
                xcor = form.cleaned_data['xcor'],
                ycor = form.cleaned_data['ycor'],
                )
            newRestaurant.save()
        else:
            return HttpResponse(form.errors)

    restaurantform = RestaurantForm()
    context = {'RestaurantForm':restaurantform}
    return render(request, 'frontend/explore.html', context)

def about(request):
    return render(request, 'frontend/about.html')

def test(request):
    context = {'form': StoryForm()}
    return render(request, 'frontend/test.html', context)
