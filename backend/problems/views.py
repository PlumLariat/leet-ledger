from rest_framework.viewsets import ModelViewSet

from .models import Pattern, Problem
from .serializers import PatternSerializer, ProblemSerializer


class PatternViewSet(ModelViewSet):
    queryset = Pattern.objects.order_by("name")
    serializer_class = PatternSerializer


class ProblemViewSet(ModelViewSet):
    queryset = Problem.objects.prefetch_related("patterns").order_by("problem_no")
    serializer_class = ProblemSerializer
