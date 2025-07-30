#!/usr/bin/env python3
"""
2-measure_runtime.py
Module containing an asynchronous coroutine.
"""
from typing import Generator, List
import random
import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Computes runtime for four concurrent coroutines.
    """
    start: float = time.time()
    await asyncio.gather(*[async_comprehension() for _ in range(4)])
    end: float = time.time()

    return end - start
