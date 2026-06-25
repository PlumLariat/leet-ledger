from typing import Any
from problems.models import Problem
from progress.models import Attempt
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError, CommandParser

class Command(BaseCommand):
    help = "Imports previous Leetcode data from a csv spreadsheet."

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("file_names", nargs="+", type=str)

    def handle(self, *args: Any, **options: Any) -> str | None:
        for file in options["file_names"]:
            try:
                filepath = Path(file)

                if not filepath.exists():
                    raise FileNotFoundError
                
                self.stdout.write(
                    self.style.SUCCESS(f"Found file: {file}")
                    )

            except FileNotFoundError:
                raise CommandError(f"Could not find file: {file}")

