from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from problems.models import Problem, Pattern
from progress.models import Attempt

class FirstAttemptViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/first_attempt/'
        self.valid_payload = {
            "problem": {
                "title": "Two Sum",
                "problem_no": 1,
                "difficulty": "Easy",
                "platform": "leetcode",
                "optimal_time_complexity": "O(n)",
                "optimal_space_complexity": "O(n)",
                "pattern_ids": []
            },
            "new_patterns": ["Hash Map"],
            "attempt": {
                "date": "2026-06-28",
                "status": "AC",
                "time_taken": "00:25:00",
                "hints_used": 0,
                "notes": "got it first try"
            }
        }

    def test_creates_problem_and_attempt(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Problem.objects.count(), 1)
        self.assertEqual(Attempt.objects.count(), 1)

    def test_creates_new_pattern_on_the_fly(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Pattern.objects.filter(name="Hash Map").exists())
        problem = Problem.objects.first()
        self.assertIn("Hash Map", problem.patterns.values_list('name', flat=True))

    def test_uses_existing_pattern(self):
        existing = Pattern.objects.create(name="Two Pointers")
        payload = {**self.valid_payload}
        payload['problem'] = {**self.valid_payload['problem'], 'pattern_ids': [existing.id]}
        payload['new_patterns'] = []
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pattern.objects.count(), 1)  # no duplicate created

    def test_rolls_back_on_failure(self):
        payload = {**self.valid_payload}
        payload['attempt'] = {**self.valid_payload['attempt'], 'status': 'INVALID_STATUS'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Problem.objects.count(), 0)
        self.assertEqual(Attempt.objects.count(), 0)

    def test_missing_problem_returns_400(self):
        payload = {'attempt': self.valid_payload['attempt']}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_attempt_returns_400(self):
        payload = {'problem': self.valid_payload['problem']}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)