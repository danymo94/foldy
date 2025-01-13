import { firestore } from '../config/firebase';

interface Payment {
  id: string;
  orderId: string;
  laundryId: string;
  status: string;
  amountPaid: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
}

const paymentCollection = firestore.collection('payments');

export const createPayment = async (payment: Payment) => {
  const timestamp = new Date().toISOString();
  payment.createdAt = timestamp;
  payment.updatedAt = timestamp;
  const docRef = await paymentCollection.add(payment);
  return docRef.id;
};

export const getPaymentById = async (id: string) => {
  const doc = await paymentCollection.doc(id).get();
  return doc.exists ? (doc.data() as Payment) : null;
};

export const updatePayment = async (id: string, payment: Partial<Payment>) => {
  payment.updatedAt = new Date().toISOString();
  await paymentCollection.doc(id).update(payment);
};

export const deletePayment = async (id: string) => {
  await paymentCollection.doc(id).delete();
};
