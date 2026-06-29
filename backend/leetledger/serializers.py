from rest_framework import serializers
from problems.serializers import ProblemSerializer
from progress.serializers import AttemptSerializer
from problems.models import Problem, Pattern
from progress.models import Attempt
from django.db import transaction

class FirstAttemptSerializer(serializers.Serializer):
    problem = ProblemSerializer()
    attempt = AttemptSerializer()
    new_patterns = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list
    )

    def create(self, validated_data):
        problem_data = validated_data.pop('problem')
        attempt_data = validated_data.pop('attempt')
        new_pattern_names = validated_data.pop('new_patterns', [])

        # every part succeeds or nothing does, atomic
        with transaction.atomic():
            existing_patterns = problem_data.pop('patterns', [])
            created_patterns = [
                Pattern.objects.get_or_create(name=name)[0]
                for name in new_pattern_names
            ]
            all_patterns = existing_patterns + created_patterns

            # create the problem
            problem = Problem.objects.create(**problem_data)
            problem.patterns.set(all_patterns)

            # create the attempt
            attempt = Attempt.objects.create(problem=problem, **attempt_data)

        return {
            'problem': problem,
            'attempt': attempt
        }