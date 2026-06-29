"""
URL configuration for leetledger project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import health, FirstAttemptView
from problems.views import PatternViewSet, ProblemViewSet
from progress.views import AttemptViewSet

router = DefaultRouter()
router.register(r'patterns', PatternViewSet)
router.register(r'problems', ProblemViewSet)
router.register(r'attempts', AttemptViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health),
    path('api/first_attempt/', FirstAttemptView.as_view()),
    path('api/', include(router.urls)),
]
