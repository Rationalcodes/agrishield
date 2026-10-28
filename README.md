# AgriShield — Enterprise OT Cybersecurity & Operational Intelligence

> **Protecting the digital infrastructure behind modern agriculture, food preservation cold-chains, and rural renewable bio-energy.**

AgriShield is an enterprise-grade cyber-physical security platform designed specifically for Operational Technology (OT), Industrial Control Systems (ICS), and connected IoT telemetry in agriculture and critical food infrastructure.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
* **Node.js**: v18+ (tested on Node v24)
* **npm**: v9+

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/prabhat-devs/agrishield.git
cd agrishield

# Install dependencies
npm install
```

### 2. Run Backend & Frontend

#### Terminal 1 — AgriShield Backend Engine (Express + TypeScript)
```bash
npm run server
# Server starts on http://localhost:3001
# API Health: http://localhost:3001/api/health
# Live SSE Feed: http://localhost:3001/api/telemetry/stream
```

#### Terminal 2 — AgriShield Web Interface (Vite + React)
```bash
npm run dev -- --host --port 5173
# Web App starts on http://localhost:5173
```

---

## 🏛️ Full-Stack System Architecture

```
[ Field Sensors & PLCs ]
(Sentek, Campbell, Carel, Schneider Modicon)
           │
           ▼
[ Hardware Security Demarcation ]
(Ed25519 Elliptic-Curve & HMAC-SHA256 Signatures)
           │
           ▼
[ AgriShield Ingestion Gateway (Node.js/Express) ]
(Zero-Trust Cryptographic & Hash Verification)
           │
           ├───────────────────────────────────────────┐
           ▼                                           ▼
[ Cyber-Physical Anomaly Engine ]             [ Quarantine Bus ]
(Spatial Correlation, Safe Envelope Checks,   (Forged or Tampered Frames
 Rate-of-Change, Weather Micro-Station Cross)  Isolated in < 300ms)
           │
           ▼
[ Physical Consequence & Impact Model ]
(Crop Stress, Cold-Chain Spoilage, SATAT Methane Flaring)
           │
           ▼
[ Real-Time SSE Stream (text/event-stream) ]
           │
           ▼
[ AgriShield Security Operations Center (React 19 + Tailwind) ]
(Topology Map, Purdue Zones 0-4, SecOps AI Copilot, Threat Lab)
```

---

## 🌟 Core Features & Modules

### 1. Security Operations Dashboard
* **Dynamic KPIs**: Real-time tracking of 12 Monitored Assets across Purdue Zones 1–4, Device Health, Open Security Alerts, Cryptographic Failures, and Operational Anomalies.
* **Telemetry & Threat Trend Charts**: Multi-metric Recharts visualization comparing live readings against calibrated safe operating envelopes.
* **Purdue Model Cyber-Physical Topology**: Interactive diagram mapping assets across Purdue Level 0 (Process), Level 1 (Basic Control), Level 2 (Area Supervisory), Level 3 (Site Operations), and Level 4 (Enterprise DMZ).
* **Hardware Interlock System**: One-click fail-safe override to clamp physical actuators to calibrated baselines.

### 2. Threat Simulation Lab
Four interactive, 5-stage cyber-physical incident scenarios tailored to Indian operational environments:
* **Scenario A — Suspicious Soil Moisture Reading (Nashik Vineyard)**: Detects a sudden artificial spike to 84.5% VWC that contradicts adjacent reference probes and rainfall data, preventing automated irrigation shutdown and ₹14.5 Lakhs grape crop loss.
* **Scenario B — Invalid Telemetry Signature (Baramati SATAT Bio-Power Plant)**: Intercepts an unauthorized packet attempting to tamper with anaerobic digester pressure thresholds; Ed25519 verification quarantines the frame before it reaches the control loop, avoiding ₹18.5 Lakhs flaring penalties.
* **Scenario C — Variable-Rate Irrigation Limit Breach (Operational Policy)**: Detects a center pivot PLC commanded to 182% flow capacity during peak tariff hours, flagging water hammer risk and motor damage.
* **Scenario D — Cold-Chain Thermal Excursion (Sonipat CA Vaults)**: Detects vault temperature surging above -16.0°C while compressor telemetry reads normal, triggering a 60-minute spoilage countdown for ₹28.5 Lakhs of perishable export biologics.

### 3. SecOps AI Copilot (AgriShield Intelligence)
Interactive operational assistant with specialized persona modes:
* **Agronomic Impact Specialist**: Translates cyber alerts into physical crop yield consequences and water stress impact in Indian Rupees (₹).
* **OT Cryptographic & Protocol Forensic Auditor**: Deep packet inspection, Modbus Function Code 0x05 traces, and CERT-In 6-hour disclosure preparation.
* **PLC Systems Engineer**: Generates structured text and ladder logic safety overrides for industrial PLCs (Schneider, Siemens, Carel).

### 4. Indian Regulatory & Standards Alignment
* **BIS IS/ISO/IEC 62443**: Bureau of Indian Standards Industrial Network Security (Security Level 2 / SL-2).
* **CERT-In Cyber Security Directions**: Mandatory 6-hour cybersecurity incident reporting readiness and NPL-India NTP-synchronized audit logs.
* **FSSAI Schedule 4**: Food Safety and Standards Authority perishable cold-chain temperature traceability.
* **Export Dossier Generator**: One-click printable executive audit dossier with cryptographic hash seals.

### 5. Investor Unit Economics & Opportunity
* **Indian Market Sizing**: TAM of ₹11,500 Cr, SAM of ₹2,800 Cr, and SOM of ₹240 Cr.
* **3-Tier Business Model**:
  1. *OT Security Audits*: ₹75,000 – ₹2,50,000 one-time diagnostics.
  2. *Core Monitoring SaaS*: ₹25,000 – ₹60,000 / month / facility (₹3.0L – ₹7.2L/yr ACV).
  3. *FPO Sensor Subscriptions*: ₹499 – ₹1,299 / node / month.
* **Interactive Unit Economics Calculator**: Real-time sliders for ACV, OpEx, and Paying Customers computing ARR, Gross Margin (82%), and Net Operating Income.
* **₹7.5 Crore Seed Round Allocation**: 18-month capital deployment schedule across engineering, OT lab, OEM drivers, field pilots, and regulatory compliance.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Vite
* **Backend**: Node.js 24, Express, TypeScript (`tsx`), Native `node:crypto` (Ed25519 & HMAC-SHA256)
* **Real-Time Feed**: Server-Sent Events (SSE)
* **Code Quality**: Oxlint, TypeScript strict mode

---

## 📜 License
© 2026 AgriShield Technologies India Pvt. Ltd. All rights reserved.
