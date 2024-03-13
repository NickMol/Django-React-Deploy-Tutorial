from django.urls import path 
from .views import * 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')
router.register('employees', EmployeeViewset, basename='employees')
urlpatterns = router.urls


# urlpatterns = [
#     path('', home) 
# ]