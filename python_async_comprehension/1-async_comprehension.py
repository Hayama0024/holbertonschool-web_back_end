#!/usr/bin/env python3
"""Collect 10 random numbers from an async generator using async"""
from typing import List
from 0-async_generator import async_generator


async def async_comprehension() -> List[float]:
    """Collect 10 random numbers asynchronously and return a list"""
    return [i async for i in async_generator()]
