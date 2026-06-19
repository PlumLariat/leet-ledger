from django.http import JsonResponse
from django.db import connection

def health(request):
    try:
        connection.ensure_connection()
        return JsonResponse({"status": "ok", "database": "connected"})
    except Exception:
        return JsonResponse({"status": "ok", "database": "unreachable"}, status=503)