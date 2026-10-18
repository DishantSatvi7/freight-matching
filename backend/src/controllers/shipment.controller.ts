import { Request, Response } from 'express';
import { shipmentService } from '../services/shipment.service';
import { CreateShipmentInput, ShipmentStatus } from '../models/shipment.model';

export class ShipmentController {
  public static getAllShipments(req: Request, res: Response) {
    try {
      const shipments = shipmentService.getAllShipments();
      return res.status(200).json({
        success: true,
        count: shipments.length,
        data: shipments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error fetching shipments',
        error: error.message,
      });
    }
  }

  public static getShipmentByTrackingId(req: Request, res: Response) {
    try {
      const { trackingId } = req.params;
      if (!trackingId) {
        return res.status(400).json({
          success: false,
          message: 'Tracking ID is required',
        });
      }

      const shipment = shipmentService.getShipmentByTrackingId(trackingId);
      if (!shipment) {
        return res.status(404).json({
          success: false,
          message: `Shipment with tracking ID '${trackingId}' not found. Verify the ID or check recent lookups.`,
        });
      }

      return res.status(200).json({
        success: true,
        data: shipment,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error querying shipment',
        error: error.message,
      });
    }
  }

  public static createShipment(req: Request, res: Response) {
    try {
      const { origin, destination, commodity, truckType, size, weightTons } = req.body;

      if (!origin || !destination || !commodity || !truckType || !weightTons) {
        return res.status(400).json({
          success: false,
          message: 'Missing required shipment booking parameters: origin, destination, commodity, truckType, weightTons',
        });
      }

      const input: CreateShipmentInput = {
        origin,
        destination,
        commodity,
        truckType,
        size: size || '32ft Multi-Axle Container (64 CBM)',
        weightTons: Number(weightTons),
      };

      const newShipment = shipmentService.createShipment(input);
      return res.status(201).json({
        success: true,
        message: 'Shipment booked successfully. Tracking ID active.',
        data: newShipment,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create shipment',
        error: error.message,
      });
    }
  }

  public static updateShipmentStatus(req: Request, res: Response) {
    try {
      const { trackingId } = req.params;
      const { status, checkpoint } = req.body;

      if (!trackingId || !status) {
        return res.status(400).json({
          success: false,
          message: 'Tracking ID and status are required',
        });
      }

      const updated = shipmentService.updateStatus(trackingId, status as ShipmentStatus, checkpoint);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Shipment with tracking ID '${trackingId}' not found`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Shipment milestone updated to ${status}`,
        data: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update shipment status',
        error: error.message,
      });
    }
  }
}
