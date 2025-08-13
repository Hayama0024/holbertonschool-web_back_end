#!/usr/bin/env python3
""" 11-schools_by_topic """


def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of school having a specific topic

    Args:
        mongo_collection (Collection): pymongo collection object
        topic (str): topic to search

    Returns:
        list: list of matching documents
    """
    return list(mongo_collection.find({"topics": topic}))
