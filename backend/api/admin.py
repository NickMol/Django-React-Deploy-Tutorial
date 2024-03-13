from django.contrib import admin
from .models import * 

admin.site.register(Project)
admin.site.register(ProjectManager)
admin.site.register(TestModel)
admin.site.register(Employees)