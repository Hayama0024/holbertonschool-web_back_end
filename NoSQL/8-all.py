#!/usr/bin/env python3
""" 8-all """


def list_all(mongo_collection):
    """
    Lists all documents in a collection

    Args:
        mongo_collection (Collection): pymongo collection object

    Returns:
        list: list of documents (empty if none)
    """
    # find() で全件取得し、list() に変換
    return list(mongo_collection.find())
