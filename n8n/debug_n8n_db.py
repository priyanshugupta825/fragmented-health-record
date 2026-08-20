import sqlite3
import os

DB_PATH = os.path.expanduser(r"~\.n8n\database.sqlite")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

tables = [t[0] for t in cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
print("Tables in n8n DB:")
for t in tables:
    print(f" - {t}")

print("\n--- Projects ---")
if "project" in tables:
    print(cur.execute("SELECT * FROM project").fetchall())

print("\n--- Users ---")
if "user" in tables:
    print(cur.execute("SELECT id, email, firstName, lastName FROM user").fetchall())

print("\n--- Shared Workflows ---")
if "shared_workflow" in tables:
    print(cur.execute("SELECT * FROM shared_workflow").fetchall())

print("\n--- Workflows ---")
print(cur.execute("SELECT id, name FROM workflow_entity").fetchall())

conn.close()
