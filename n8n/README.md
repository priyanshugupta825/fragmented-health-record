# ⚡ n8n Workflows for Fragmented Health Record
**Team:** Creative Tinkers

These 3 production-ready **n8n automation workflows** integrate with the **Fragmented Health Record** platform to provide automated document ingestion, dosage reminders, and real-time emergency responder alerts.

---

## 📂 Available Workflows

| File | Workflow Name | Description |
| :--- | :--- | :--- |
| [`whatsapp_medical_document_parser.json`](./whatsapp_medical_document_parser.json) | **WhatsApp & Webhook AI Ingestion** | Ingests prescription photos/PDFs via WhatsApp or Webhook, triggers Gemini AI parsing, stores records in Health Vault, and replies with structured summary. |
| [`medicine_adherence_reminder.json`](./medicine_adherence_reminder.json) | **Medication Adherence Reminders** | Hourly cron job that checks active prescriptions, finds upcoming doses, and sends WhatsApp/SMS/Email reminders with 1-click adherence links. |
| [`emergency_qr_scan_alert.json`](./emergency_qr_scan_alert.json) | **Emergency QR First-Responder Alert** | Dispatches instant high-priority alerts to registered caregivers whenever a patient's Emergency QR code is scanned in an emergency. |

---

## 🚀 How to Import into n8n

### Method 1: 1-Click Import (Recommended)
1. Open your **n8n workspace** (e.g. `http://localhost:5678` or n8n Cloud).
2. Go to **Workflows** → Click **+ Add Workflow** (or press `Ctrl + N`).
3. Click the **three dots menu (`...`)** in the top-right corner of the canvas.
4. Select **Import from File** (or **Import from Clipboard**).
5. Choose one of the JSON files in this directory:
   - `n8n/whatsapp_medical_document_parser.json`
   - `n8n/medicine_adherence_reminder.json`
   - `n8n/emergency_qr_scan_alert.json`
6. Click **Save** and **Activate**.

---

## ⚙️ Environment Variables & Credentials in n8n

You can define these in n8n **Settings → Variables** or directly within node parameters:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `BACKEND_API_URL` | `http://localhost:8000/api` | Your deployed FastAPI backend URL (e.g., `https://your-render-app.onrender.com/api`) |
| `NOTIFICATION_WEBHOOK_URL` | `http://localhost:8000/api/health` | Webhook URL for WhatsApp / Telegram / Twilio / Slack alerts |

---

## 📱 Connecting to Real Notification Channels

### 1. WhatsApp Integration (Twilio or Meta WhatsApp Cloud API)
- In [`whatsapp_medical_document_parser.json`](./whatsapp_medical_document_parser.json), connect the **Twilio / WhatsApp** trigger node as the input.
- Replace the final **Respond to Webhook** node with a **Twilio WhatsApp Node** or **WhatsApp Business Cloud Node** to send the message directly to the patient's phone.

### 2. Telegram Bot
- Add the official **Telegram Node** to dispatch instant medication reminders and emergency alerts to a Telegram chat or private channel.

### 3. Email (Resend / SendGrid / SMTP)
- Connect a **Send Email** node to send structured medical summaries and caregiver emergency alerts.
