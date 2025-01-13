import { firestore } from '../config/firebase';

interface Address {
  id: string;
  label: string;
  address: string;
  doorName: string;
  city: string;
  postalCode: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  default: boolean;
}

interface Subscription {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface Customer {
  userId: string;
  addresses: Address[];
  subscriptions: Subscription[];
  createdAt: string;
  updatedAt: string;
}

const customerCollection = firestore.collection('customers');

export const createCustomer = async (customer: Customer) => {
  const timestamp = new Date().toISOString();
  customer.createdAt = timestamp;
  customer.updatedAt = timestamp;
  const docRef = await customerCollection.add(customer);
  return docRef.id;
};

export const getCustomerById = async (id: string) => {
  const doc = await customerCollection.doc(id).get();
  return doc.exists ? (doc.data() as Customer) : null;
};

export const updateCustomer = async (id: string, customer: Partial<Customer>) => {
  customer.updatedAt = new Date().toISOString();
  await customerCollection.doc(id).update(customer);
};

export const deleteCustomer = async (id: string) => {
  await customerCollection.doc(id).delete();
};
