from django.shortcuts import render, get_object_or_404
from personal_app.models import BlogPost

def home(request):
    return render(request, 'personal_app/home.html')

def about(request):
    return render(request, 'personal_app/about.html')

def blog_post_detail(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)  # Fetch the blog post by ID
    return render(request, 'personal_app/blog_post_detail.html', {'post': post})

def blog_post_list(request):
    posts = BlogPost.objects.all()  # Fetch all blog posts
    return render(request, 'personal_app/blog_post_list.html', {'posts': posts})