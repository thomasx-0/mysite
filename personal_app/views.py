from django.shortcuts import render
from personal_app.models import BlogPost

def home(request):
    return render(request, 'personal_app/home.html')

def about(request):
    return render(request, 'personal_app/about.html')

def blog_post_list(request):
    posts = BlogPost.objects.all()
    return render(request, 'blog_post_list.html', {'posts': posts})

def blog_post_detail(request, post_id):
    post = BlogPost.objects.get(id=post_id)
    return render(request, 'personal_app/blog_post_detail.html', {'post': post})