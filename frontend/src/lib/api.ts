import { Shipment, CreateShipmentInput } from '../types/shipment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const shipmentApi = {
  async getAll(): Promise<Shipment[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/shipments`, { next: { revalidate: 5 } });
      if (!res.ok) throw new Error('Failed to fetch shipments');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err);
      return [];
    }
  },

  async getByTrackingId(trackingId: string): Promise<Shipment | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/shipments/${encodeURIComponent(trackingId)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn(`Error tracking shipment ${trackingId}:`, err);
      return null;
    }
  },

  async createShipment(input: CreateShipmentInput): Promise<Shipment | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error('Shipment creation failed');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error('API Error booking shipment:', err);
      return null;
    }
  },

  async updateStatus(trackingId: string, status: string, checkpoint?: string): Promise<Shipment | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/shipments/${encodeURIComponent(trackingId)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, checkpoint }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error('API Error updating status:', err);
      return null;
    }
  },
};
