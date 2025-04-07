from django.contrib import admin
from .models import PersonalSite, BlogPost, Contact

admin.site.register(PersonalSite)
admin.site.register(BlogPost)
admin.site.register(Contact)