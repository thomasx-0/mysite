from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog_post_list, name='blog_post_list'),  # Blog post list view
    path('<int:post_id>/', views.blog_post_detail, name='blog_post_detail'),  # Blog post detail view
    path('about/', views.about, name='about'),  # About page
    path('home/', views.home, name='home'),  # Home page
]