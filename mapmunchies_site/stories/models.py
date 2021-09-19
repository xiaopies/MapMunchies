from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator, MinValueValidator
from django.contrib.auth.models import User


def get_borough_list():
    list_of_bouroghs = {
        1:'brooklyn',
        2:'manhattan',
        3:'queens',
        4:'bronx',
        5:'staten island',
    }
    return list_of_bouroghs
# Create your models here.
class restaurants(models.Model):
    time = models.TimeField(default=timezone.now)
    name = models.CharField(max_length = 20, validators = [MinLengthValidator(1)])
    borough = models.IntegerField(validators=[MinValueValidator(0, message="must be a value from 1-5")])
    xcor = models.FloatField()
    ycor = models.FloatField()
    REQUIRED_FIELDS = [time, name, borough,xcor, ycor]

    # has to be a nyc bourogh for now
    # futore could use coords with google geolocator api
    def get_borough(self):
        list_of_bouroghs = get_borough_list()
        return list_of_bouroghs[int(self.bourogh)]

    def __str__(self):
        return str(self.name)


class story(models.Model):
    time = models.TimeField(default=timezone.now)
    restaurant = models.ForeignKey(restaurants, on_delete=models.CASCADE)
    storytext = models.TextField(null=False, validators=[MinLengthValidator(1)])
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    REQUIRED_FIELDS = [time, restaurant, storytext]

    def __str__(self):
        return str(self.time) + ' ' + str(self.restaurant)
