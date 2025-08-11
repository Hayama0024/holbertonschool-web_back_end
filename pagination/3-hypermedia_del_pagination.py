#!/usr/bin/env python3
"""
3-hypermedia_del_pagination.py

Deletion-resilient hypermedia pagination:
Return a page starting from an index, skipping over deleted records,
and provide the next index to request.
"""

import csv
from typing import Dict, List, Optional


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: Optional[List[List[str]]] = None
        # Indexed dataset: key = original position (0-based), value = row
        self.__indexed_dataset: Optional[Dict[int, List[str]]] = None

    def dataset(self) -> List[List[str]]:
        """Load and cache the dataset (without header)."""
        if self.__dataset is None:
            with open(self.DATA_FILE, "r", newline="") as f:
                reader = csv.reader(f)
                rows = [row for row in reader]
            self.__dataset = rows[1:]  # drop header
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List[str]]:
        """Dataset indexed by sorting position, starting at 0."""
        if self.__indexed_dataset is None:
            data = self.dataset()
            # Note: keep full dataset indexed (matches Holberton tests)
            self.__indexed_dataset = {i: data[i] for i in range(len(data))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: Optional[int] = None,
                        page_size: int = 10) -> Dict:
        """
        Return deletion-resilient page metadata and data slice.

        Args:
            index: starting position (0-based). If None, treated as 0.
            page_size: number of items to collect (must be > 0).

        Returns:
            Dict with:
                - index: the requested start index (even if it's a hole)
                - next_index: first index after the last returned item
                - page_size: actual number of items returned
                - data: list of rows (each row is a list[str])
        """
        idx = 0 if index is None else index
        assert isinstance(idx, int) and idx >= 0
        assert isinstance(page_size, int) and page_size > 0

        indexed = self.indexed_dataset()
        # Out-of-range check: valid start must not exceed current max key
        # (len(indexed) is count of remaining items, keys may have holes)
        max_key = max(indexed.keys()) if indexed else -1
        assert idx <= max_key

        data: List[List[str]] = []
        collected = 0
        current = idx

        # Walk forward, skipping missing keys (deleted rows)
        while collected < page_size and current <= max_key:
            if current in indexed:
                data.append(indexed[current])
                collected += 1
            current += 1

        return {
            "index": idx,
            "data": data,
            "page_size": len(data),
            "next_index": current
        }
