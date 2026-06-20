from django.db import models
from problems.models import Problem

# Create your models here.
class Attempt(models.Model):
    STATUS_CHOICES = [
        ("AC", "Accepted"),
        ("WA", "Wrong Answer"),
        ("TLE", "Time Limit Exceeded"),
        ("MLE", "Memory Limit Exceeded"),
        ("DNF", "Did Not Finish"),
    ]

    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name="attempts")
    date = models.DateField()
    hints_used = models.PositiveIntegerField(default=0)
    my_time_complexity = models.CharField(max_length=50, blank=True)
    my_space_complexity = models.CharField(max_length=50, blank=True)
    time_taken = models.DurationField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    next_review = models.DateField(null=True, blank=True)
    times_reviewed = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-date']

    def __str__(self) -> str:
        return f"{self.problem.title} - {self.date} ({self.status})"