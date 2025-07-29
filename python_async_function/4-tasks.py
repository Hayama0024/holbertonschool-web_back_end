#!/usr/bin/env python3
"""Module that spawns multiple asyncio tasks using task_wait_random."""

import asyncio
from typing import List
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []
    for completed in asyncio.as_completed(tasks):
        result = await completed
        delays.append(result)
    return delays
