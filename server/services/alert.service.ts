import { store } from '../data/store';
import { IncidentAlert, AlertStatus, RiskLevel, FacilityType } from '../types';

export class AlertService {
  public getAllAlerts(filters?: {
    status?: AlertStatus;
    facility?: FacilityType | 'All';
    severity?: RiskLevel;
  }): IncidentAlert[] {
    let alerts = store.getAlerts();

    if (filters?.status) {
      alerts = alerts.filter((a) => a.status === filters.status);
    }
    if (filters?.facility && filters.facility !== 'All') {
      alerts = alerts.filter((a) => a.facility === filters.facility);
    }
    if (filters?.severity) {
      alerts = alerts.filter((a) => a.severity === filters.severity);
    }

    return alerts;
  }

  public getAlertById(id: string): IncidentAlert | undefined {
    return store.getAlertById(id);
  }

  public acknowledgeAlert(id: string, operatorName: string = 'SecOps Operator'): IncidentAlert | undefined {
    const alert = store.getAlertById(id);
    if (!alert) return undefined;

    const now = new Date().toLocaleTimeString();
    alert.status = 'investigating';
    alert.acknowledgedBy = operatorName;
    alert.acknowledgedAt = 'Just now';
    alert.timeline.push({
      time: now,
      event: `Acknowledged by ${operatorName}. Incident triage prioritized.`,
      type: 'operator',
    });

    return alert;
  }

  public resolveAlert(id: string, note?: string): IncidentAlert | undefined {
    const alert = store.getAlertById(id);
    if (!alert) return undefined;

    const now = new Date().toLocaleTimeString();
    alert.status = 'resolved';
    alert.resolvedAt = 'Just now';
    alert.timeline.push({
      time: now,
      event: note || 'Threat remediated and physical interlock restored to safe operating envelope.',
      type: 'system',
    });

    return alert;
  }

  public addOperatorNote(id: string, noteText: string, author: string = 'Operator'): IncidentAlert | undefined {
    const alert = store.getAlertById(id);
    if (!alert) return undefined;

    const now = new Date().toLocaleTimeString();
    if (!alert.operatorNotes) alert.operatorNotes = [];
    alert.operatorNotes.push(`[${now}] ${author}: ${noteText}`);
    alert.timeline.push({
      time: now,
      event: `Note added by ${author}: "${noteText}"`,
      type: 'operator',
    });

    return alert;
  }
}

export const alertService = new AlertService();
