#!/usr/bin/env python3
"""Module that creates a multiplier function."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Returns a function that multiplies a float by the given multiplier."""
    def inner_function(x: float) -> float:
        return x * multiplier
    return inner_function
