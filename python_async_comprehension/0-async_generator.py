#!/usr/bin/env python3
"""
0-async_generator.py
Module containing an asynchronous coroutine.
"""
from typing import Generator, List
import random
import asyncio


async def async_generator() -> Generator[float, None, None]:
    """
    Waits for 10 seconds and yields 10 numbers.
    """
    x: float
    for i in range(10):
        await asyncio.sleep(1)
        x = random.uniform(0, 10)
        yield (x)
