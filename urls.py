from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('personal_app.urls')),  # Include personal_app URLs
]
