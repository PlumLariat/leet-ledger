from django.db import models

# Create your models here.
class Pattern(models.Model):
    """Reusable M2M tag, eg: 'Array', 'Two Pointer', 'DFS'."""
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    

class Problem(models.Model):
    DIFFICULTY_CHOICES = [
        ("Easy", "Easy"),
        ("Medium", "Medium"),
        ("Hard", "Hard"),
    ]

    problem_no = models.PositiveIntegerField(null=True, blank=True)
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    patterns = models.ManyToManyField(Pattern, related_name="problems", blank=True)
    platform = models.CharField(max_length=50, default="LeetCode")
    optimal_time_complexity = models.CharField(max_length=50, blank=True)
    optimal_space_complexity = models.CharField(max_length=50, blank=True)

    class Meta:
        ordering = ['title']

    def __str__(self) -> str:
        return f"{self.problem_no}. {self.title}" if self.problem_no else self.title
