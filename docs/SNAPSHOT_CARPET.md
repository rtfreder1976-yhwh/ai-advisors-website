# SOP: Carpet Cleaning GHL Snapshot ("The Fibercare System")

**Goal:** A "Plug & Play" Growth System for Carpet/Upholstery Cleaners.
**North Star Metric:** Recurring Clean Rate (Re-bookings).

## 1. Pipelines
**"Service Delivery"** (Simplified):
1.  **New Lead** (Form/Chat/Voice)
2.  **Quote Given** (Voice AI or Manual)
3.  **Booked** (Calendar Appt)
4.  **In Progress** (Technician En Route)
5.  **Job Complete** (Trigger: Payment)
6.  **Review Won**
7.  **6-Month Recall** (Holding tank for automation)

## 2. Custom Fields
Folder: `Job Details - Carpet`
*   `Number of Rooms` (Number)
*   `Traffic Area Only` (Yes/No)
*   `Upholstery Items` (Multi-select: Sofa, Loveseat, Recliner, Sectional)
*   `Pet Stains/Odor` (Yes/No - *Critical for upsell*)
*   `Last Clean Date` (Date)
*   `Preferred Technician` (Text)

## 3. Core Automations

### A. The "Pet Odor" Reactivation (Money Printer)
*   **Concept**: 60% of carpet cleans are pet-related. Target this pain point.
*   **Trigger**: Manual Bulk Request (or "Past Customer" Import).
*   **Looking For**: `Pet Stains = Yes` (if data exists) or Broad Context.
*   **SMS 1**: "Hey {{contact.first_name}}, it's {{user.name}} from {{location.name}}. We're doing a 'Pet Odor elimination' run in {{contact.city}} this week. I have 2 spots left for 20% off. You want one?"
*   **Logic**: If reply "Yes/Price" -> Notify User.

### B. The 6-Month "Warranty" Recall
*   **Trigger**: 180 Days after `Last Clean Date`.
*   **SMS**: "Hi {{contact.first_name}}, it's been 6 months! To keep your carpet warranty valid, most manufacturers require a steam clean now. Want to get on the schedule?"

### C. Voice AI Instructions (Specifics)
*   **Pricing Defense**:
    *   *User*: "How much per room?"
    *   *AI*: "It depends on the size and soiling, but typically we start around $40-$50 per room. Do you have any pet stains we need to treat?"
*   **Booking**:
    *   Direct check of `Main Service Calendar`.

## 4. Calendars
*   **Config**: 2-hour slots (standard clean).
*   **Buffer**: 45 mins (travel time).

## 5. Smart Lists
1.  **"Due for Clean"**: Last Clean Date > 6 months ago.
2.  **"Pet Owners"**: Has Tag "Pets" OR Custom Field `Pet Stains/Odor` = Yes.
3.  **"VIPS"**: >3 bookings total.
