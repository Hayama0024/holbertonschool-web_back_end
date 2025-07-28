#!/usr/bin/env python3
"""Module that creates a key-value tuple from a string and number."""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Returns a tuple with the string and the square."""
    return (k, float(v ** 2))
