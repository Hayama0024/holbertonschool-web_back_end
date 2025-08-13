#!/usr/bin/env python3
""" 9-insert_school """


def insert_school(mongo_collection, **kwargs):
    """
    Inserts a new document in a collection

    Args:
        mongo_collection (Collection): pymongo collection object
        **kwargs: key/value pairs for the new document

    Returns:
        ObjectId: _id of the inserted document
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
