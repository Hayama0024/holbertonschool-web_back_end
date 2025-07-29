#!/usr/bin/env python3
"""Module that runs multiple coroutines concurrently and returns results"""

import asyncio
from typing import List
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawns wait_random n times with max_delay and returns the list"""
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]
    delays = []
    for completed in asyncio.as_completed(tasks):
        result = await completed
        delays.append(result)
    return delays
