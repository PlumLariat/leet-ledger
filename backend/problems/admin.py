from django.contrib import admin
from .models import Problem, Pattern

@admin.register(Pattern)
class PatternAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ['problem_no', 'title', 'difficulty', 'platform']
    list_filter = ['difficulty', 'platform']
    search_fields = ['title']