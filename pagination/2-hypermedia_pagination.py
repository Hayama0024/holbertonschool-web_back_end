#!/usr/bin/env python3
"""
2-hypermedia_pagination.py

Server class that paginates Popular_Baby_Names.csv and exposes a hypermedia
response including page metadata.
"""

import csv
import math
from typing import Dict, List, Optional, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return start (inclusive) and end (exclusive) indexes for a 1-indexed page.

    Args:
        page: The current page number (1-indexed).
        page_size: Number of items per page.

    Returns:
        A tuple (start, end) suitable for slicing.
    """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: Optional[List[List[str]]] = None

    def dataset(self) -> List[List[str]]:
        """
        Load and cache the dataset (without header).

        Returns:
            The cached dataset as a list of rows (each row is a list of str).
        """
        if self.__dataset is None:
            with open(self.DATA_FILE, "r", newline="") as f:
                reader = csv.reader(f)
                rows = [row for row in reader]
            # Drop header
            self.__dataset = rows[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List[str]]:
        """
        Return a page of rows from the dataset.

        Args:
            page: 1-indexed page number (must be > 0).
            page_size: Number of items per page (must be > 0).

        Returns:
            A list of rows (possibly empty if out of range).
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        data = self.dataset()
        start, end = index_range(page, page_size)
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        Return hypermedia-style pagination details and the current page data.

        Args:
            page: 1-indexed page number (must be > 0).
            page_size: Number of items per page (must be > 0).

        Returns:
            A dict containing:
                - page_size: length of the returned page
                - page: current page number
                - data: the page data (list of rows)
                - next_page: next page number or None
                - prev_page: previous page number or None
                - total_pages: total number of pages (int)
        """
        data = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size) if page_size else 0

        prev_page: Optional[int] = page - 1 if page > 1 else None
        next_page: Optional[int] = page + 1 if page < total_pages else None

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }
