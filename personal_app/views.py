from django.shortcuts import render

def home(request):
    return render(request, 'personal_app/home.html')

def about(request):
    return render(request, 'personal_app/about.html')