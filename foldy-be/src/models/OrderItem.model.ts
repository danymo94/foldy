import { firestore } from '../config/firebase';

interface Service {
  attributeId: string;
  customPrice: number;
  customTime: number;
  discount: number;
}

interface OrderItem {
  id: string;
  orderId: string;
  laundryId: string;
  productId: string;
  quantity: number;
  services: Service[];
  subtotal: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const orderItemCollection = firestore.collection('orderItems');

export const createOrderItem = async (orderItem: OrderItem) => {
  const timestamp = new Date().toISOString();
  orderItem.createdAt = timestamp;
  orderItem.updatedAt = timestamp;
  const docRef = await orderItemCollection.add(orderItem);
  return docRef.id;
};

export const getOrderItemById = async (id: string) => {
  const doc = await orderItemCollection.doc(id).get();
  return doc.exists ? (doc.data() as OrderItem) : null;
};

export const updateOrderItem = async (id: string, orderItem: Partial<OrderItem>) => {
  orderItem.updatedAt = new Date().toISOString();
  await orderItemCollection.doc(id).update(orderItem);
};

export const deleteOrderItem = async (id: string) => {
  await orderItemCollection.doc(id).delete();
};
