from rest_framework import serializers
from .models import Attempt
from problems.models import Problem
from problems.serializers import ProblemSerializer

class AttemptSerializer(serializers.ModelSerializer):
    problem = ProblemSerializer(read_only=True)
    problem_id = serializers.PrimaryKeyRelatedField(
        queryset=Problem.objects.all(),
        source="problem",
        write_only=True
    )
    class Meta:
        model = Attempt
        fields = [
            "id",
            "problem",
            "problem_id",
            "date",
            "hints_used",
            "my_time_complexity",
            "my_space_complexity",
            "time_taken",
            "status",
            "next_review",
            "times_reviewed",
            "notes"
        ]