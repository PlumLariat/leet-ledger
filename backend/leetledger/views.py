from django.http import JsonResponse
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FirstAttemptSerializer
from typing import cast

def health(request):
    try:
        connection.ensure_connection()
        return JsonResponse({"status": "ok", "database": "connected"})
    except Exception:
        return JsonResponse({"status": "ok", "database": "unreachable"}, status=503)
    
class FirstAttemptView(APIView):
    def post(self, request):
        serializer = FirstAttemptSerializer(data=request.data)
        if serializer.is_valid():
            result = cast( dict, serializer.save())
            return Response({
                'problem': result['problem'].id,
                'attempt': result['attempt'].id,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)