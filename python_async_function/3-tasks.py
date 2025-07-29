#!/usr/bin/env python3
"""Module that wraps wait_random in an asyncio Task."""

import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Returns an asyncio Task that waits for a random delay."""
    return asyncio.create_task(wait_random(max_delay))
