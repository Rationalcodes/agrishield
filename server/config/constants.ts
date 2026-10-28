export const INDIAN_REGULATORY_STANDARDS = {
  CERT_IN: {
    name: 'CERT-In Cyber Security Directions',
    mandate: 'Mandatory 6-Hour Incident Reporting Directive under Section 70B',
    clockSyncNTP: 'National Physical Laboratory (NPL-India) synchronized NTP servers',
  },
  BIS: {
    standard: 'BIS IS/ISO/IEC 62443',
    title: 'Industrial communication networks - Network and system security',
    targetLevel: 'Security Level 2 (SL-2) Enforced',
  },
  FSSAI: {
    regulation: 'FSSAI Food Safety and Standards (Licensing & Registration) Schedule 4',
    title: 'Cold Chain Continuous Temperature Traceability & Tamper-Proof Audit Trails',
  },
  SATAT: {
    initiative: 'Sustainable Alternative Towards Affordable Transportation (SATAT CBG Scheme)',
    mandate: 'Bio-CNG / Biomethane process automation & SCADA fail-safe interlocks',
  },
};

export const DEFAULT_FACILITIES = [
  { id: 'Smart Farm', name: 'Nashik Autonomous Vineyard', state: 'Maharashtra' },
  { id: 'Cold Storage', name: 'Sonipat CA Cold Vaults', state: 'Haryana' },
  { id: 'Bio-Power Facility', name: 'Baramati SATAT Bio-Energy Plant', state: 'Maharashtra' },
];
