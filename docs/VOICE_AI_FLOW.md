# Voice AI Agent Flow (Native GHL Conversation AI)

**Goal:** Configure the Native GHL Conversation AI (Eliza/Internal) to handle SMS/Web Chat and Appointment Booking.
*Note: GHL's native "Voice" agent is still in beta/early rollout. For now, this SOP focuses on the TEXT/CHAT Agent which is fully stable.*

## 1. Bot Settings (Settings > Conversation AI)
*   **Mode:** Autopilot (sends messages automatically).
*   **Wait Time:** 1-2 minutes (feels natural).
*   **Supported Channels:** SMS, Facebook, Instagram, Chat Widget.

## 2. Bot Personality & Training
*   **Name:** "Sarah (Scheduling Coordinator)"
*   **Tone:** Helpful, casual, efficient.
*   **Instructions:**
```text
You are Sarah, the assistant for [Company Name]. Your ONLY goal is to get the user to book a "Quote Appointment" on the calendar.
1. Be brief. Do not write long paragraphs.
2. If they ask for price, say: "It depends on the square footage! Best way is to have [Owner Name] pop by for a 5-min quote. I have an opening tomorrow at 2pm, does that work?"
3. If they ask about services, confirm we do [House/Deep/Move-out] cleaning.
4. Once they say "Yes" to a time, use the Booking Tool.
```

## 3. Configuring the "Bot Trial" Workflow
Since GHL AI costs money per message, we wrap it in a workflow to prevent runaway costs.

### Workflow: "AI Guardrails"
*Correction: GHL requires specific triggers for Conversation AI actions.*

Choice A (Simplest): Use "Autopilot" Mode
*   Go to **Settings > Conversation AI > Bot Settings**.
*   Turn "Automated Response" to **ON**.
*   This removes the need for a workflow entirely; the bot simply responds to everything unless the contact has a specific tag.

Choice B (Workflow Control):
1.  **Trigger:** "Customer Replied" (Filter: Reply Channel = SMS or FB or Chat Widget).
2.  **Condition:** Does contact have tag `manual_intervention`?
    *   **Yes:** Stop.
    *   **No:** Conversation AI > **"Send Message with AI"** (Note: Use "Send Message" action and select the AI bot icon in the text editor if the direct action fails, OR use the "Conversation AI: Process" action if available in your GHL version).
    *   *Alternative Fix for Error*: Change Trigger to "Conversation AI > Message Received" if available, or simply use **Autopilot Mode** which is more robust for beginners.

## 4. Calendar Integration
*   **Settings > Conversation AI > Calendar:** Select "Quote Calendar".
*   **Conversation Flow:**
    *   Bot asks: "What time works best?"
    *   User: "Tomorrow afternoon."
    *   Bot checks calendar -> "I have 2:00pm or 4:30pm available."
    *   User: "2pm."
    *   Bot: **Books Appointment** -> "Done! You are set for 2pm tomorrow."

## 5. Escalation Trigger
If the user gets frustrated or asks for a human:
*   **Training Keyword:** "Human", "Manager", "Person", "Stop bot".
*   **Action:**
    1.  Add Tag: `manual_intervention`.
    2.  Notify User (SMS/App): "HOT LEAD NEEDS HUMAN: {{contact.name}}".
    3.  Internal Note: "AI Handed off to human."

## Pros vs. Vapi
| Feature | GHL Native AI | Vapi/External Voice |
| :--- | :--- | :--- |
| **Setup** | Minutes (Built-in) | Hours (Webhooks/API) |
| **Channel** | SMS/Chat/FB | Voice Calls (Phone) |
| **Cost** | ~$0.02 - $0.05 / msg | ~$0.08 - $0.15 / min |
| **Reliability** | High (Integrated) | Medium (Dependent on connection) |
