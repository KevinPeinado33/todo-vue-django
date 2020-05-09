from django.urls import path
from .views import *


urlpatterns = [
    path('', TaskView.as_view(), name='tasks_list_url')
]