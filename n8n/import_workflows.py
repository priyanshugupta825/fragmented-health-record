import json
import os
import sqlite3
import uuid
from datetime import datetime

DB_PATH = os.path.expanduser(r"~\.n8n\database.sqlite")
N8N_DIR = os.path.dirname(os.path.abspath(__file__))

WORKFLOW_FILES = [
    {
        "file": "whatsapp_medical_document_parser.json",
        "id": "fhrDocIngest0001",
        "name": "FHR - WhatsApp & Webhook Medical Document AI Ingestion",
    },
    {
        "file": "medicine_adherence_reminder.json",
        "id": "fhrMedReminder01",
        "name": "FHR - Automated Medication Adherence Reminders",
    },
    {
        "file": "emergency_qr_scan_alert.json",
        "id": "fhrEmgAlert0001",
        "name": "FHR - Emergency QR Scan Immediate Caregiver Alert",
    },
]

def main():
    print(f"Connecting to n8n database at: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    for wf_meta in WORKFLOW_FILES:
        filepath = os.path.join(N8N_DIR, wf_meta["file"])
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Ensure ID and metadata are in the JSON file
        data["id"] = wf_meta["id"]
        data["name"] = wf_meta["name"]
        data["active"] = False

        # Save back to file
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        # Upsert into workflow_entity
        nodes_json = json.dumps(data.get("nodes", []))
        conn_json = json.dumps(data.get("connections", {}))
        settings_json = json.dumps(data.get("settings", {"executionOrder": "v1"}))
        version_id = str(uuid.uuid4())

        cur.execute(
            """
            INSERT INTO workflow_entity (
                id, name, active, nodes, connections, settings, staticData,
                pinData, versionId, triggerCount, meta, createdAt, updatedAt,
                isArchived, versionCounter
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                nodes=excluded.nodes,
                connections=excluded.connections,
                settings=excluded.settings,
                versionId=excluded.versionId,
                updatedAt=excluded.updatedAt
            """,
            (
                wf_meta["id"],
                wf_meta["name"],
                0,
                nodes_json,
                conn_json,
                settings_json,
                "{}",
                "{}",
                version_id,
                0,
                "{}",
                now,
                now,
                0,
                1,
            ),
        )
        print(f"[OK] Imported: {wf_meta['name']} (ID: {wf_meta['id']})")

    conn.commit()
    conn.close()
    print("\nAll 3 workflows successfully imported into your local n8n instance!")

if __name__ == "__main__":
    main()
