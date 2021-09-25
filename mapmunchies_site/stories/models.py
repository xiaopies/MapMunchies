from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator, MinValueValidator
from django.contrib.auth.models import User
from django.db.models.expressions import RawSQL

def get_borough_list():
    list_of_bouroghs = {
        1:'brooklyn',
        2:'manhattan',
        3:'queens',
        4:'bronx',
        5:'staten island',
    }
    return list_of_bouroghs


class restaurants_Manager(models.Manager):
    def isFloatNum(self, targetString):
        print(targetString)
        try: 
            float(targetString)
            return(True)
        except:
            print("Not a float")
            return(False)
    # request = { latitude:float, longitude:float, nelat:float, nelon:float, swlat:float, swlon:float }
    def search(self, request):
        print(request)
        x = True
        for value in request.values():
            if not self.isFloatNum(value):
                x = False
        # x = self.isFloatNum(request.latitude) and self.isFloatNum(request.longitude) 
        # x = x and self.isFloatNum(request.nelat) and self.isFloatNum(request.nelon) and self.isFloatNum(request.swlat) and self.isFloatNum(swlon)
        if (x): 
            # Great circle distance formula
            gcd_formula = "6371 * acos(min(max(\
            cos(radians(%s)) * cos(radians(lat)) \
            * cos(radians(lon) - radians(%s)) + \
            sin(radians(%s)) * sin(radians(lat)) \
            , -1), 1))"
            distance_raw_sql = RawSQL(
                gcd_formula,
                (request["centerlat"], request["centerlng"], request["centerlat"])
            )
            qs = self.get_queryset()
            #get biz in the viewable space
            qs = qs.filter(lat__lt = request["nelat"], lat__gt = request["swlat"], lon__lt = request["nelon"], lon__gt = request["swlon"])
            qs = qs.annotate(distance=distance_raw_sql)
            qs = qs.order_by('distance')
            # .values_list("placeID", flat=True)
            # qs = qs[:10] # take only the first 10
            listOfPlaceIDs = []
            for place in qs.iterator():
                # get wait time average
                listOfPlaceIDs.append([place.placeID, place.getAverage()])
            # data = serialize("json", [ qs, ])
            print('qs: ' + str(listOfPlaceIDs))
            return listOfPlaceIDs
        return('bad inputs') #escape out

# Create your models here.
class restaurants(models.Model):
    time = models.TimeField(default=timezone.now)
    name = models.CharField(max_length = 20, validators = [MinLengthValidator(1)])
    borough = models.IntegerField(validators=[MinValueValidator(0, message="must be a value from 1-5")])
    lat = models.FloatField()
    lon = models.FloatField()
    REQUIRED_FIELDS = [time, name, borough,lat, lon]

    # has to be a nyc bourogh for now
    # futore could use coords with google geolocator api
    def get_borough(self):
        list_of_bouroghs = get_borough_list()
        return list_of_bouroghs[int(self.bourogh)]

    def __str__(self):
        return str(self.name)

    objects = restaurants_Manager()



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
