import { store } from '../data/store';
import { Asset, FacilityType, AssetStatus } from '../types';

export class AssetService {
  public getAllAssets(filters?: {
    facility?: FacilityType | 'All';
    zone?: string;
    status?: AssetStatus;
  }): Asset[] {
    let assets = store.getAssets();

    if (filters?.facility && filters.facility !== 'All') {
      assets = assets.filter((a) => a.facility === filters.facility);
    }
    if (filters?.zone) {
      assets = assets.filter((a) => a.networkZone.includes(filters.zone!));
    }
    if (filters?.status) {
      assets = assets.filter((a) => a.connectionStatus === filters.status);
    }

    return assets;
  }

  public getAssetById(id: string): Asset | undefined {
    return store.getAssetById(id);
  }

  public getPurdueDistribution(): Record<string, Asset[]> {
    const assets = store.getAssets();
    return {
      'Zone 1 (Field Sensors)': assets.filter((a) => a.networkZone.includes('Zone 1')),
      'Zone 2 (Control LAN)': assets.filter((a) => a.networkZone.includes('Zone 2')),
      'Zone 3 (Plant Network)': assets.filter((a) => a.networkZone.includes('Zone 3')),
      'Zone 4 (Enterprise DMZ)': assets.filter((a) => a.networkZone.includes('Zone 4')),
    };
  }

  public setInterlock(assetId: string, state: boolean): { assetId: string; interlockActive: boolean } {
    store.setInterlock(assetId, state);
    return { assetId, interlockActive: state };
  }

  public getInterlocks(): Record<string, boolean> {
    return store.getInterlocks();
  }

  public runPostureAudit(): {
    scannedCount: number;
    anomaliesFound: number;
    auditTimestamp: string;
    standardsEvaluated: string[];
  } {
    const assets = store.getAssets();
    let anomalies = 0;

    for (const a of assets) {
      if (a.authCapability.includes('Unsigned')) {
        a.findingsCount = Math.max(a.findingsCount, 1);
        anomalies++;
      }
    }

    return {
      scannedCount: assets.length,
      anomaliesFound: anomalies,
      auditTimestamp: new Date().toISOString(),
      standardsEvaluated: ['BIS IS/ISO/IEC 62443', 'CERT-In OT Directives', 'FSSAI Schedule 4'],
    };
  }
}

export const assetService = new AssetService();
