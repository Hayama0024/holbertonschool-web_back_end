#!/usr/bin/env python3
"""12-log_stats.py"""

from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')
    db = client.logs
    nginx_col = db.nginx

    # 総ログ件数
    total_logs = nginx_col.count_documents({})
    print(f"{total_logs} logs")

    # メソッド別件数
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    print("Methods:")
    for method in methods:
        count = nginx_col.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    # GET /status 件数
    status_count = nginx_col.count_documents({
        "method": "GET", "path": "/status"
        })
    print(f"{status_count} status check")
