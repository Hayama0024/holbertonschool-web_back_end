#!/usr/bin/env python3
"""Module that defines an asynchronous coroutine for waiting a random time."""

import asyncio
import random


async def wait_random(max_delay: int = 10) -> float:
    """Waits for a random delay between 0 and max_delay"""
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
