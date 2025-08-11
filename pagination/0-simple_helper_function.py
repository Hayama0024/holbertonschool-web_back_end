#!/usr/bin/env python3
"""
0-simple_helper_function.py

Provides a helper to compute start/end indices for pagination given
a 1-indexed page number and the page size.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Compute the zero-based start index (inclusive) and end index (exclusive)
    for a paginated slice based on a 1-indexed page number.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): Number of items per page.

    Returns:
        Tuple[int, int]: A tuple of (start_index, end_index) suitable for slicing.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)