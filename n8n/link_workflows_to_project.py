import sqlite3
import os
from datetime import datetime, timezone

DB_PATH = os.path.expanduser(r"~\.n8n\database.sqlite")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Get personal project ID
project_row = cur.execute("SELECT id FROM project WHERE type='personal' LIMIT 1").fetchone()
if not project_row:
    project_row = cur.execute("SELECT id FROM project LIMIT 1").fetchone()

if not project_row:
    print("Error: No project found in n8n database.")
    exit(1)

project_id = project_row[0]
print(f"Linking workflows to project: {project_id}")

workflows = cur.execute("SELECT id, name FROM workflow_entity").fetchall()
now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

for wf_id, wf_name in workflows:
    cur.execute(
        """
        INSERT INTO shared_workflow (workflowId, projectId, role, createdAt, updatedAt)
        VALUES (?, ?, 'workflow:owner', ?, ?)
        ON CONFLICT(workflowId, projectId) DO NOTHING
        """,
        (wf_id, project_id, now, now)
    )
    print(f"[OK] Linked workflow '{wf_name}' ({wf_id}) to project {project_id}")

conn.commit()
conn.close()
print("\nSuccess! Workflows are now active and visible in your n8n workspace.")
