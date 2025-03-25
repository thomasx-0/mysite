from django.contrib import admin
from django.urls import path
from django_distill import distill_url
from personal_app import views

def get_index():
    return None  # No parameters needed for the home page

urlpatterns = [
    path('admin/', admin.site.urls),
    distill_url('', views.home, name='home', distill_func=get_index),
]