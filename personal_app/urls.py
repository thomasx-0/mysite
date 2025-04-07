from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Home page
    path('blog/', views.blog_post_list, name='blog_post_list'),  # Blog list
    path('blog/<int:post_id>/', views.blog_post_detail, name='blog_post_detail'),  # Blog detail
]