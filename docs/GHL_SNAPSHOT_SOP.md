# SOP: The "Perfect Cleaning Biz" GHL Snapshot

**Goal:** Create a standardized GoHighLevel Snapshot that can be deployed to any cleaning client in <1 hour.

## 1. Pipelines
Create a single pipeline named **"Service Delivery"**:
1.  **New Lead** (Source: Form, Chat, Voice AI)
2.  **Contacted / AI Engaged** (Auto-move here if AI replies)
3.  **Quote Sent**
4.  **Booked / Scheduled**
5.  **Job Complete**
6.  **Review Request Sent**
7.  **Review Received (Won)**

## 2. Custom Fields
Create these as **Contact Fields** (so you can use them easily in SMS/Email templates like `{{contact.job_address}}`).
*   **Folder Name:** `Cleaning Job Details`
    *   `Service Type` (Dropdown: Regular, Deep, Move-Out)
    *   `Job Address` (Text) - *Note: Use this if different from mailing address, otherwise map standard Address.*
    *   `Lockbox Code` (Text)
    *   `Pets on Property` (Yes/No)
    *   `Estimated Price` (Currency)

## 3. Core Automations (Workflows)

### Workflow A: "Fast Five" (Missed Call Text Back)
*   **Trigger**: Call Status = Missed.
*   **Condition**: Working Hours vs. Off Hours.
*   **Action**: Wait 0.2 mins -> SMS: "Hey, this is {{user.name}} from {{location.name}}. Saw we missed you! Are you looking for a cleaning quote?"
*   **Action**: Add Tag "Missed Call Lead".

### Workflow B: The AI Receptionist Handoff
*   **Trigger**: Webhook Incoming (from Vapi).
*   **Action**: Create/Update Contact (Name/Phone from Voice AI).
*   **Action**: Add Note with Call Summary.
*   **Action**: If "Booked" -> Add to Calendar -> Send Confirmation SMS.

### Workflow C: Review Generation Engine
*   **Trigger**: Pipeline Stage Changed to "Job Complete".
*   **Action**: Wait 1 Hour.
*   **Action**: SMS: "Hi {{contact.first_name}}, hope the home looks great! Would you mind doing us a huge favor and tapping 5 stars here? [Trigger Link]"
*   **Action**: Wait 2 Days.
*   **Condition**: If Review NOT received -> Email Follow-up.

### Workflow D: Database Reactivation (The "Money Printer")
*   **Trigger**: Manual Bulk Action.
*   **Action**: SMS: "Hey {{contact.first_name}}, we have 3 spots left for deep cleaning this week at 15% off. Want one?"
*   **Action**: Wait for Reply.
*   **Response**: If "Yes/Sure/Price" -> Notify User.

## 4. Calendars
*   **"Service Calendar"**:
    *   Slot Duration: 2-4 Hours (customizable per client).
    *   Buffer: 30 mins.
    *   Sync: Sync to Client's Google Calendar.

## 5. Agency Admin: Packaging the Product
**Critical Step: Do this AFTER building everything in your "Lab" Sub-account.**
1.  Go to **Agency View** > **Settings** > **Snapshots**.
2.  Click **Create New Snapshot**.
3.  Name it: `Cleaning Biz System v1`.
4.  Select your "Lab" Sub-account as the source.
5.  Click **Save**.
6.  *Optional:* Click "Share Snapshot" to get the permanent link for clients.

## 6. Client Deployment Checklist
1.  Create Client Sub-account.
2.  Load Snapshot.
3.  Buy Phone Number (Twilio/LC Phone).
4.  Connect Domain (for Funnels).
5.  Connect Vapi Webhook (for Voice AI).
