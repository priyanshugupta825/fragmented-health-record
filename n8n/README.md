# ⚡ Free Self-Hosted n8n Guide (Zero Subscription Needed)
**Fragmented Health Record** — Team: Creative Tinkers

n8n is **100% Free and Open Source (Fair-Code)**. You **do not need to pay for an n8n Cloud subscription**. You can run n8n on your computer or deploy it to a free cloud hosting service with **unlimited workflows and executions**.

---

## 💻 Option 1: Run Locally for Free in 10 Seconds (Recommended)

Since you already have Node.js installed, you can start n8n immediately using `npx`:

### Quick Command:
Open PowerShell / Terminal in your project and run:
```bash
npx n8n
```

*(Or simply double-click [`n8n/start-n8n.bat`](./start-n8n.bat) in Windows Explorer).*

Once it starts:
1. Open **[http://localhost:5678](http://localhost:5678)** in your web browser.
2. Complete the free 1-time setup (set your local admin name/password).
3. You now have the full n8n automation canvas with **unlimited free executions**!

---

## 🐳 Option 2: Run with Docker

If you have Docker Desktop installed, run:
```bash
docker-compose -f n8n/docker-compose.yml up -d
```
Then visit **[http://localhost:5678](http://localhost:5678)**.

---

## ☁️ Option 3: Deploy n8n to the Cloud for Free (24/7 Online)

If you want your n8n workflows (webhooks, WhatsApp alerts) to run in the cloud 24/7 without keeping your laptop on:

### A. Free on Render Web Service:
1. In [Render](https://dashboard.render.com), click **New +** → **Web Service**.
2. Choose **Existing Image** (Public Git repository or Docker).
3. Image URL: `docker.n8n.io/n8nio/n8n`
4. Set environment variable:
   - `N8N_PORT`: `5678`
   - `GENERIC_TIMEZONE`: `Asia/Kolkata`
5. Select the **Free Instance Type** and click **Create Web Service**.

### B. Free on Hugging Face Spaces:
1. Create a new Space on [Hugging Face](https://huggingface.co/spaces) with **Docker** template.
2. Paste `FROM docker.n8n.io/n8nio/n8n` in the `Dockerfile`.
3. Runs 24/7 free in the cloud with an HTTPS public URL!

---

## 📥 How to Load the Pre-Built Workflows

1. Open your free n8n interface (`http://localhost:5678`).
2. Click **+ Add Workflow**.
3. Click the top-right **`...` (Menu)** → Select **Import from File**.
4. Import any of the 3 ready JSON files:
   - [`whatsapp_medical_document_parser.json`](./whatsapp_medical_document_parser.json)
   - [`medicine_adherence_reminder.json`](./medicine_adherence_reminder.json)
   - [`emergency_qr_scan_alert.json`](./emergency_qr_scan_alert.json)
5. Click **Save** and toggle **Active**.
