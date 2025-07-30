#!/usr/bin/env python3
"""
1-async_comprehension.py
Module containing an asynchronous coroutine.
"""
from typing import Generator, List
import random
import asyncio

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Waits for 10 seconds and yields 10 numbers.
    """
    result: List[float] = [x async for x in async_generator()]
    return result
