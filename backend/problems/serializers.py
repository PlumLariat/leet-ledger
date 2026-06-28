from rest_framework import serializers
from .models import Pattern, Problem

class PatternSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pattern
        fields = [
            "id",
            "name"
        ]



class ProblemSerializer(serializers.ModelSerializer):
    patterns = PatternSerializer(many=True, read_only=True)
    pattern_ids = serializers.PrimaryKeyRelatedField(
        queryset=Pattern.objects.all(),
        many=True,
        write_only=True,
        source='patterns'
    )

    def create(self, validated_data):
        patterns = validated_data.pop('patterns', [])
        problem = Problem.objects.create(**validated_data)
        problem.patterns.set(patterns)
        return problem
    
    def update(self, instance, validated_data):
        patterns = validated_data.pop('patterns', [])
        instance = super().update(instance, validated_data)
        instance.patterns.set(patterns)
        return instance
    
    class Meta:
        model = Problem
        fields = [
            "id",
            "problem_no",
            "title",
            "difficulty",
            "patterns",
            "pattern_ids",
            "platform",
            "optimal_time_complexity",
            "optimal_space_complexity"
        ]