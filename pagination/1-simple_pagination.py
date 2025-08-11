#!/usr/bin/env python3
"""
1-simple_pagination.py

Provide a Server class that paginates Popular_Baby_Names.csv.
"""

import csv
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return start (inclusive) and end (exclusive) indexes for a 1-indexed page."""
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: List[List[str]] | None = None

    def dataset(self) -> List[List[str]]:
        """Load and cache the dataset (without header)."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                rows = [row for row in reader]
            self.__dataset = rows[1:]  # drop header
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List[str]]:
        """
        Return a page of rows from the dataset.

        Args:
            page: 1-indexed page number (must be > 0).
            page_size: number of items per page (must be > 0).

        Returns:
            A list of rows (each row is a list of strings). Empty list if out of range.
        """
        # 1) validate inputs
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # 2) get cached data
        data = self.dataset()

        # 3) slice by computed range
        start, end = index_range(page, page_size)
        return data[start:end]
