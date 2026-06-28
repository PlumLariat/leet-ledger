from django.contrib import admin
from .models import Attempt

# Register your models here.
@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
    list_display = ['problem', 'date', 'status', 'time_taken', 'hints_used']
    list_filter = ['status', 'date']
    search_fields = ['problem__title']