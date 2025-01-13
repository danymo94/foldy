import { firestore } from '../config/firebase';

interface StatusHistory {
  status: string;
  timestamp: string;
  updatedBy: string;
}

interface Discounts {
  couponId: string;
  subscriptionDiscount: number;
  timeSlotDiscount: number;
  totalDiscount: number;
}

interface Order {
  id: string;
  customerId: string;
  laundryId: string;
  pickupTimeSlotId: string;
  deliveryTimeSlotId: string;
  orderDate: string;
  pickupDate: string;
  deliveryDate: string;
  status: string;
  statusHistory: StatusHistory[];
  laundryServiceCost: number;
  appServiceCost: number;
  total: number;
  discounts: Discounts;
  finalTotal: number;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

const orderCollection = firestore.collection('orders');

export const createOrder = async (order: Order) => {
  const timestamp = new Date().toISOString();
  order.createdAt = timestamp;
  order.updatedAt = timestamp;
  const docRef = await orderCollection.add(order);
  return docRef.id;
};

export const getOrderById = async (id: string) => {
  const doc = await orderCollection.doc(id).get();
  return doc.exists ? (doc.data() as Order) : null;
};

export const updateOrder = async (id: string, order: Partial<Order>) => {
  order.updatedAt = new Date().toISOString();
  await orderCollection.doc(id).update(order);
};

export const deleteOrder = async (id: string) => {
  await orderCollection.doc(id).delete();
};
