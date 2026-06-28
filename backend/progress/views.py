from rest_framework.viewsets import ModelViewSet
from .models import Attempt
from .serializers import AttemptSerializer

class AttemptViewSet(ModelViewSet):
    queryset = Attempt.objects.select_related('problem').prefetch_related('problem__patterns').order_by('-date')
    serializer_class = AttemptSerializer