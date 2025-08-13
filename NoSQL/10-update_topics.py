#!/usr/bin/env python3
""" 10-update_topics """


def update_topics(mongo_collection, name, topics):
    """
    Updates all topics of a school document based on its name

    Args:
        mongo_collection (Collection): pymongo collection object
        name (str): school name to update
        topics (list): list of topics to set
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
