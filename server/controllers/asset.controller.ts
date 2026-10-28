import { Request, Response, NextFunction } from 'express';
import { assetService } from '../services/asset.service';
import { FacilityType, AssetStatus } from '../types';

export const getAssets = (req: Request, res: Response, next: NextFunction) => {
  try {
    const facility = req.query.facility as FacilityType | 'All';
    const zone = req.query.zone as string;
    const status = req.query.status as AssetStatus;

    const assets = assetService.getAllAssets({ facility, zone, status });
    res.json({
      success: true,
      data: assets,
      meta: { count: assets.length },
    });
  } catch (err) {
    next(err);
  }
};

export const getAssetById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const asset = assetService.getAssetById(id);
    if (!asset) {
      return res.status(404).json({
        success: false,
        error: { code: 'ASSET_NOT_FOUND', message: `Asset "${id}" not found in inventory.` },
      });
    }
    res.json({
      success: true,
      data: asset,
    });
  } catch (err) {
    next(err);
  }
};

export const getPurdueModelDistribution = (req: Request, res: Response, next: NextFunction) => {
  try {
    const distribution = assetService.getPurdueDistribution();
    res.json({
      success: true,
      data: distribution,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleInterlock = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const result = assetService.setInterlock(id, Boolean(state));
    res.json({
      success: true,
      data: result,
      message: result.interlockActive
        ? `Hardware fail-safe interlock ENGAGED for asset ${id}. Control outputs clamped.`
        : `Fail-safe interlock RELEASED for asset ${id}.`,
    });
  } catch (err) {
    next(err);
  }
};

export const runPostureScan = (req: Request, res: Response, next: NextFunction) => {
  try {
    const scanReport = assetService.runPostureAudit();
    res.json({
      success: true,
      data: scanReport,
      message: 'Comprehensive OT Posture Audit complete across Purdue Zones 1-4.',
    });
  } catch (err) {
    next(err);
  }
};
