from django import forms
from .models import get_borough_list, story
class StoryForm(forms.Form):
    pass

def figureOutChoices():
    list_of_bouroghs = get_borough_list()
    # create a 2d tuple list
    # format: [Answer Choice, index for backend]
    CHOICES = tuple((index, bourogh) for index, bourogh in list_of_bouroghs.items())
    return CHOICES

class RestaurantForm(forms.Form):
    bourogh = forms.ChoiceField(label="What bourogh is your Restaurant in", choices=figureOutChoices())
    name = forms.CharField(label="Name of Restaurant", error_messages={'required': 'Please submit your Restaurant name'})
    xcor = forms.FloatField()
    ycor = forms.FloatField()

class StoryForm(forms.ModelForm):
    class Meta:
        model = story
        fields = ['restaurant', 'storytext']