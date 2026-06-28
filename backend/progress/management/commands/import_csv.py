from typing import Any
from problems.models import Problem, Pattern
from progress.models import Attempt
from pathlib import Path
import csv
from datetime import timedelta

from django.core.management.base import BaseCommand, CommandError, CommandParser

def parse_duration(value: str) -> timedelta | None:
    """Converts MM:SS or HH:MM:SS to a timedelta object or None if data
    is malformed or none exists."""
    if not value or not value.strip():
        return None
    try:
        parts = value.strip().split(":")
        if len(parts) == 2:
            return timedelta(minutes=int(parts[0]), seconds=int(parts[1]))
        elif len(parts) == 3:
            return timedelta(hours=int(parts[0]), minutes=int(parts[1]), seconds=int(parts[2]))
    except (ValueError, AttributeError):
        return None
    
def parse_complexity(value: str | None, index: int) -> str:
    """Split a string like 'O(n) | O(n)' and return specified half or
    empty string"""
    if not value or not value.strip():
        return ""
    parts = value.split("|")
    if len(parts) > index:
        return parts[index].strip()
    return ""


class Command(BaseCommand):
    help = "Imports previous LeetCode data from a CSV spreadsheet."

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "file_name",
            type=Path,
            help="Csv file paths that contain LeetCode problem and attempt data to be imported."
        )

    def handle(self, *args: Any, **options: Any) -> str | None:
        # get the file from the parser
        file: Path = options['file_name']

        # Basic file validation 
        if not file.exists():
            raise CommandError("Could not find specified file.")
        if file.suffix.lower() != ".csv" or not file.is_file():
            raise CommandError("File specified is not CSV.")

        # Count rows in csv
        row_cnt = 0
        with open(file, mode='r', encoding='utf-8') as csv_file:
            # subtract 1, exclude header from the count
            row_cnt = sum(1 for _ in csv_file) - 1

        # User feedback for file found
        self.stdout.write(
            self.style.SUCCESS(f"Found file: {file}\nAttempting to Parse {row_cnt} rows of data.")
            )
        
        # attempt to open the csv file
        with open(file, newline='', encoding='utf-8') as csv_file:
            reader = csv.DictReader(csv_file)

            # lists for all three models' bulk insert
            problems = []
            attempts = []
            # all unique pattern names
            pattern_names: set[str] = set()

            # first pass on csv data for pattern collection
            rows = list(reader)

            for row in rows:
                raw_patterns = row.get("pattern") or ""
                for p in raw_patterns.split(","):
                    name = p.strip()
                    if name:
                        pattern_names.add(name)

            # pre-insert pattern_names so they can be used later
            for name in pattern_names:
                Pattern.objects.get_or_create(name=name)

            # create a mapping for pattern names to reference in other inserts
            pattern_map: dict[str, Pattern] = {p.name: p for p in Pattern.objects.all()}


            for row in rows:
                raw_no = row.get("problem_no") or ""
                problem_no = int(raw_no) if raw_no.strip().isdigit() else None

                problem, _ = Problem.objects.get_or_create(
                    title=row["title"],
                    defaults={
                        "problem_no": problem_no,
                        "difficulty": row["difficulty"],
                        "platform": row.get("platform") or "LeetCode",
                        "optimal_time_complexity": parse_complexity(
                            row.get("optimal time-space complexity"), 0
                        ),
                        "optimal_space_complexity": parse_complexity(
                            row.get("optimal time-space complexity"), 1
                        ),
                    },
                )

                raw_patterns = row.get("pattern") or ""
                pattern_objs = [
                    pattern_map[p.strip()]
                    for p in raw_patterns.split(",")
                    if p.strip() in pattern_map
                ]
                if pattern_objs:
                    problem.patterns.set(pattern_objs)

                attempts.append(Attempt(
                    problem=problem,
                    date=row["date"],
                    hints_used=int(row.get("hints used") or 0),
                    my_time_complexity=parse_complexity(
                        row.get("my time-space complexity"), 0
                    ),
                    my_space_complexity=parse_complexity(
                        row.get("my time-space complexity"), 1
                    ),
                    time_taken=parse_duration(row.get("time")),
                    status=row["status"],
                    next_review=row.get("next_review") or None,
                    times_reviewed=int(row.get("times_reviewed") or 0),
                    notes=row.get("notes") or "",
                ))
            
            Attempt.objects.bulk_create(attempts)
        
        self.stdout.write(
            self.style.SUCCESS(f"Import complete. {len(attempts)} attempts created.")
        )
