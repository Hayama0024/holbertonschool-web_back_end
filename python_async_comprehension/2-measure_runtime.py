#!/usr/bin/env python3
"""Measure the total runtime of four parallel async comprehensions."""

import asyncio
import time
from typing import List
from 1-async_comprehension import async_comprehension


async def measure_runtime() -> float:
    """Execute async_comprehension 4 times and return the runtime."""
    start = time.perf_counter()
    await asyncio.gather(*(async_comprehension() for _ in range(4)))
    end = time.perf_counter()
    return end - start
