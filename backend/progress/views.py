from rest_framework.viewsets import ModelViewSet

from .models import Attempt
from .serializers import AttemptSerializer


class AttemptViewSet(ModelViewSet):
    queryset = Attempt.objects.all()
    serializer_class = AttemptSerializer

    def get_queryset(self):
        queryset = (
            Attempt.objects.select_related("problem")
            .prefetch_related("problem__patterns")
            .order_by("-date")
        )
        problem = self.request.query_params.get("problem")
        if problem is not None:
            queryset = queryset.filter(problem=problem)
        return queryset
