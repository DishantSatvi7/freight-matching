import { Router } from 'express';
import { ShipmentController } from '../controllers/shipment.controller';

const router = Router();

// Tracking & Shipment Endpoints
router.get('/', ShipmentController.getAllShipments);
router.post('/', ShipmentController.createShipment);
router.get('/:trackingId', ShipmentController.getShipmentByTrackingId);
router.patch('/:trackingId/status', ShipmentController.updateShipmentStatus);

export default router;
