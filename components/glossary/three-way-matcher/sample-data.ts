/**
 * Sample data designed so a 2% tolerance default surfaces each exception
 * type exactly once across 15 invoices.
 *
 * Coverage map (after runMatch with amountTolerancePercent=2):
 *   INV-001..010    MATCHED
 *   INV-011         AMOUNT_VARIANCE      (invoice $5,200 vs PO $5,000, diff $200 > 2% of $5,200)
 *   INV-012         QUANTITY_VARIANCE    (invoice qty 20, GR received 18)
 *   INV-013         MISSING_PO           (PO-901 not in PO list)
 *   INV-014         MISSING_GR           (PO-014 has no GR)
 *   INV-015         VENDOR_MISMATCH      (invoice vendor "Acme Corp" vs PO "Globex Inc")
 *   INV-016         LINE_DESC_MISMATCH   ("office chair" vs "wireless router")
 *   INV-017, 018    DUPLICATE_INVOICE    (both reference PO-002)
 */
export const SAMPLE_INVOICES_CSV = `Invoice,PO Number,Vendor,Amount,Quantity,Line Description
INV-001,PO-001,Acme Corp,1200,4,Office chairs ergonomic
INV-002,PO-002,Globex Inc,3500,10,Laptop docking stations
INV-003,PO-003,Initech,890,2,Standing desk converters
INV-004,PO-004,Acme Corp,450,15,USB-C cable bulk pack
INV-005,PO-005,Umbrella Co,2100,6,External monitors 27 inch
INV-006,PO-006,Globex Inc,560,4,Webcam HD package
INV-007,PO-007,Initech,1750,5,Office chairs executive
INV-008,PO-008,Acme Corp,330,1,Office desk single
INV-009,PO-009,Umbrella Co,4200,12,Conference room speakers
INV-010,PO-010,Globex Inc,720,3,Whiteboard glass premium
INV-011,PO-011,Acme Corp,5200,20,Laptop bags leather
INV-012,PO-012,Initech,940,20,Premium pens box
INV-013,PO-901,Acme Corp,1100,5,Office chairs ergonomic
INV-014,PO-014,Umbrella Co,2300,8,Server rack 24U
INV-015,PO-015,Acme Corp,800,2,Office printer color
INV-016,PO-016,Globex Inc,1500,4,Office chairs ergonomic
INV-017,PO-002,Globex Inc,3500,10,Laptop docking stations
INV-018,PO-002,Globex Inc,3500,10,Laptop docking stations`;

export const SAMPLE_POS_CSV = `PO Number,Vendor,Amount,Quantity,Line Description
PO-001,Acme Corp,1200,4,Office chairs ergonomic
PO-002,Globex Inc,3500,10,Laptop docking stations
PO-003,Initech,890,2,Standing desk converters
PO-004,Acme Corp,450,15,USB-C cable bulk pack
PO-005,Umbrella Co,2100,6,External monitors 27 inch
PO-006,Globex Inc,560,4,Webcam HD package
PO-007,Initech,1750,5,Office chairs executive
PO-008,Acme Corp,330,1,Office desk single
PO-009,Umbrella Co,4200,12,Conference room speakers
PO-010,Globex Inc,720,3,Whiteboard glass premium
PO-011,Acme Corp,5000,20,Laptop bags leather
PO-012,Initech,940,20,Premium pens box
PO-014,Umbrella Co,2300,8,Server rack 24U
PO-015,Globex Inc,800,2,Office printer color
PO-016,Globex Inc,1500,4,Wireless router enterprise`;

export const SAMPLE_GRS_CSV = `PO Number,Vendor,Quantity Received,Line Description
PO-001,Acme Corp,4,Office chairs ergonomic
PO-002,Globex Inc,10,Laptop docking stations
PO-003,Initech,2,Standing desk converters
PO-004,Acme Corp,15,USB-C cable bulk pack
PO-005,Umbrella Co,6,External monitors 27 inch
PO-006,Globex Inc,4,Webcam HD package
PO-007,Initech,5,Office chairs executive
PO-008,Acme Corp,1,Office desk single
PO-009,Umbrella Co,12,Conference room speakers
PO-010,Globex Inc,3,Whiteboard glass premium
PO-011,Acme Corp,20,Laptop bags leather
PO-012,Initech,18,Premium pens box
PO-015,Globex Inc,2,Office printer color
PO-016,Globex Inc,4,Wireless router enterprise`;
