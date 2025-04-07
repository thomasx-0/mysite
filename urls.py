from django_distill import distill_path
from . import views  # Import the views module

def get_index():
    return None  # No parameters for the index view

urlpatterns = [
    distill_path('', views.index, name='index', distill_func=get_index),
    # Add more distill paths for other views as needed
]
